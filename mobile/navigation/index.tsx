/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { ColorSchemeName } from "react-native"

import Colors from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import ActivityScreen from "../modules/activity/ActivityScreen"
import RepresentativesScreen from "../modules/representatives/RepresentativesScreen"
import AuthScreen from "../screens/AuthScreen"
import SettingsScreen from "../modules/settings/SettingsScreen"
import { AuthContext } from "../stores/user/AuthProvider"
import LoadingScreen from "../screens/LoadingScreen"
import ActivityDetailsScreen from "../modules/activity/ActivityDetailsScreen"
import Toast from "react-native-toast-message"
import { UserContext, UserProvider } from "../stores/user/UserProvider"
import WelcomeScreen from "../screens/WelcomeScreen"
import AddDistrictScreen from "../screens/AddDistrictScreen"

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}

const ActivityStack = createNativeStackNavigator()

function ActivityNavigator() {
  return (
    <ActivityStack.Navigator initialRouteName="List">
      <Stack.Screen name="List" options={{ title: "Activity" }} component={ActivityScreen} />
      <Stack.Screen name="Details" options={{ title: "Details" }} component={ActivityDetailsScreen} />
    </ActivityStack.Navigator>
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
          component={RepresentativesScreen}
          options={{
            title: "Representatives",
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
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
  const auth = React.useContext(AuthContext)

  if (auth.user === null) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  if (auth.user === false) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  return (
    <UserProvider>
      <LoggedInNavigator />
    </UserProvider>
  )
}

function LoggedInNavigator() {
  const { settings, isLoading } = React.useContext(UserContext)
  return (
    <Stack.Navigator>
      {isLoading && <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />}
      {!settings?.hasSeenWelcome && <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false }} />}
      {(!settings?.district || !settings?.state) && <Stack.Screen name="add-district" component={AddDistrictScreen} options={{ headerShown: false }} />}
      {<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />}
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
