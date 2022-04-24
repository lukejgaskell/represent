import * as React from "react"

import { Animated, ColorSchemeName, View } from "react-native"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { navigationLightTheme, navigiationDarkTheme } from "../constants/Themes"

import ActivityDetailsScreen from "../modules/activity/ActivityDetailsScreen"
import ActivityScreen from "../modules/activity/ActivityScreen"
import AddDistrictScreen from "../screens/AddDistrictScreen"
import Colors from "../constants/Colors"
import DarkLogoNoText from "../components/images/DarkLogoNoText"
import { FontAwesome } from "@expo/vector-icons"
import { IconButton } from "react-native-paper"
import ReportScreen from "../modules/settings/ReportScreen"
import RepresentativeDetailsScreen from "../modules/representatives/details/RepresentativeDetailsScreen"
import RepresentativesScreen from "../modules/representatives/RepresentativesScreen"
import SettingsScreen from "../modules/settings/SettingsScreen"
import WelcomeScreen from "../screens/WelcomeScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import useCachedResources from "../hooks/useCachedResources"
import useColorScheme from "../hooks/useColorScheme"
import { useSettingsStore } from "../stores/useSettingsStore"
import { useState } from "react"

const headerStyle = (colorScheme: "dark" | "light") => ({
  backgroundColor: Colors[colorScheme].cardBackground,
})

function UserHeaderButton() {
  const navigation = useNavigation()

  return (
    <IconButton
      size={30}
      icon="account-cog"
      style={{ marginTop: -3, marginRight: -5 }}
      onPress={() => navigation.navigate("Settings")}
    />
  )
}

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}

const ActivityStack = createNativeStackNavigator()

function ActivityNavigator() {
  const colorScheme = useColorScheme()
  return (
    <ActivityStack.Navigator initialRouteName="List">
      <ActivityStack.Screen
        name="List"
        options={{
          title: "Activity",
          headerStyle: headerStyle(colorScheme),
          headerRight: () => <UserHeaderButton />,
        }}
        component={ActivityScreen}
      />
      <ActivityStack.Screen
        name="Details"
        options={{
          title: "",
          headerStyle: headerStyle(colorScheme),
          headerRight: () => <UserHeaderButton />,
          headerShadowVisible: false,
        }}
        component={ActivityDetailsScreen}
      />
    </ActivityStack.Navigator>
  )
}

const MembersStack = createNativeStackNavigator()

function MembersNavigator() {
  const colorScheme = useColorScheme()
  return (
    <MembersStack.Navigator initialRouteName="List">
      <MembersStack.Screen
        name="List"
        options={{
          title: "Representatives",
          headerStyle: headerStyle(colorScheme),
          headerRight: () => <UserHeaderButton />,
        }}
        component={RepresentativesScreen}
      />
      <MembersStack.Screen
        name="Details"
        options={{
          title: "",
          headerStyle: headerStyle(colorScheme),
          headerRight: () => <UserHeaderButton />,
          headerShadowVisible: false,
        }}
        component={RepresentativeDetailsScreen}
      />
    </MembersStack.Navigator>
  )
}

const SettingsStack = createNativeStackNavigator()

function SettingsNavigator() {
  const navigation = useNavigation()
  const colorScheme = useColorScheme()
  return (
    <SettingsStack.Navigator initialRouteName="List">
      <SettingsStack.Screen
        name="List"
        options={{
          title: "Settings",
          headerStyle: headerStyle(colorScheme),
          headerLeft: () => (
            <IconButton icon="window-close" style={{ marginLeft: -10 }} onPress={() => navigation.navigate("Root")} />
          ),
        }}
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name="AddDistrict"
        options={{
          headerStyle: headerStyle(colorScheme),
          title: "State | District",
        }}
        component={AddDistrictScreen}
      />
      <SettingsStack.Screen
        name="Report"
        options={{
          headerStyle: headerStyle(colorScheme),
          title: "Feedback",
        }}
        component={ReportScreen}
      />
    </SettingsStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="Activity"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].actionText,
          tabBarActiveBackgroundColor: Colors[colorScheme].cardBackground,
          tabBarInactiveBackgroundColor: Colors[colorScheme].cardBackground,
        }}
      >
        <BottomTab.Screen
          name="Activity"
          component={ActivityNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            tabBarStyle: {
              backgroundColor: Colors[colorScheme].cardBackground,
            },
          }}
        />
        <BottomTab.Screen
          name="Representatives"
          component={MembersNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
            tabBarStyle: {
              backgroundColor: Colors[colorScheme].cardBackground,
            },
          }}
        />
      </BottomTab.Navigator>
    </>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator()

function RootNavigator() {
  const areCashedResourcesReady = useCachedResources()
  const isLoadingComplete = areCashedResourcesReady
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0))

  React.useEffect(() => {
    if (isLoadingComplete && !isAnimationComplete) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start(() => setIsAnimationComplete(true))
    }
  }, [isLoadingComplete])

  if (!isLoadingComplete) {
    return null
  }

  if (!isAnimationComplete) {
    const widthAnim = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [230, 4],
    })
    const heightAnim = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [345, 6],
    })
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.dark.authBackground,
        }}
      >
        <Animated.View style={{ width: widthAnim, height: heightAnim }}>
          <DarkLogoNoText width="100%" height="100%" />
        </Animated.View>
      </View>
    )
  }

  return <LoggedInNavigator />
}

function LoggedInNavigator() {
  const { state, district, hasSeenWelcome } = useSettingsStore()

  return (
    <Stack.Navigator>
      {!hasSeenWelcome && (
        <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false, animation: "none" }} />
      )}
      {(!district || !state) && (
        <Stack.Screen
          name="add-district"
          component={AddDistrictScreen}
          options={{ headerShown: false, animation: "none" }}
        />
      )}
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false, animation: "none" }} />
      <Stack.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === "dark" ? navigiationDarkTheme : navigationLightTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}
