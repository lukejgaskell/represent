import { StyleSheet } from "react-native"

export const getStyles = (mode: "light" | "dark") => {
  return StyleSheet.create({
    item: { alignItems: "center", textAlign: "center", width: "33%" },
    currentItem: {
      borderBottomColor: "orange",
      paddingBottom: 5,
      borderBottomWidth: 5,
    },
    passageStamp: {
      position: "absolute",
      transform: [{ rotate: "30deg" }, { translateY: 5 }, { translateX: 5 }],
      borderColor: "green",
      borderWidth: 2,
      color: "green",
      opacity: 1,
      zIndex: 10,
      lineHeight: 26,
      fontSize: 26,
      padding: 2,
      borderRadius: 5,
      fontWeight: "800",
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
