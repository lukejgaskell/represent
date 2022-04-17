import { Button, Paragraph } from "react-native-paper"
import Colors, { IColors } from "../../../constants/Colors"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { Linking, StyleSheet, Text, View } from "react-native"

import React from "react"
import { Statement } from "./types"
import { displayDate } from "../../../lib/dateUtils"
import useColorScheme from "../../../hooks/useColorScheme"

export default function StatementDetailsComponent({ url, date, title, chamber, name }: Statement) {
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])

  return (
    <View style={styles.container}>
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
      <Button style={styles.actionButton} onPress={() => Linking.openURL(url)}>
        <Text>See Full Statement</Text>
        <View style={styles.space} />
        <Ionicons name="open-outline" size={16} color={Colors[colorScheme].actionText} />
      </Button>
    </View>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    name: { marginLeft: 5 },
    icon: { marginRight: 5 },
    rowSpaceBetween: {
      justifyContent: "space-between",
    },
    space: {
      width: 5,
    },
    actionButton: {
      display: "flex",
      marginTop: 20,
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
    container: {
      backgroundColor: colors.cardBackground,

      marginTop: 10,
      marginBottom: 10,
      marginRight: 5,
      marginLeft: 5,

      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
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
