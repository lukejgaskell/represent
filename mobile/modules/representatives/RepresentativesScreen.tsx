import React, { useEffect, useContext } from "react"
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native"

import EditScreenInfo from "../../components/EditScreenInfo"
import { Text, View } from "../../components/Themed"
import { UserContext } from "../../stores/user/UserProvider"
import { getMembers } from "./api"
import { MemberCard } from "./MemberCard"
import { MembersContext } from "./MembersProvider"

export default function RepresentitivesScreen() {
  const { settings } = useContext(UserContext)
  const { items, isLoading, loadMembers } = useContext(MembersContext)

  useEffect(() => {
    if (settings?.district && settings.state && loadMembers) {
      loadMembers({ state: settings?.state, district: settings?.district })
    }
  })
  return (
    <ScrollView>
      {items?.map((m, index) => (
        <TouchableOpacity key={index}>
          <MemberCard {...m} />
        </TouchableOpacity>
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
