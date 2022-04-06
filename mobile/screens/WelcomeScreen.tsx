import { Button, Paragraph, Title } from "react-native-paper"
import Colors, { IColors } from "../constants/Colors"
import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"

import { AppContext } from "../stores/user/AppProvider"
import { SafeAreaView } from "react-native-safe-area-context"
import useColorScheme from "../hooks/useColorScheme"

export default function WelcomeScreen() {
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])
  const { settings, saveSettings } = useContext(AppContext)

  function handleContinue() {
    if (saveSettings) saveSettings({ ...settings, hasSeenWelcome: true })
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Title style={styles.titleOne}>Welcome to Represent</Title>

        <Paragraph>
          We aim to give you simple information about what your elected officials are doing on your behalf. Represent presents information about what&apos;s happening in the House
          and Senate.
        </Paragraph>

        <Title style={styles.titleTwo}>Getting Started</Title>

        <Paragraph>1. You can keep up with what votes have recently been voted on in Congress by clicking on the votes tab.</Paragraph>
        <Paragraph>
          2. Take a look at the representatives tab where you can see who your representatives are and how they&apos;ve been voting. You can also find useful links to get more
          information about what they are doing.
        </Paragraph>
        <Button style={styles.button} mode="contained" onPress={handleContinue}>
          Continue
        </Button>
      </View>
    </SafeAreaView>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      paddingRight: 25,
      paddingLeft: 25,
      top: 100,
    },
    titleOne: {
      paddingBottom: 20,
      fontSize: 30,
    },
    titleTwo: {
      paddingTop: 40,
      paddingBottom: 20,
      fontSize: 25,
    },
    button: {
      marginTop: 100,
      fontSize: 25,
      paddingTop: 10,
      paddingBottom: 10,
    },
  })
