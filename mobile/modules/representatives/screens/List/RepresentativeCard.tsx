import { Card, Text, Title } from "react-native-paper"
import { Image, StyleSheet, View } from "react-native"

import Colors from "../../../../constants/Colors"
import React from "react"
import { Representative } from "../../types"
import { abvToState } from "../../../../lib/stateHelper"
import { letterToParty } from "../../../../lib/partyHelper"
import useColorScheme from "../../../../hooks/useColorScheme"

type IProps = Representative

export function MemberCard({ party, first_name, last_name, title, state, id }: IProps) {
  const colorScheme = useColorScheme()

  const styles = getStyles(colorScheme)

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View>
          <View style={styles.row}>
            <View style={styles.leftColumn}>
              <Image
                style={styles.image}
                source={{
                  uri: `https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/${id}.jpg`,
                }}
              />
            </View>
            <View style={styles.rightColumn}>
              <Title style={styles.name}>{`${first_name} ${last_name}`}</Title>
              <Text style={styles.subtext}>{`${letterToParty.get(party)} ${title}`}</Text>
              <Text style={styles.subtext}>{`Representing ${abvToState.get(state)}`}</Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  )
}

const getStyles = (mode: "light" | "dark") =>
  StyleSheet.create({
    image: {
      height: 120,
      width: 120,
      borderRadius: 10,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      paddingBottom: 15,
    },
    card: {
      width: "100%",
      backgroundColor: Colors[mode].cardBackground,
      marginTop: 5,
      marginBottom: 5,
      paddingTop: 10,
      paddingBottom: 10,
    },
    subtext: {
      fontSize: 16,
    },
    row: {
      width: "100%",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    leftColumn: {
      paddingTop: 10,
      width: "40%",
    },
    rightColumn: {
      paddingTop: 10,
      width: "60%",
    },
  })
