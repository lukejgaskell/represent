import * as React from "react"

import { Activity, ActivityType } from "./types"
import { ActivityIndicator, Text } from "react-native-paper"

import { ActivityStackParamList } from "../../navigation/types"
import Colors from "../../constants/Colors"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ScrollView } from "react-native-gesture-handler"
import { Statement } from "./statements/types"
import StatementDetailsComponent from "./statements/StatementDetails"
import { Vote } from "./votes/types"
import VoteDetailsComponent from "./votes/VoteDetails"
import { useActivityStore } from "./useActivityStore"
import useColorScheme from "../../hooks/useColorScheme"
import { useSettingsStore } from "../../stores/useSettingsStore"

export type IOwnProps = {
  id: string
  type: ActivityType
}

type IProps = NativeStackScreenProps<ActivityStackParamList, "Details">

function renderCard(activity: Activity) {
  if (activity.type === "vote") return <VoteDetailsComponent {...(activity as Vote)} />
  if (activity.type === "statement") return <StatementDetailsComponent {...(activity as Statement)} />
}

export default function ActivityDetailsScreenC({ route }: IProps) {
  const { id, type } = route.params

  const { isLoadingItem, loadSelectedActivity, unloadSelectedActvitity, selectedItem } = useActivityStore()
  const { state, district } = useSettingsStore()
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  React.useEffect(() => {
    loadSelectedActivity({ id, type, state, district })

    return unloadSelectedActvitity
  }, [id, type])

  return (
    <ScrollView>
      {isLoadingItem && !selectedItem && <ActivityIndicator size="large" color={colors.text} />}
      {!isLoadingItem && selectedItem && renderCard(selectedItem)}
      {!isLoadingItem && !selectedItem && <Text>Could not find selected activity</Text>}
    </ScrollView>
  )
}
