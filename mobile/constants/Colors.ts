const tintColorLight = "#2f95dc"
const tintColorDark = "#fff"

const colors = {
  light: {
    text: "#000",
    background: "#fff",
    authBackground: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    cardBackground: "white",
  },
  dark: {
    text: "#fff",
    background: "#000",
    authBackground: "#2B2E4A",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    cardBackground: "rgb(26, 26, 27)",
  },
}

export type IColors = typeof colors.light | typeof colors.dark

export default colors
