import { Bill } from "./types"

import AsyncStorage from "@react-native-async-storage/async-storage"
import create from "zustand"
import { getBills } from "./api"
import { persist } from "zustand/middleware"

type ILoadListProps = {
  reset: boolean
}
type ILoadItemProps = {
  id: string
}

type IStore = {
  items: Bill[]
  selectedItem: Bill | null
  isLoadingItem: boolean
  isLoadingList: boolean
  page: number
  loadBills: (props: ILoadListProps) => Promise<void>
  loadSelectedBill: (props: ILoadItemProps) => Promise<void>
  unloadSelectedBill: () => void
}

export const useBillsStore = create<IStore>(
  persist(
    (set, get) => ({
      isLoadingItem: false,
      isLoadingList: true,
      page: 0,
      items: [],
      selectedItem: null,
      loadBills: async function ({ reset }: ILoadListProps) {
        set({ isLoadingList: true })
        const { page, items } = get()

        const currPage = reset ? 0 : page
        const currItems = reset ? [] : items
        const { data, error } = await getBills({ page: currPage })

        if (error) {
          set({ isLoadingList: false })
          return
        }

        set({
          items: currItems.concat(data.items),
          page: currPage + 1,
          isLoadingList: false,
        })
      },

      loadSelectedBill: async function ({ id }: ILoadItemProps) {
        set({ selectedItem: null })
        const { items } = get()
        let item = items.filter(b => b.id === id).find(() => true)

        if (!item) {
          set({ isLoadingItem: true })
          const { data, error } = await getBills({ page: 0 })
          item = data?.items?.filter(b => b.id === id).find(() => true)
        }
        set({ selectedItem: item || null, isLoadingItem: false })
      },

      unloadSelectedBill: function () {
        set({ selectedItem: null })
      },
    }),
    {
      name: "bills",

      getStorage: () => AsyncStorage,
    }
  )
)
