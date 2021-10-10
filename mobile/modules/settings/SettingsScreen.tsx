import React from "react"
import { StyleSheet, View } from "react-native"
import useColorScheme from "../../hooks/useColorScheme"
import { Button, Card, Text } from "react-native-paper"
import supabaseClient from "../../lib/supabaseClient"
import Colors, { IColors } from "../../constants/Colors"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SettingsScreen() {
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])

  async function logout() {
    await supabaseClient.auth.signOut()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button style={styles.button} mode="contained" onPress={() => logout()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Button>
    </SafeAreaView>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      // alignItems: "center",
      // justifyContent: "center",
    },
    button: {
      marginTop: 100,
    },
    buttonText: {
      fontSize: 20,
      color: colors.text,
    },
  })
