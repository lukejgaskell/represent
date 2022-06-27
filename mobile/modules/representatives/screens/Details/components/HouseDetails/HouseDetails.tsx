import { Card, Divider } from "react-native-paper"
import { StyleSheet, View } from "react-native"

import Colors from "../../../../../../constants/Colors"
import React from "react"
import { Text } from "react-native-paper"
import { MemberExpense, RepresentativeDetails } from "../../../../types"
import useColorScheme from "../../../../../../hooks/useColorScheme"
import { CommonDetails } from "../CommonDetails"

type IProps = RepresentativeDetails

export function HouseDetails(props: IProps) {
  const colorScheme = useColorScheme()

  const styles = getStyles(colorScheme)

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View>
          <CommonDetails {...props} />
          {/* <Divider style={styles.rowMargin} />
          {props.memberExpenses?.map(me => {

            return (
              <View>
                <Text>{`${me.year} - ${me.quarter}`}</Text>
                <Text>{me.category}</Text>
                <Text>{me.amount}</Text>
              </View>
            )
          })} */}
        </View>
      </Card.Content>
    </Card>
  )
}

const getStyles = (mode: "light" | "dark") =>
  StyleSheet.create({
    rowMargin: {
      marginTop: 10,
      marginBottom: 10,
    },
    card: {
      width: "100%",
      backgroundColor: Colors[mode].cardBackground,
      marginBottom: 5,
    },
  })
