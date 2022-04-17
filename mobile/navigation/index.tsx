import * as React from "react"

import { Animated, ColorSchemeName, View } from "react-native"
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation } from "@react-navigation/native"

import ActivityDetailsScreen from "../modules/activity/ActivityDetailsScreen"
import { ActivityProvider } from "../modules/activity/ActivityProvider"
import ActivityScreen from "../modules/activity/ActivityScreen"
import AddDistrictScreen from "../screens/AddDistrictScreen"
import { AppContext } from "../stores/user/AppProvider"
import Colors from "../constants/Colors"
import DarkLogoNoText from "../components/images/DarkLogoNoText"
import { FontAwesome } from "@expo/vector-icons"
import { IconButton } from "react-native-paper"
import LoadingScreen from "../screens/LoadingScreen"
import RepresentativesScreen from "../modules/representatives/RepresentativesScreen"
import SettingsScreen from "../modules/settings/SettingsScreen"
import Toast from "react-native-toast-message"
import WelcomeScreen from "../screens/WelcomeScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import useCachedResources from "../hooks/useCachedResources"
import useColorScheme from "../hooks/useColorScheme"
import { useState } from "react"

function UserHeaderButton() {
  const navigation = useNavigation()

  return <IconButton size={30} icon="account-cog" style={{ marginTop: -3, marginRight: -5 }} onPress={() => navigation.navigate("Settings")} />
}

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}

const ActivityStack = createNativeStackNavigator()

function ActivityNavigator() {
  return (
    <ActivityProvider>
      <ActivityStack.Navigator initialRouteName="List">
        <ActivityStack.Screen name="List" options={{ title: "Activity", headerRight: () => <UserHeaderButton /> }} component={ActivityScreen} />
        <ActivityStack.Screen name="Details" options={{ title: "Details", headerRight: () => <UserHeaderButton /> }} component={ActivityDetailsScreen} />
      </ActivityStack.Navigator>
    </ActivityProvider>
  )
}

const MembersStack = createNativeStackNavigator()

function MembersNavigator() {
  return (
    <MembersStack.Navigator initialRouteName="List">
      <MembersStack.Screen name="List" options={{ title: "Representatives", headerRight: () => <UserHeaderButton /> }} component={RepresentativesScreen} />
    </MembersStack.Navigator>
  )
}

const SettingsStack = createNativeStackNavigator()

function SettingsNavigator() {
  const navigation = useNavigation()
  return (
    <SettingsStack.Navigator initialRouteName="List">
      <SettingsStack.Screen
        name="List"
        options={{ title: "Settings", headerLeft: () => <IconButton icon="window-close" style={{ marginLeft: -10 }} onPress={() => navigation.navigate("Root")} /> }}
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="AddDistrict" options={{ title: "State | District" }} component={AddDistrictScreen} />
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
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}
      >
        <BottomTab.Screen
          name="Activity"
          component={ActivityNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Representatives"
          component={MembersNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
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
  const { settings, isLoading } = React.useContext(AppContext)

  return (
    <Stack.Navigator>
      {isLoading && <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false, animation: "none" }} />}
      {!settings?.hasSeenWelcome && <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false, animation: "none" }} />}
      {(!settings?.district || !settings?.state) && <Stack.Screen name="add-district" component={AddDistrictScreen} options={{ headerShown: false, animation: "none" }} />}
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
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      <Toast ref={ref => Toast.setRef(ref)} />
    </NavigationContainer>
  )
}
