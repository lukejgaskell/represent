import { Member } from "./types"
import React from "react"
import { Button, Card, Text } from "react-native-paper"
import { Linking, View } from "react-native"

type IProps = Member

function partyToColor(party: string) {
  switch ((party || "").toUpperCase()) {
    case "D":
      return "bg-blue-400"
    case "R":
      return "bg-red-400"
  }
  return ""
}

export function MemberCard({
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
}: IProps) {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Content>
        <View>
          <View>
            <View>
              <Text>{`${first_name} ${last_name}`}</Text>
            </View>
            <View>
              <Text>{`${state} | ${title}`}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>{`With Party % : ${votes_with_party_pct}`}</Text>
              <Text>{`Missed Votes %: ${missed_votes_pct}`}</Text>
            </View>
            <View>
              <Text>{`Next Election: ${next_election}`}</Text>
            </View>
          </View>
          <View>
            {facebook_account && (
              <View>
                <Button
                  onPress={() => Linking.canOpenURL(`https://www.facebook.com/${facebook_account}`).then(() => Linking.openURL(`https://www.facebook.com/${facebook_account}`))}
                >
                  Facebook
                </Button>
              </View>
            )}
            {twitter_account && (
              <View>
                <Button onPress={() => Linking.canOpenURL(`https://www.twitter.com/${twitter_account}`).then(() => Linking.openURL(`https://www.twitter.com/${twitter_account}`))}>
                  Twitter
                </Button>
              </View>
            )}
            {youtube_account && (
              <View>
                <Button onPress={() => Linking.canOpenURL(`https://www.youtube.com/${youtube_account}`).then(() => Linking.openURL(`https://www.youtube.com/${youtube_account}`))}>
                  Youtube
                </Button>
              </View>
            )}
            {contact_form && (
              <View>
                <Button onPress={() => Linking.canOpenURL(`${contact_form}`).then(() => Linking.openURL(`${contact_form}`))}>Contact</Button>
              </View>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  )
}
