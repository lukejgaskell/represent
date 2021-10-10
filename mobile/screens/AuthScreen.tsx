import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import { Button, Text } from "react-native-paper"
import supabaseClient, { supabaseAuthUrl } from "../lib/supabaseClient"
import GoogleIcon from "../components/images/GoogleIcon"
import DarkLogo from "../components/images/DarkLogo"
import Colors, { IColors } from "../constants/Colors"
import LightLogo from "../components/images/LightLogo"
import * as AuthSession from "expo-auth-session"

export default function AuthScreen() {
  const [errorMessage, setErrorMessage] = useState<String | null>(null)
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])

  async function loginWithGoogle() {
    setErrorMessage(null)
    const provider = "google"
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: false })

    AuthSession.startAsync({
      authUrl: `${supabaseAuthUrl}?provider=${provider}&redirect_to=${redirectUri}`,
      returnUrl: redirectUri,
    }).then(async (response: any) => {
      if (!response) return

      const { user, session, error } = await supabaseClient.auth.signIn({
        refreshToken: response.params?.refresh_token,
      })

      if (error) {
        setErrorMessage(error.message)
        return
      }
    })
  }

  return (
    <View style={styles.container}>
      {colorScheme === "dark" ? <DarkLogo /> : <LightLogo />}
      <Button style={styles.button} mode="contained" onPress={loginWithGoogle} icon={GoogleIcon}>
        <Text style={styles.buttonText}>Login With Google</Text>
      </Button>
      <Text>{errorMessage}</Text>
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
    button: {
      marginTop: 100,
    },
    buttonText: {
      fontSize: 20,
      color: colors.text,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  })
