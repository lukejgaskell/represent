import React, { useContext } from "react"
import { ActivityIndicator, Button, StyleSheet, View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import Colors, { IColors } from "../constants/Colors"
import { Card, Paragraph, Title } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { UserContext } from "../stores/user/UserProvider"

export default function WelcomeScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]
  const styles = createStyles(Colors[colorScheme])
  const { settings, saveSettings } = useContext(UserContext)

  function handleContinue() {
    if (saveSettings) saveSettings({ ...settings, hasSeenWelcome: true })
  }

  return (
    <SafeAreaView>
      <Card style={styles.container}>
        <Card.Content>
          <Title>Welcome to Represent</Title>

          <Paragraph>
            We aim to give you simple information about what your elected officials are doing on your behalf. Represent presents information about what&apos;s happening in the
            house and senate.
          </Paragraph>

          <Title>Getting Started</Title>

          <Paragraph>1. You can keep up with what votes have recently been voted on in Congress by clicking on the votes tab.</Paragraph>
          <Paragraph>
            2. Take a look at the representatives tab where you can see who your reprenatives are and how they&apos;ve been voting. You can also find useful links to get more
            information about what they are doing.
          </Paragraph>
          <Button title="continue" onPress={handleContinue}>
            Continue
          </Button>
        </Card.Content>
      </Card>
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
  })
