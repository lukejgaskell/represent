import React, { useContext, useEffect } from "react"
import { RefreshControl, ScrollView, StyleSheet } from "react-native"

import { MemberCard } from "./MemberCard"
import { useMembersStore } from "./useMemberStore"
import { useSettingsStore } from "../../stores/useSettingsStore"

export default function RepresentitivesScreen() {
  const { district, state } = useSettingsStore()
  const { items, isLoading, loadMembers } = useMembersStore()

  function loadData() {
    loadMembers({ state, district })
  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isLoading || false} onRefresh={loadData} />}>
      {items?.map((m, index) => (
        <MemberCard {...m} key={index} />
      ))}
    </ScrollView>
  )
}
