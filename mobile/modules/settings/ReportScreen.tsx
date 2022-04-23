import { Button, Text, TextInput, Title } from "react-native-paper"
import Colors, { IColors } from "../../constants/Colors"
import React, { useState } from "react"

import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"
import { SettingsStackParamList } from "../../navigation/types"
import { StyleSheet } from "react-native"
import SuccessMessage from "../../components/SuccessMessage"
import { createFeedback } from "./api"
import useColorScheme from "../../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"
import { useSettingsStore } from "../../stores/useSettingsStore"

export type IOwnProps = {
  type: "bug" | "feature"
}

type IProps = NativeStackScreenProps<SettingsStackParamList, "Report">

export default function ReportScreen({ route }: IProps) {
  const { type } = route.params

  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const styles = createStyles(Colors[colorScheme])
  const { state, district } = useSettingsStore()
  const [text, setText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(false)

  async function handleSubmit() {
    setErrorMessage("")
    const { error } = await createFeedback({ type, text, metadata: { state, district } })

    if (error) {
      setErrorMessage("We were unable to submit your feedback, please check your connection and try again")

      return
    }
    setSuccess(true)
    setText("")
  }

  function getTitle() {
    if (type === "bug") {
      return "Report An Issue"
    }
    return "Feature Request"
  }

  function getButtonText() {
    if (type === "bug") {
      return "Send Report"
    }
    return "Send Feature Request"
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.titleOne}>{getTitle()}</Title>
      {success ? (
        <SuccessMessage
          message="Thank you for your feedback!"
          action={() => {
            navigation.goBack()
          }}
        />
      ) : (
        <>
          <TextInput
            style={styles.input}
            multiline={true}
            mode="outlined"
            value={text}
            onChangeText={val => setText(val)}
          />
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Button style={styles.button} mode="contained" disabled={text.length < 5} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{getButtonText()}</Text>
          </Button>
        </>
      )}
    </SafeAreaView>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      paddingRight: 10,
      paddingLeft: 10,
    },
    errorMessage: {
      marginTop: 5,
      height: 30,
      lineHeight: 15,
      color: "red",
    },
    titleOne: {
      paddingBottom: 20,
      fontSize: 30,
    },
    input: {
      height: 200,
    },
    button: {
      marginTop: 10,
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 32,
      color: colors.text,
    },
  })
