/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { IOwnProps as IActivityDetailsProps } from "./modules/activity/ActivityDetailsScreen"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Auth: undefined
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>

export type ActivityStackParamList = {
  List: undefined
  Details: IActivityDetailsProps
}

export type SettingsStackParamList = {
  List: undefined
  AddDistrict: undefined
}

export type RootTabParamList = {
  Activity: NavigatorScreenParams<ActivityStackParamList>
  Representatives: undefined
  Settings: NavigatorScreenParams<SettingsStackParamList>
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type Paginated<T> = {
  hasMore: boolean
  items: Array<T>
  nextPage: number
}
