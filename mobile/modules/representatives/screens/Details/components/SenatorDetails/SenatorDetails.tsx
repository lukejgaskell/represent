import { Card } from "react-native-paper"
import { StyleSheet, View } from "react-native"

import Colors from "../../../../../../constants/Colors"
import React from "react"
import { Representative } from "../../../../types"
import useColorScheme from "../../../../../../hooks/useColorScheme"
import { CommonDetails } from "../CommonDetails"

type IProps = Representative

export function SentatorDetails(props: IProps) {
  const colorScheme = useColorScheme()

  const styles = getStyles(colorScheme)

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View>
          <CommonDetails {...props} />
        </View>
      </Card.Content>
    </Card>
  )
}

const getStyles = (mode: "light" | "dark") =>
  StyleSheet.create({
    card: {
      width: "100%",
      backgroundColor: Colors[mode].cardBackground,
      marginBottom: 5,
    }
  })
