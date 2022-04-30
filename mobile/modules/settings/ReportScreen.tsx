import { Button, Text, TextInput, Title } from "react-native-paper"
import Colors, { IColors } from "../../constants/Colors"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"

import { DismissKeyboard } from "../../components/DismissKeyboard"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"
import { SettingsStackParamList } from "../../navigation/types"
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
    <SafeAreaView>
      <DismissKeyboard>
        <View style={styles.container}>
          {success ? (
            <>
              <Title style={styles.titleOne}>{getTitle()}</Title>
              <SuccessMessage
                message="Thank you for your feedback!"
                action={() => {
                  navigation.goBack()
                }}
              />
            </>
          ) : (
            <>
              <View>
                <Title style={styles.titleOne}>{getTitle()}</Title>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  mode="outlined"
                  value={text}
                  onChangeText={val => setText(val)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <Button style={styles.button} mode="contained" disabled={text.length < 5} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>{getButtonText()}</Text>
                </Button>
              </View>
            </>
          )}
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      paddingRight: 25,
      paddingLeft: 25,
      paddingTop: "15%",
      height: "100%",
      width: "100%",
      flexDirection: "column",
      display: "flex",
      justifyContent: "space-between",
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
    buttonContainer: {
      paddingBottom: "5%",
    },
  })
