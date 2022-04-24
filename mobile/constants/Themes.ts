import { DarkTheme, DefaultTheme } from "react-native-paper"
import { DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme, Theme as NavTheme } from "@react-navigation/native"

import { Theme } from "react-native-paper/lib/typescript/types"

export const paperLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3F50B4",
  },
}

export const paperDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#3F50B4",
    surface: "#424242",
    background: "#1a1a1b",
  },
}

export const navigationLightTheme: NavTheme = {
  ...NavDefaultTheme,
}

export const navigiationDarkTheme: NavTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    // background: "#1a1a1b",
  },
}
