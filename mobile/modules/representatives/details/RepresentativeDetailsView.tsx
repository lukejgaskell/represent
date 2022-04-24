import { Button, Card, Divider, Text, Title } from "react-native-paper"
import { Image, Linking, StyleSheet, View } from "react-native"

import Colors from "../../../constants/Colors"
import React from "react"
import { Representative } from "../types"
import { abvToState } from "../../../lib/stateHelper"
import { letterToParty } from "../../../lib/partyHelper"
import useColorScheme from "../../../hooks/useColorScheme"

type IProps = Representative

export function RepresentativeDetailsView({
  party,
  first_name,
  last_name,
  title,
  votes_with_party_pct,
  missed_votes_pct,
  state,
  twitter_account,
  youtube_account,
  facebook_account,
  contact_form,
  next_election,
  id,
}: IProps) {
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
          <Divider style={styles.rowMargin} />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text>{`With Party %: ${votes_with_party_pct}`}</Text>
            </View>
            <View style={styles.column}>
              <Text>{`Missed Votes %: ${missed_votes_pct}`}</Text>
            </View>
            <View style={styles.column}>
              <Text>{`Next Election: ${next_election}`}</Text>
            </View>
          </View>
          <Divider style={styles.rowMargin} />
          <View style={styles.row}>
            {facebook_account && (
              <View style={styles.column}>
                <Button
                  style={styles.facebook_button}
                  mode="contained"
                  onPress={() =>
                    Linking.canOpenURL(`https://www.facebook.com/${facebook_account}`).then(() =>
                      Linking.openURL(`https://www.facebook.com/${facebook_account}`)
                    )
                  }
                >
                  Facebook
                </Button>
              </View>
            )}
            {twitter_account && (
              <View style={styles.column}>
                <Button
                  style={styles.twitter_button}
                  mode="contained"
                  onPress={() =>
                    Linking.canOpenURL(`https://www.twitter.com/${twitter_account}`).then(() =>
                      Linking.openURL(`https://www.twitter.com/${twitter_account}`)
                    )
                  }
                >
                  Twitter
                </Button>
              </View>
            )}
            {youtube_account && (
              <View style={styles.column}>
                <Button
                  style={styles.youtube_button}
                  mode="contained"
                  onPress={() =>
                    Linking.canOpenURL(`https://www.youtube.com/${youtube_account}`).then(() =>
                      Linking.openURL(`https://www.youtube.com/${youtube_account}`)
                    )
                  }
                >
                  Youtube
                </Button>
              </View>
            )}
            {contact_form && (
              <View style={styles.column}>
                <Button
                  style={styles.contact_button}
                  mode="contained"
                  onPress={() => Linking.canOpenURL(`${contact_form}`).then(() => Linking.openURL(`${contact_form}`))}
                >
                  Contact
                </Button>
              </View>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  )
}

const getStyles = (mode: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    leftColumn: {
      paddingTop: 10,
      width: "40%",
    },
    rightColumn: {
      paddingTop: 10,
      width: "60%",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      paddingBottom: 15,
    },
    subtext: {
      fontSize: 16,
    },
    image: {
      height: 120,
      width: 120,
      borderRadius: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    card: {
      width: "100%",
      backgroundColor: Colors[mode].cardBackground,
      marginBottom: 5,
    },
    rowMargin: {
      marginTop: 10,
      marginBottom: 10,
    },
    row: {
      width: "100%",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    column: {
      paddingTop: 10,
      width: "49%",
    },
    youtube_button: {
      color: "white",
      backgroundColor: "#B91C1C",
    },
    facebook_button: {
      color: "white",
      backgroundColor: "#1877F2",
    },
    twitter_button: {
      color: "white",
      backgroundColor: "#1DA1F2",
    },
    contact_button: {
      color: "white",
      backgroundColor: "#047857",
    },
  })
