import React, { useEffect } from "react"
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler"

import { MemberCard } from "./RepresentativeCard"
import { RefreshControl } from "react-native"
import { useMembersStore } from "./useMemberStore"
import { useNavigation } from "@react-navigation/native"
import { useSettingsStore } from "../../stores/useSettingsStore"

export default function RepresentitivesScreen() {
  const { district, state } = useSettingsStore()
  const { items, isLoading, loadMembers } = useMembersStore()
  const navigation = useNavigation()

  function loadData() {
    loadMembers({ state, district })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isLoading || false} onRefresh={loadData} />}>
      {items?.map((m, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            navigation.navigate("Root", {
              screen: "Representatives",
              params: { screen: "Details", params: { id: m.id } },
            })
          }}
        >
          <MemberCard {...m} />
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  )
}
