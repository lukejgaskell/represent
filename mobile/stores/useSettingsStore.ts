import AsyncStorage from "@react-native-async-storage/async-storage"
import create from "zustand"
import { persist } from "zustand/middleware"

type IStore = {
  state?: string
  district?: string
  hasSeenWelcome?: boolean
}

type IActions = {
  saveSettings: (val: IStore) => void
}

export const useSettingsStore = create<IStore & IActions>(
  persist(
    (set, get) => ({
      state: undefined,
      district: undefined,
      hasSeenWelcome: false,
      saveSettings: (settings: IStore) => {
        set(settings)
      },
    }),
    {
      name: "settings",
      getStorage: () => AsyncStorage,
    }
  )
)
