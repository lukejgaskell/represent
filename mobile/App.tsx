import "react-native-url-polyfill/auto"

import { paperDarkTheme, paperLightTheme } from "./constants/Themes"

import Colors from "./constants/Colors"
import Navigation from "./navigation"
import { Provider as PaperProvider } from "react-native-paper"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import useColorScheme from "./hooks/useColorScheme"

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.dark.authBackground }}>
      <PaperProvider theme={colorScheme === "light" ? paperLightTheme : paperDarkTheme}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
