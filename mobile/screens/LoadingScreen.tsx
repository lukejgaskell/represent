import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import Colors, { IColors } from "../constants/Colors"

export default function SettingsScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]
  const styles = createStyles(Colors[colorScheme])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.text} />
    </View>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  })
