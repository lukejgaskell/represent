import * as React from "react"
import ActivityCard from "./ActivityCard"
import { ActivityProvider, ActivityContext } from "./ActivityProvider"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/core"
import { notify } from "../../lib/notifications"
import { UserContext } from "../../stores/user/UserProvider"

function ActivityScreenC() {
  const activityContext = React.useContext(ActivityContext)
  const { settings } = React.useContext(UserContext)
  const navigation = useNavigation()

  React.useEffect(() => {
    if (settings?.district && settings.state && activityContext.loadActivity) {
      console.log("loading activity!")
      activityContext.loadActivity({ district: settings.district, state: settings.state, reset: true })
    }
  }, [])

  return (
    <ScrollView>
      {activityContext?.items?.map((a, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            if (!a.bill_id) {
              notify("Vote is not related to a bill")
              return
            }
            navigation.navigate("Root", { screen: "Activity", params: { screen: "Details", params: { activityId: a.id } } })
          }}
        >
          <ActivityCard {...a} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default function ActivityScreen() {
  return (
    <ActivityProvider>
      <ActivityScreenC />
    </ActivityProvider>
  )
}
