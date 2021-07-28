import React, { useEffect, useState } from "react"

import { UserData } from "@/stores/user/UserData.type"
import { getUserSettings } from "@/queries/user"
import { useErrorStore } from "@/stores/useErrorStore"
import { useRouter } from "next/router"
import { useUserStore } from "@/stores/user/useUserStore"

type WaitForSettings = {}

export const WaitForSettings: React.FC<WaitForSettings> = ({ children }) => {
  const { settings, loadSettings, isLoading } = useUserStore()
  const hasSettings = !!settings.district && !!settings.state
  const hasSeenWelcome = settings.hasSeenWelcome
  const { replace } = useRouter()

  useEffect(() => {
    loadSettings()
  }, [])

  if (isLoading && (!hasSettings || !hasSeenWelcome)) {
    return null
  }

  if (!hasSettings) {
    replace(`/intro`)
    return null
  }

  if (!hasSeenWelcome) {
    replace(`/welcome`)
    return null
  }

  return <>{children}</>
}
