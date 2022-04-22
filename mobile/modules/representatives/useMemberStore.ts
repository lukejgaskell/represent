import AsyncStorage from "@react-native-async-storage/async-storage"
import { Member } from "./types"
import create from "zustand"
import { getMembers } from "./api"
import { persist } from "zustand/middleware"

type ILoadListProps = {
  state?: string
  district?: string
}

type IStore = {
  items: Member[]
  isLoading: boolean
  loadMembers: (props: ILoadListProps) => Promise<void>
}

export const useMembersStore = create<IStore>(
  persist(
    (set, get) => ({
      items: [],
      isLoading: true,
      loadMembers: async function (fprops: ILoadListProps) {
        set({ isLoading: true })

        const { data, error } = await getMembers({ ...fprops })
        if (error || !data) {
          set({ isLoading: false })
          return
        }
        set({ items: data, isLoading: false })
      },
    }),
    {
      name: "members",
      getStorage: () => AsyncStorage,
    }
  )
)
