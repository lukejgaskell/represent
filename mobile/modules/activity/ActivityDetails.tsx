import { AntDesign, Feather } from "@expo/vector-icons"
import { Button, Divider, Paragraph, Title } from "react-native-paper"
import Colors, { IColors } from "../../constants/Colors"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"

import { ActivityDetails } from "./types"
import { displayDate } from "../../lib/dateUtils"
import useColorScheme from "../../hooks/useColorScheme"

type IProps = ActivityDetails

export default function ActivityDetailsCard({ bill, bill_id }: IProps) {
  const [showMore, setShowMore] = useState(false)
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])

  console.log(`attempting render`, bill)

  return (
    <View style={styles.container}>
      <Title style={styles.rowMargin}>{`Bill ${bill_id}`}</Title>
      <Paragraph style={styles.rowMargin}>{bill.title}</Paragraph>
      <Divider style={styles.rowMargin} />
      <Title style={styles.rowMargin}>Info</Title>
      <Paragraph style={styles.rowMargin}>{`Is About ${bill.primary_subject}`}</Paragraph>
      <Paragraph style={styles.rowMargin}>{`Introduced ${displayDate(bill.introduced_date)}`}</Paragraph>

      <View style={[styles.row, styles.rowSpaceBetween, styles.rowMargin]}>
        <View style={styles.row}>
          {bill.house_passage ? <Feather name="check-circle" size={30} color="green" /> : <AntDesign name="questioncircleo" size={30} color="grey" />}
          <Paragraph>House</Paragraph>
        </View>
        <View style={styles.row}>
          {bill.senate_passage ? <Feather name="check-circle" size={30} color="green" /> : <AntDesign name="questioncircleo" size={30} color="grey" />}
          <Paragraph>Senate</Paragraph>
        </View>
      </View>
      <Divider style={styles.rowMargin} />
      <View style={[styles.row, styles.rowSpaceBetween, styles.rowMargin]}>
        <Title>Latest Major Action</Title>
        <Paragraph>{bill.latest_major_action_date}</Paragraph>
      </View>
      <Paragraph style={styles.rowMargin}>{bill.latest_major_action}</Paragraph>
      {bill.summary_short ? (
        <>
          <Divider style={styles.rowMargin} />
          <Title style={styles.rowMargin}>Summary</Title>
          <Paragraph style={styles.rowMargin}>{showMore ? bill.summary : bill.summary_short}</Paragraph>
          {bill.summary && bill.summary !== bill.summary_short && <Button onPress={() => setShowMore(!showMore)}>{showMore ? "Show Less" : "Show More"}</Button>}
        </>
      ) : null}
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
