import React, { useEffect, useContext } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { View } from "../../components/Themed"

import { UserContext } from "../../stores/user/UserProvider"
import { MemberCard } from "./MemberCard"
import { MembersContext, MembersProvider } from "./MembersProvider"

function RepresentitivesScreenC() {
  const { settings } = useContext(UserContext)
  const { items, isLoading, loadMembers } = useContext(MembersContext)

  useEffect(() => {
    if (settings?.district && settings.state && loadMembers) {
      loadMembers({ state: settings?.state, district: settings?.district })
    }
  }, [])
  return (
    <ScrollView>
      {items?.map((m, index) => (
        <View key={index}>
          <MemberCard {...m} />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})

export default function RepresentitivesScreen() {
  return (
    <MembersProvider>
      <RepresentitivesScreenC />
    </MembersProvider>
  )
}
