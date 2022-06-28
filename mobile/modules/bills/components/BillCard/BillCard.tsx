import { AntDesign, Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { Button, Card, Divider, Paragraph, Title } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import React, { useState } from "react"
import useColorScheme from "../../../../hooks/useColorScheme"
import { Bill } from "../../types"
import { displayDate } from "../../../../lib/dateUtils"
import Colors from "../../../../constants/Colors"

export default function BillCard(props: Bill) {
  const { latest_major_action_date, summary_short, summary, bill_id } = props
  const [showMore, setShowMore] = useState(false)
  const colorScheme = useColorScheme()
  const styles = getStyles(colorScheme)

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={[styles.row, styles.rowSpaceBetween, styles.rowMargin]}>
          <View style={styles.row}>
            <FontAwesome5
              name="scroll"
              size={35}
              style={styles.icon}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <View>
              <Paragraph>{displayDate(latest_major_action_date)}</Paragraph>
            </View>
          </View>
        </View>
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
