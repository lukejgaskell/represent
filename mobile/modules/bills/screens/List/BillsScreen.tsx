import * as React from "react"
import { Animated, NativeScrollEvent, RefreshControl } from "react-native"
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler"

import { useBillsStore } from "../../useBillsStore"
import { useNavigation } from "@react-navigation/core"
import { BillCard } from "../../components/BillCard"

export function BillsScreen() {
  const { isLoadingList, loadBills, items } = useBillsStore()
  const [scrollY] = React.useState(new Animated.Value(0))
  const navigation = useNavigation()

  function loadData(reset = true) {
    loadBills({ reset })
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
      {items?.map((b, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            navigation.navigate("Root", {
              screen: "Bills",
              params: { screen: "Details", params: { id: b.id } },
            })
          }}
        >
          <BillCard {...b} />
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  )
}
