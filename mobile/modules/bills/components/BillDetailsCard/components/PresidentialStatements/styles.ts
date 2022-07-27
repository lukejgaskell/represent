import { StyleSheet } from "react-native"

export const getStyles = (mode: "light" | "dark") => {
  return StyleSheet.create({
    rowMargin: {
      marginTop: 5,
      marginBottom: 5,
    },
    row: {
      paddingTop: 5,
      paddingBottom: 5,
      width: "100%",
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
    },
  })
}
