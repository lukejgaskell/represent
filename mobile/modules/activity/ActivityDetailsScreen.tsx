import * as React from "react"
import { ActivityProvider } from "./ActivityProvider"
import { ScrollView } from "react-native-gesture-handler"
import { getActivityDetails } from "./api"
import { ActivityDetails } from "./types"
import ActivityDetailsCard from "./ActivityDetails"
import useColorScheme from "../../hooks/useColorScheme"
import Colors from "../../constants/Colors"
import { ActivityIndicator } from "react-native"
import { Text } from "react-native-paper"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ActivityStackParamList } from "../../types"

type IProps = NativeStackScreenProps<ActivityStackParamList, "Details">

function ActivityDetailsScreenC({ route }: IProps) {
  const { activityId } = route.params

  const [details, setDetails] = React.useState<ActivityDetails | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  React.useEffect(() => {
    getActivityDetails({ activityId }).then(({ data, error }) => {
      if (data) setDetails(data)
      setIsLoading(false)
    })
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
