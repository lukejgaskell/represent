import * as React from "react"

import { Activity, ActivityType } from "./types"
import { Animated, NativeScrollEvent, RefreshControl } from "react-native"
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler"

import { ActivityContext } from "./ActivityProvider"
import { Statement } from "./statements/types"
import StatementCard from "./statements/StatementCard"
import { Vote } from "./votes/types"
import VoteCard from "./votes/VoteCard"
import { useNavigation } from "@react-navigation/core"

function renderCard(activity: Activity) {
  if (activity.type === "vote") return <VoteCard {...(activity as Vote)} />
  if (activity.type === "statement") return <StatementCard {...(activity as Statement)} />
  return null
}

export default function ActivityScreenC() {
  const { isLoadingList, loadActivity, items } = React.useContext(ActivityContext)
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0))
  const navigation = useNavigation()

  function loadData(reset = true) {
    if (loadActivity) {
      loadActivity({ reset })
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
        if (isCloseToBottom(nativeEvent) && !isLoadingList) {
          loadData(false)
        }
      }}
      refreshControl={<RefreshControl refreshing={isLoadingList || false} onRefresh={loadData} />}
    >
      {items?.map((a, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            navigation.navigate("Root", {
              screen: "Activity",
              params: { screen: "Details", params: { id: a.id, type: a.type as ActivityType } },
            })
          }}
        >
          {renderCard(a)}
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  )
}
