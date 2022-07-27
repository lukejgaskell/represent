import { EvilIcons } from "@expo/vector-icons"
import React from "react"
import { Linking, TouchableOpacity, View } from "react-native"
import { Title, Text, Divider } from "react-native-paper"
import colors from "../../../../../../constants/Colors"
import useColorScheme from "../../../../../../hooks/useColorScheme"
import { PresStatements } from "../../../../types"
import { getStyles } from "./styles"

type IProps = {
  presidential_statements: PresStatements[]
}

const getName = (url: string) =>
  url
    ?.substring(url.lastIndexOf("/") + 1)
    .replaceAll(/-/g, " ")
    .replace(".pdf", "")

export const PresidentialStatements = (props: IProps) => {
  const { presidential_statements } = props
  const colorScheme = useColorScheme()
  const styles = getStyles(colorScheme)

  if (!presidential_statements) return null

  return (
    <>
      <Divider style={styles.rowMargin} />
      <View>
        <Title>Presidential Statements</Title>
        {presidential_statements.map((ps, index) => (
          <TouchableOpacity
            style={styles.row}
            key={index}
            onPress={() => Linking.canOpenURL(ps.url).then(() => Linking.openURL(ps.url))}
          >
            <EvilIcons name="external-link" size={20} color={colors[colorScheme].actionText} />
            <Text style={{ color: colors[colorScheme].actionText }}>{getName(ps.url)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}
