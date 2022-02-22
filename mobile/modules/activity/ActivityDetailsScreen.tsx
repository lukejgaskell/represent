import * as React from "react"

import { ActivityIndicator, Text } from "react-native-paper"

import { ActivityDetails } from "./types"
import ActivityDetailsCard from "./ActivityDetails"
import { ActivityProvider } from "./ActivityProvider"
import { ActivityStackParamList } from "../../types"
import Colors from "../../constants/Colors"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ScrollView } from "react-native-gesture-handler"
import { getActivityDetails } from "./api"
import useColorScheme from "../../hooks/useColorScheme"

export type IOwnProps = {
  activityId: string
}

type IProps = NativeStackScreenProps<ActivityStackParamList, "Details">

function ActivityDetailsScreenC({ route }: IProps) {
  const { activityId } = route.params

  const [details, setDetails] = React.useState<ActivityDetails | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  function loadData() {
    getActivityDetails({ activityId }).then(({ data, error }) => {
      if (data) setDetails(data)
      setIsLoading(false)
    })
  }

  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <ScrollView>
      {isLoading && !details && <ActivityIndicator size="large" color={colors.text} />}
      {details && <ActivityDetailsCard {...details} />}
      {!isLoading && !details && <Text>Could not find selected activity</Text>}
    </ScrollView>
  )
}

export default function ActivityDetailsScreen(props: IProps) {
  return (
    <ActivityProvider>
      <ActivityDetailsScreenC {...props} />
    </ActivityProvider>
  )
}
