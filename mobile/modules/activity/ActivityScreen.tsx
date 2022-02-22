import * as React from "react"

import { ActivityContext, ActivityProvider } from "./ActivityProvider"
import { Animated, NativeScrollEvent, RefreshControl } from "react-native"
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler"

import ActivityCard from "./ActivityCard"
import { UserContext } from "../../stores/user/UserProvider"
import { notify } from "../../lib/notifications"
import { useNavigation } from "@react-navigation/core"

function ActivityScreenC() {
  const { isLoading, loadActivity, items } = React.useContext(ActivityContext)
  const { settings } = React.useContext(UserContext)
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0))
  const navigation = useNavigation()

  function loadData(reset = true) {
    if (settings?.district && settings.state && loadActivity) {
      loadActivity({ district: settings.district, state: settings.state, reset })
    }
  }

  function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) {
    const paddingToBottom = 1000
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }

  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: false,
      })}
      onMomentumScrollEnd={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !isLoading) {
          loadData(false)
        }
      }}
      refreshControl={<RefreshControl refreshing={isLoading || false} onRefresh={loadData} />}
    >
      {items?.map((a, index) => (
        <TouchableWithoutFeedback
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
        </TouchableWithoutFeedback>
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
