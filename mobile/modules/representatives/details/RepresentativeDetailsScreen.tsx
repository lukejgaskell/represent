import * as React from "react"

import { ActivityIndicator, Text } from "react-native-paper"

import Colors from "../../../constants/Colors"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RepresentativeDetailsView } from "./RepresentativeDetailsView"
import { RepresentativeStackParamList } from "../../../navigation/types"
import { ScrollView } from "react-native-gesture-handler"
import useColorScheme from "../../../hooks/useColorScheme"
import { useMembersStore } from "../useMemberStore"
import { useSettingsStore } from "../../../stores/useSettingsStore"

export type IOwnProps = {
  id: string
}

type IProps = NativeStackScreenProps<RepresentativeStackParamList, "Details">

export default function RepresentativeDetailsScreen({ route }: IProps) {
  const { id } = route.params

  const { isLoadingSelectedItem, loadSelectedMember, unloadSelectedItem, selectedItem } = useMembersStore()
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  React.useEffect(() => {
    loadSelectedMember(id)

    return unloadSelectedItem
  }, [id])

  return (
    <ScrollView>
      {isLoadingSelectedItem && !selectedItem && <ActivityIndicator size="large" color={colors.text} />}
      {!isLoadingSelectedItem && selectedItem && <RepresentativeDetailsView {...selectedItem} />}
      {!isLoadingSelectedItem && !selectedItem && <Text>Could not find selected member</Text>}
    </ScrollView>
  )
}
