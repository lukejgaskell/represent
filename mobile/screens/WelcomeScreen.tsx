import { Button, Paragraph, Text, Title } from "react-native-paper"
import Colors, { IColors } from "../constants/Colors"
import { StyleSheet, View } from "react-native"

import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"
import useColorScheme from "../hooks/useColorScheme"
import { useSettingsStore } from "../stores/useSettingsStore"

export default function WelcomeScreen() {
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])
  const { saveSettings } = useSettingsStore()

  function handleContinue() {
    saveSettings({ hasSeenWelcome: true })
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.contentSection}>
          <Title style={styles.titleOne}>Welcome to Represent</Title>
          <Paragraph>
            We aim to give you simple information about what your elected officials are doing on your behalf. Represent
            presents information about what&apos;s happening in the House and Senate.
          </Paragraph>
          <Title style={styles.titleTwo}>Getting Started</Title>
          <Paragraph>
            1. You can keep up with what votes have recently been voted on in Congress by clicking on the votes tab.
          </Paragraph>
          <Paragraph>
            2. Take a look at the representatives tab where you can see who your representatives are and how
            they&apos;ve been voting. You can also find useful links to get more information about what they are doing.
          </Paragraph>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      paddingRight: 25,
      paddingLeft: 25,
      paddingTop: "15%",
      height: "100%",
      width: "100%",
      flexDirection: "column",
      display: "flex",
      justifyContent: "space-between",
    },
    contentSection: {
      flex: 1,
      paddingBottom: 20,
    },
    titleOne: {
      fontSize: 30,
    },
    titleTwo: {
      paddingTop: "15%",
      fontSize: 25,
    },
    buttonText: { lineHeight: 40 },
    buttonContainer: { paddingBottom: "5%" },
  })
