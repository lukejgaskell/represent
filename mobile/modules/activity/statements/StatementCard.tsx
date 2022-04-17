import { Card, Paragraph } from "react-native-paper"
import { StyleSheet, View } from "react-native"

import Colors from "../../../constants/Colors"
import { MaterialIcons } from "@expo/vector-icons"
import React from "react"
import { Statement } from "./types"
import { displayDate } from "../../../lib/dateUtils"
import useColorScheme from "../../../hooks/useColorScheme"

export default function StatementCard({ url, date, party, statement_type, title, chamber, name }: Statement) {
  const colorScheme = useColorScheme()

  const styles = getStyles(colorScheme)

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={[styles.row, styles.rowSpaceBetween, styles.rowMargin]}>
          <View style={styles.row}>
            <MaterialIcons
              name="gavel"
              size={40}
              style={styles.icon}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <View>
              <Paragraph>{displayDate(date)}</Paragraph>
              <Paragraph>{chamber}</Paragraph>
            </View>
          </View>
        </View>
        <Paragraph style={styles.rowMargin}>{title}</Paragraph>
        <Paragraph style={styles.rowMargin}>{" - " + name}</Paragraph>
      </Card.Content>
    </Card>
  )
}

const getStyles = (mode: "light" | "dark") => {
  return StyleSheet.create({
    name: { marginLeft: 5 },
    icon: { marginRight: 5 },
    rowSpaceBetween: {
      justifyContent: "space-between",
    },
    rowMargin: {
      marginTop: 5,
      marginBottom: 5,
    },
    row: {
      width: "100%",
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
    },
    card: {
      width: "100%",
      backgroundColor: Colors[mode].cardBackground,
      marginTop: 5,
      marginBottom: 5,
    },
    getStartedContainer: {
      alignItems: "center",
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightContainer: {
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      lineHeight: 24,
      textAlign: "center",
    },
    helpContainer: {
      marginTop: 15,
      marginHorizontal: 20,
      alignItems: "center",
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      textAlign: "center",
    },
  })
}
