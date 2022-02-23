import React, { createContext, useEffect, useState } from "react"
import { getUserSettings, saveUserData } from "./api"

import { UserData } from "./UserData.type"
import { notify } from "../../lib/notifications"
type ContextProps = {
  isLoading: boolean
  settings: UserData | null
  saveSettings: (val: UserData) => void
}

const UserContext = createContext<Partial<ContextProps>>({})

interface Props {
  children: React.ReactNode
}

const UserProvider = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<UserData | null>(null)

  async function saveSettings(val: UserData) {
    try {
      await saveUserData(val)
      setSettings(val)
    } catch (e) {
      notify("was unable to save, please try again.")
    }
  }

  useEffect(() => {
    getUserSettings().then(({ data, error }) => {
      if (error) notify("unable to load user data", "error")
      if (data) setSettings(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <UserContext.Provider
      value={{
        isLoading,
        settings,
        saveSettings,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
