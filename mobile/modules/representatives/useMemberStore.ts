import AsyncStorage from "@react-native-async-storage/async-storage"
import { Representative, RepresentativeDetails } from "./types"
import create from "zustand"
import { getMemberExpenses, getMembers } from "./api"
import { persist } from "zustand/middleware"

type ILoadListProps = {
  state?: string
  district?: string
}

type IStore = {
  items: Representative[]
  isLoading: boolean
  isLoadingSelectedItem: boolean
  selectedItem: RepresentativeDetails | null
  loadMembers: (props: ILoadListProps) => Promise<void>
  loadSelectedMember: (id: string) => void
  unloadSelectedItem: () => void
}

export const useMembersStore = create<IStore>(
  persist(
    (set, get) => ({
      items: [],
      selectedItem: null,
      isLoading: true,
      isLoadingSelectedItem: true,
      loadMembers: async function (fprops: ILoadListProps) {
        set({ isLoading: true })

        const { data, error } = await getMembers({ ...fprops })
        if (error || !data) {
          set({ isLoading: false })
          return
        }
        set({ items: data, isLoading: false })
      },
      loadSelectedMember: async function (id: string) {
        const { items } = get()
        const member = items.find(m => m.id === id) || null
        const { data } = await getMemberExpenses(member?.id)

        set({ selectedItem: { ...member!, memberExpenses: data }, isLoadingSelectedItem: false })
      },
      unloadSelectedItem: function () {
        set({ selectedItem: null, isLoadingSelectedItem: true })
      },
    }),
    {
      name: "members",
      getStorage: () => AsyncStorage,
    }
  )
)
