import { Card, Divider, Paragraph, Title, Button, Text } from "react-native-paper"
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import useColorScheme from "../../../../hooks/useColorScheme"
import { Bill } from "../../types"
import { displayDate } from "../../../../lib/dateUtils"
import Colors from "../../../../constants/Colors"
import { StatusIndicator } from "./components/StatusIndicator"
import { PresidentialStatements } from "./components/PresidentialStatements"
import colors from "../../../../constants/Colors"
import { EvilIcons } from "@expo/vector-icons"

export function BillDetailsCard(props: Bill) {
  const {
    congressdotgov_url,
    latest_major_action_date,
    title,
    summary_short,
    summary,
    latest_major_action,
    house_passage,
    senate_passage,
    presidential_statements,
    enacted,
  } = props
  const [showMore, setShowMore] = useState(false)
  const colorScheme = useColorScheme()
  const styles = getStyles(colorScheme)

  return (
    <>
      <StatusIndicator house_passage={house_passage} senate_passage={senate_passage} enacted={enacted} />
      <Card style={styles.container}>
        <Card.Content>
          <View>
            <View style={[styles.row, styles.rowSpaceBetween]}>
              <Title>Latest Major Action</Title>
              <Text>{displayDate(latest_major_action_date)}</Text>
            </View>
            <Paragraph>{latest_major_action}</Paragraph>
          </View>
          <Divider style={styles.rowMargin} />
          <Title>Bill Title</Title>
          <Paragraph style={styles.rowMargin}>{title}</Paragraph>
          {congressdotgov_url && (
            <TouchableOpacity
              style={styles.row}
              onPress={() => Linking.canOpenURL(congressdotgov_url).then(() => Linking.openURL(congressdotgov_url))}
            >
              <EvilIcons name="external-link" size={20} color={colors[colorScheme].actionText} />
              <Text style={{ color: colors[colorScheme].actionText }}>Go To Full Bill</Text>
            </TouchableOpacity>
          )}
          {summary_short ? (
            <>
              <Divider style={styles.rowMargin} />
              <Title style={styles.rowMargin}>Summary</Title>
              <Paragraph style={styles.rowMargin}>{showMore ? summary : summary_short}</Paragraph>
              {summary && summary !== summary_short && (
                <Button onPress={() => setShowMore(!showMore)}>{showMore ? "Show Less" : "Show More"}</Button>
              )}
            </>
          ) : null}
          <PresidentialStatements presidential_statements={presidential_statements} />
        </Card.Content>
      </Card>
    </>
  )
}

const getStyles = (mode: "light" | "dark") => {
  return StyleSheet.create({
    name: { padding: 10, backgroundColor: "green" },
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
    container: {
      backgroundColor: Colors[mode].cardBackground,
      borderWidth: 0,

      padding: 7,
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
