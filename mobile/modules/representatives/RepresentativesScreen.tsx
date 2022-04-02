import { MembersContext, MembersProvider } from "./MembersProvider"
import React, { useContext, useEffect } from "react"
import { RefreshControl, ScrollView, StyleSheet } from "react-native"

import { AppContext } from "../../stores/user/AppProvider"
import { MemberCard } from "./MemberCard"

function RepresentitivesScreenC() {
  const { settings } = useContext(AppContext)
  const { items, isLoading, loadMembers } = useContext(MembersContext)

  function loadData() {
    if (settings?.district && settings.state && loadMembers) {
      loadMembers({ state: settings?.state, district: settings?.district })
    }
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

export default function RepresentitivesScreen() {
  return (
    <MembersProvider>
      <RepresentitivesScreenC />
    </MembersProvider>
  )
}
