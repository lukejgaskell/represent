import * as AuthSession from "expo-auth-session"

import { Button, Text } from "react-native-paper"
import Colors, { IColors } from "../constants/Colors"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import supabaseClient, { supabaseAuthUrl } from "../lib/supabaseClient"

import Constants from "expo-constants"
import DarkLogo from "../components/images/DarkLogo"
import GoogleIcon from "../components/images/GoogleIcon"
import LightLogo from "../components/images/LightLogo"
import useColorScheme from "../hooks/useColorScheme"

export default function AuthScreen() {
  const [errorMessage, setErrorMessage] = useState<String | null>(null)
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])

  async function loginWithGoogle() {
    setErrorMessage(null)
    const provider = "google"

    const SCHEME = Constants.manifest?.scheme
    const proxyRedirectUri = AuthSession.makeRedirectUri({
      useProxy: true,
    }) // https://auth.expo.io
    const redirectUri = AuthSession.makeRedirectUri({
      native: `${SCHEME}://redirect`,
      useProxy: false,
    }) // Some URL which we don't know beforehand

    const response = await AuthSession.startAsync({
      authUrl: `${supabaseAuthUrl}?provider=${provider}&redirect_to=${proxyRedirectUri}`,
      returnUrl: redirectUri,
    })

    if (!response || response.type !== "success") {
      return
    }

    const { user, session, error } = await supabaseClient.auth.signIn({
      refreshToken: response.params?.refresh_token,
    })

    if (error) {
      setErrorMessage(error.message)
      return
    }
  }

  return (
    <View style={styles.container}>
      {colorScheme === "dark" ? <DarkLogo /> : <LightLogo />}
      <Button style={styles.button} mode="outlined" onPress={loginWithGoogle} icon={GoogleIcon}>
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
