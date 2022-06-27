import { Card, Button } from "react-native-paper"
import { Linking, StyleSheet, View } from "react-native"

import Colors from "../../../../../../constants/Colors"
import React from "react"
import { Representative } from "../../../../types"
import useColorScheme from "../../../../../../hooks/useColorScheme"

type ButtonType = 'facebook' | 'twitter' | 'contact' | 'youtube'
type IProps = {
    type: ButtonType
    path: string
}

function getBasePath(type: ButtonType) {
    switch(type) {
        case 'contact': return ''
        case 'facebook': return 'https://www.facebook.com/'
        case 'twitter': return 'https://www.twitter.com/'
        case 'youtube': return 'https://youtube.com/'
    }
}

export function SocialButton(props: IProps) {
  const { type, path } = props
  const colorScheme = useColorScheme()

  const styles = getStyles(colorScheme)

  const url = getBasePath(type) + path

  return (
    <Button
        style={styles[`${type}_button`]}
        mode="contained"
        onPress={() => Linking.canOpenURL(url).then(() => Linking.openURL(url))}
    >
        Twitter
    </Button>
  )
}

const getStyles = (mode: "light" | "dark") =>
  StyleSheet.create({
    youtube_button: {
      color: "white",
      backgroundColor: "#B91C1C",
    },
    facebook_button: {
      color: "white",
      backgroundColor: "#1877F2",
    },
    twitter_button: {
      color: "white",
      backgroundColor: "#1DA1F2",
    },
    contact_button: {
      color: "white",
      backgroundColor: "#047857",
    },
  })
