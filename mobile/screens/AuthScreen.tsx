import * as AppleAuthentication from "expo-apple-authentication"
import * as AuthSession from "expo-auth-session"

import { Button, Text } from "react-native-paper"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import supabaseClient, { supabaseAuthUrl } from "../lib/supabaseClient"

import Colors from "../constants/Colors"
import Constants from "expo-constants"
import DarkLogo from "../components/images/DarkLogo"
import GoogleIcon from "../components/images/GoogleIcon"
import useColorScheme from "../hooks/useColorScheme"

export default function AuthScreen() {
  const [errorMessage, setErrorMessage] = useState<String | null>(null)
  const colorScheme = useColorScheme()
  const styles = createStyles(colorScheme)

  async function login(provider: string) {
    setErrorMessage(null)

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
      <DarkLogo />
      <Button uppercase={false} style={styles.googleButton} mode="contained" onPress={() => login("google")} icon={GoogleIcon}>
        <Text style={styles.googleButtonText}>Continue With Google</Text>
      </Button>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
        cornerRadius={5}
        style={styles.appleButton}
        onPress={() => login("apple")}
      />
      <Text>{errorMessage}</Text>
    </View>
  )
}

const createStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.dark.authBackground,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    googleButton: {
      marginTop: 100,
      backgroundColor: Colors.dark.text,
      borderRadius: 5,
      paddingRight: 10,
      paddingLeft: 10,
      marginBottom: 40,
      width: 290,
      height: 44,
    },
    appleButton: {
      width: 290,
      height: 44,
      marginBottom: 20,
    },
    googleButtonText: {
      fontSize: 15,
      lineHeight: 24,
      color: Colors.light.text,
      fontWeight: "600",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  })
