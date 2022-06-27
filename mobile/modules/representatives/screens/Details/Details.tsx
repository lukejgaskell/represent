import * as React from "react"

import { ActivityIndicator, Text } from "react-native-paper"

import Colors from "../../../../constants/Colors"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RepresentativeStackParamList } from "../../../../navigation/types"
import { ScrollView } from "react-native-gesture-handler"
import useColorScheme from "../../../../hooks/useColorScheme"
import { useMembersStore } from "../../useMemberStore"
import { HouseDetails } from "./components/HouseDetails"
import { SentatorDetails } from "./components/SenatorDetails"

export type IOwnProps = {
  id: string
}

type IProps = NativeStackScreenProps<RepresentativeStackParamList, "Details">

function getMemberDetails(type?: 'house' | 'senate') {
  switch (type) {
    case 'house': return HouseDetails;
    case 'senate': return SentatorDetails;
    default: return () => null;
  }
}

export function Details({ route }: IProps) {
  const { id } = route.params

  const { isLoadingSelectedItem, loadSelectedMember, unloadSelectedItem, selectedItem } = useMembersStore()
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  React.useEffect(() => {
    loadSelectedMember(id)

    return unloadSelectedItem
  }, [id])


  const DetailsComponent = getMemberDetails(selectedItem?.type)
  return (
    <ScrollView>
      {isLoadingSelectedItem && !selectedItem && <ActivityIndicator size="large" color={colors.text} />}
      {!isLoadingSelectedItem && selectedItem && <DetailsComponent {...selectedItem} />}
      {!isLoadingSelectedItem && !selectedItem && <Text>Could not find selected member</Text>}
    </ScrollView>
  )
}
