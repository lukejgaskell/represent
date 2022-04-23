import Colors, { IColors } from "../constants/Colors"
import React, { useEffect, useState } from "react"

import LottieView from "lottie-react-native"
import { StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import useColorScheme from "../hooks/useColorScheme"

export type IProps = {
  message: string
  action: () => void
}

export default function SuccessMessage({ message, action }: IProps) {
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])
  useEffect(() => {
    setTimeout(() => action(), 1800)
  }, [])
  return (
    <>
      <LottieView
        style={{
          width: 300,
          height: 300,
          alignSelf: "center",
        }}
        source={require("../assets/animations/success-check.json")}
        autoPlay
        loop={false}
      />
      <Text style={styles.message}>{message}</Text>
    </>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    message: {
      fontSize: 20,
      alignSelf: "center",
    },
  })
