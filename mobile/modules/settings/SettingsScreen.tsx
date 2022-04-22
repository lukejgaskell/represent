import { Button, Card, List, Text, TouchableRipple } from "react-native-paper"
import Colors, { IColors } from "../../constants/Colors"
import { Linking, StyleSheet, View } from "react-native"

import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import supabaseClient from "../../lib/supabaseClient"
import useColorScheme from "../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"
import { useSettingsStore } from "../../stores/useSettingsStore"

const PRIVACY_POLICY_URL = "https://gaskellsolutions.com/privacy-policy"

export default function SettingsScreen() {
  const navigation = useNavigation()
  const colorScheme = useColorScheme()
  const styles = createStyles(Colors[colorScheme])
  const { state, district } = useSettingsStore()

  return (
    <SafeAreaView style={styles.container}>
      <List.Section style={styles.section}>
        <List.Subheader>Account Info</List.Subheader>
        <List.Item
          style={styles.item}
          title="State"
          right={() => <Text style={styles.text}>{`${state}`}</Text>}
          onPress={() => {
            navigation.navigate("Settings", { screen: "AddDistrict" })
          }}
        />
        <List.Item
          style={styles.item}
          title="District"
          right={() => <Text style={styles.text}>{`${district}`}</Text>}
          onPress={() => {
            navigation.navigate("Settings", { screen: "AddDistrict" })
          }}
        />
      </List.Section>
      <List.Section style={styles.section}>
        <List.Subheader>About</List.Subheader>
        <List.Item
          style={styles.item}
          title="Privacy Policy"
          onPress={() => {
            Linking.canOpenURL(PRIVACY_POLICY_URL).then(() => Linking.openURL(PRIVACY_POLICY_URL))
          }}
        />
      </List.Section>
    </SafeAreaView>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      paddingRight: 10,
      paddingLeft: 10,
    },
    text: {
      paddingTop: 8,
      paddingRight: 10,
      // height: "100%",
      // textAlign: "center",
    },
    item: {
      justifyContent: "center",
      textAlignVertical: "center",
      textAlign: "center",
      paddingLeft: 10,
      paddingRight: 10,
    },
    section: {
      backgroundColor: colors.cardBackground,
      borderRadius: 5,
    },
    button: {
      marginTop: 50,
    },
    buttonText: {
      fontSize: 20,
      color: colors.text,
    },
  })
