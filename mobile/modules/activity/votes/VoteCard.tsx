import { AntDesign, Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { Card, Divider, Paragraph } from "react-native-paper"
import { StyleSheet, View } from "react-native"

import Colors from "../../../constants/Colors"
import React from "react"
import { Vote } from "./types"
import { displayDate } from "../../../lib/dateUtils"
import useColorScheme from "../../../hooks/useColorScheme"

export default function VoteCard({
  id,
  result,
  description,
  total,
  date,
  chamber,
  question,
  memberVotes,
  bill_id,
}: Vote) {
  const colorScheme = useColorScheme()
  const styles = getStyles(colorScheme)

  const isBill = !!bill_id

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={[styles.row, styles.rowSpaceBetween, styles.rowMargin]}>
          <View style={styles.row}>
            {isBill ? (
              <FontAwesome5
                name="scroll"
                size={35}
                style={styles.icon}
                color={colorScheme === "light" ? "black" : "white"}
              />
            ) : (
              <MaterialIcons
                name="gavel"
                size={40}
                style={styles.icon}
                color={colorScheme === "light" ? "black" : "white"}
              />
            )}
            <View>
              <Paragraph>{displayDate(date)}</Paragraph>
              <Paragraph>{chamber}</Paragraph>
            </View>
          </View>
          {bill_id && <Paragraph>{`Bill: ${bill_id}`}</Paragraph>}
        </View>
        <Paragraph style={styles.rowMargin}>{description}</Paragraph>
        <Divider style={styles.rowMargin} />

        <Paragraph>{`Voting ${question}`}</Paragraph>
        <View style={[styles.row, styles.rowSpaceBetween, styles.rowMargin]}>
          <Paragraph>{result}</Paragraph>
          <Paragraph>{`${total?.yes} Yes / ${total?.not_voting + total?.present} Abstain / ${total?.no} No`}</Paragraph>
        </View>
        <Divider style={styles.rowMargin} />

        <View style={[styles.row, styles.rowSpaceBetween, styles.rowMargin]}>
          {memberVotes.map((mv, index) => {
            return (
              <View style={styles.row} key={index}>
                {mv.vote_position === "Yes" && <Feather name="check-circle" size={30} color="green" />}
                {mv.vote_position === "No" && <Feather name="x-circle" size={30} color="red" />}
                {!["Yes", "No"].includes(mv.vote_position) && (
                  <AntDesign name="questioncircleo" size={30} color="grey" />
                )}
                <Paragraph style={styles.name}>{mv.name}</Paragraph>
              </View>
            )
          })}
        </View>
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
