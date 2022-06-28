import * as React from "react"
import { ActivityIndicator, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { useBillsStore } from "../../useBillsStore"
import { useNavigation } from "@react-navigation/core"
import BillCard from "../../components/BillCard/BillCard"
import { BillsStackParamList } from "../../../../navigation/types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import Colors from "../../../../constants/Colors"
import useColorScheme from "../../../../hooks/useColorScheme"

export type IOwnProps = {
  id: string
}

type IProps = NativeStackScreenProps<BillsStackParamList, "Details">

export function BillDetailsScreen({ route }: IProps) {
  const { id } = route.params
  const { isLoadingItem, loadSelectedBill, selectedItem, unloadSelectedBill } = useBillsStore()
  const navigation = useNavigation()
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  React.useEffect(() => {
    loadSelectedBill({ id })

    return unloadSelectedBill
  }, [id])

  return (
    <ScrollView>
      {isLoadingItem && !selectedItem && <ActivityIndicator size="large" color={colors.text} />}
      {!isLoadingItem && selectedItem && <BillCard {...selectedItem} />}
      {!isLoadingItem && !selectedItem && <Text>Could not find selected member</Text>}
    </ScrollView>
  )
}
