import "react-native-url-polyfill/auto"

import { DarkTheme, DefaultTheme, Provider as PaperProvider } from "react-native-paper"

import { AuthProvider } from "./stores/user/AuthProvider"
import Navigation from "./navigation"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Theme } from "react-native-paper/lib/typescript/types"
import useColorScheme from "./hooks/useColorScheme"

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
  const colorScheme = useColorScheme()

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
