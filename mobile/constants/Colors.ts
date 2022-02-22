const tintColorLight = "#2f95dc"
const tintColorDark = "#fff"

export type IColors = {
  text: string
  background: string
  tint: string
  tabIconDefault: string
  tabIconSelected: string
  cardBackground: string
}

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    cardBackground: "white",
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    cardBackground: "rgb(26, 26, 27)",
  },
}
