import React, { createContext, useEffect, useState } from "react"

import { AppData } from "./AppData.type"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { notify } from "../../lib/notifications"

type ContextProps = {
  isLoading: boolean
  settings: AppData | null
  saveSettings: (val: AppData) => void
}

const AppContext = createContext<Partial<ContextProps>>({})

interface Props {
  children: React.ReactNode
}

const settingsItemKey = "settings"

const AppProvider = (props: Props) => {
  const [settings, setSettings] = useState<AppData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function saveSettings(val: AppData) {
    try {
      console.log("saving!")
      await AsyncStorage.setItem(settingsItemKey, JSON.stringify(val))
      setSettings(val)
    } catch (e) {
      notify("was unable to save, please try again.")
    }
  }

  useEffect(() => {
    AsyncStorage.getItem(settingsItemKey).then(v => {
      if (v !== null) setSettings(JSON.parse(v))
      setIsLoading(false)
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        settings,
        saveSettings,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
