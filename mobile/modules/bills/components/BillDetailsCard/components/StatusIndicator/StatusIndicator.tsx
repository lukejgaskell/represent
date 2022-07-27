import React from "react"
import { View } from "react-native"
import { Paragraph, Text, Title } from "react-native-paper"
import useColorScheme from "../../../../../../hooks/useColorScheme"
import { getStyles } from "./styles"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"

type IProps = {
  house_passage: string
  senate_passage: string
  enacted: string
}

export const StatusIndicator = (props: IProps) => {
  const { house_passage, senate_passage, enacted } = props
  const colorScheme = useColorScheme()
  const styles = getStyles(colorScheme)

  const iconColor = colorScheme === "light" ? "black" : "white"

  return (
    <View>
      <View style={styles.row}>
        <View style={[styles.item, !house_passage && styles.currentItem]}>
          {house_passage && <Paragraph style={styles.passageStamp}>Pass</Paragraph>}
          <AntDesign name="home" size={34} color={iconColor} />
          <Text>House</Text>
        </View>
        <View style={[styles.item, !!house_passage && !senate_passage && styles.currentItem]}>
          {senate_passage && <Paragraph style={styles.passageStamp}>Pass</Paragraph>}
          <MaterialCommunityIcons name="gavel" size={34} color={iconColor} />
          <Text>Senate</Text>
        </View>
        <View style={[styles.item, !!senate_passage && !enacted && styles.currentItem]}>
          {enacted && <Paragraph style={styles.passageStamp}>Signed</Paragraph>}
          <MaterialCommunityIcons name="draw" size={34} color={iconColor} />
          <Paragraph>President</Paragraph>
        </View>
      </View>
    </View>
  )
}
