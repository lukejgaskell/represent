import { getUserSettings, saveUserData } from "@/queries/user"

import { UserData } from "@/stores/user/UserData.type"
import create from "zustand"
import { persist } from "zustand/middleware"
import { useErrorStore } from "../useErrorStore"

type SettingsStore = {
  settings: UserData
  isLoading: boolean
  saveSettings: (data: UserData) => Promise<void>
  loadSettings: () => Promise<void>
}

export const useUserStore = create<SettingsStore>(
  persist(
    (set, get) => ({
      settings: {} as UserData,
      isLoading: false,
      saveSettings: async (userData: UserData) => {
        const updatedSettings = { ...get().settings, ...userData }
        const { data, error } = await saveUserData(updatedSettings)
        const { addError } = useErrorStore.getState()

        if (error) {
          return addError(error.message)
        }
        set({ settings: updatedSettings })
      },
      loadSettings: async () => {
        const { addError } = useErrorStore.getState()
        set({ isLoading: true })
        const { data, error } = await getUserSettings()
        if (error) {
          set({ isLoading: false })
          addError(error.message)
        }

        set({ settings: data || ({} as UserData), isLoading: false })
      },
    }),
    {
      name: "settings-store",
    }
  )
)
