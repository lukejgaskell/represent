import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "react-native-url-polyfill/auto"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
import { AuthProvider } from "./stores/user/AuthProvider"
import { DefaultTheme, Provider as PaperProvider, DarkTheme } from "react-native-paper"
import { Theme } from "react-native-paper/lib/typescript/types"

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3F50B4",
  },
}

const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#3F50B4",
    surface: "#424242",
  },
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
          <AuthProvider>
            <Navigation colorScheme={colorScheme} />
          </AuthProvider>
          <StatusBar />
        </PaperProvider>
      </SafeAreaProvider>
    )
  }
}
