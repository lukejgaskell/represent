import { Activity, ActivityType } from "./types"

import AsyncStorage from "@react-native-async-storage/async-storage"
import create from "zustand"
import { getActivity } from "./api"
import { getStatements } from "./statements/api"
import { getVotes } from "./votes/api"
import { persist } from "zustand/middleware"
import { sortByDate } from "../../lib/dateUtils"

type ILoadListProps = {
  reset: boolean
  state?: string
  district?: string
}
type ILoadItemProps = {
  id: string
  type: string
  state?: string
  district?: string
}

type IStore = {
  items: Activity[]
  selectedItem: Activity | null
  isLoadingItem: boolean
  isLoadingList: boolean
  page: number
  loadActivity: (props: ILoadListProps) => Promise<void>
  loadSelectedActivity: (props: ILoadItemProps) => Promise<void>
  unloadSelectedActvitity: () => void
}

export const useActivityStore = create<IStore>(
  persist(
    (set, get) => ({
      isLoadingItem: false,
      isLoadingList: true,
      page: 0,
      items: [],
      selectedItem: null,
      loadActivity: async function ({ reset, state, district }: ILoadListProps) {
        set({ isLoadingList: true })
        const { page, items } = get()

        const currPage = reset ? 0 : page
        const currItems = reset ? [] : items
        const activity = await getActivity({ page: currPage, state, district })

        const voteIds = activity.data?.items.filter(item => item.type === "vote").map(item => item.id)
        const statementIds = activity.data?.items.filter(item => item.type === "statement").map(item => item.id)

        const promises = []
        const newItems: Array<Activity> = []

        if (statementIds && statementIds.length > 0) {
          promises.push(getStatements(statementIds))
        }

        if (voteIds && voteIds.length > 0) {
          promises.push(getVotes({ voteIds, state, district }))
        }

        await Promise.all(promises).then(r =>
          r.forEach(v => {
            if (v.data && v.data.length > 0) {
              newItems.push(...v.data)
            }
          })
        )

        if (activity.error) {
          set({ isLoadingList: false })
          return
        }

        set({
          items: currItems.concat(newItems.sort(sortByDate)),
          page: currPage + 1,
          isLoadingList: false,
        })
      },

      loadSelectedActivity: async function ({ id, type, state, district }: ILoadItemProps) {
        set({ selectedItem: null })
        const { items } = get()
        let item = items.filter(a => a.type === type && a.id === id).find(() => true)

        if (!item) {
          set({ isLoadingItem: true })
          if (type === "vote") {
            const { data, error } = await getVotes({
              voteIds: [id],
              state,
              district,
            })
            if (data && data.length > 0) item = data[0]
          }
          if (type === "statement") {
            const { data, error } = await getStatements([id])
            if (data && data.length > 0) item = data[0]
          }
        }
        set({ selectedItem: item || null, isLoadingItem: false })
      },

      unloadSelectedActvitity: function () {
        set({ selectedItem: null })
      },
    }),
    {
      name: "activity",

      getStorage: () => AsyncStorage,
    }
  )
)
