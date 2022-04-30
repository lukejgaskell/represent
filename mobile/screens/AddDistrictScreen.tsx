import { Button, Paragraph, Text, TextInput, Title } from "react-native-paper"
import Colors, { IColors } from "../constants/Colors"
import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"

import { getAddressInfo } from "../apis/getDistrict"
import { states } from "../lib/stateHelper"
import { style } from "styled-system"
import useColorScheme from "../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"
import { useSettingsStore } from "../stores/useSettingsStore"

function isValidStateAbreviation(abv: string) {
  return states.find(s => s.abbreviation === abv) ? true : false
}

function isValidDistrict(district: string) {
  return district.length > 0 && !isNaN(+district)
}

let timer: any = null

export default function AddDistrictScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const styles = createStyles(Colors[colorScheme])

  const { saveSettings } = useSettingsStore()

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [stateAbv, setStateAbv] = useState("")
  const [district, setDistrict] = useState("")
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isShowingDistrict, setIsShowingDistrict] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const canContinue = isValidDistrict(district) && isValidStateAbreviation(stateAbv)
  const canAddressSearch = address.length > 0 && city.length > 0 && state.length > 0

  useEffect(() => {
    setIsTimerRunning(false)
    clearTimeout(timer)
    if (!canAddressSearch) return
    setIsTimerRunning(true)

    timer = setTimeout(async () => {
      try {
        const res = await getAddressInfo(`${address}, ${city} ${state}`)
        if (res.district === null || res.district === undefined) {
          setErrorMessage(
            "We were unable to determine your district from your address, please fix your address or type your district manually."
          )
        } else {
          setDistrict(res.district?.toString())
          setStateAbv(res.state?.toString())
        }
      } catch (e) {
        setErrorMessage("We had a issue determining your district please try again later or type it in manually.")
      }

      setIsTimerRunning(false)
    }, 2000)
  }, [address, city, state])

  function handleContinue() {
    const userData = { state: stateAbv, district }
    if (saveSettings) saveSettings(userData)
    if (navigation.canGoBack()) navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <View>
            <Title style={styles.title}>Help us find your representatives!</Title>
            <Paragraph style={styles.description}>
              Please enter your address or your state and congressional district
            </Paragraph>
          </View>
          <View>
            {!isShowingDistrict && (
              <View>
                <View>
                  <TextInput mode="outlined" label="Address" value={address} onChangeText={val => setAddress(val)} />
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <TextInput mode="outlined" label="City" value={city} onChangeText={val => setCity(val)} />
                  </View>
                  <View style={styles.column}>
                    <TextInput mode="outlined" label="State" value={state} onChangeText={val => setState(val)} />
                  </View>
                </View>
              </View>
            )}
            {isShowingDistrict && (
              <View>
                <View>
                  <TextInput
                    mode="outlined"
                    label="State Abbreviation"
                    value={stateAbv}
                    error={stateAbv.length > 0 && !isValidStateAbreviation(stateAbv)}
                    onChangeText={val => setStateAbv(val.toUpperCase())}
                  />
                </View>
                <View>
                  <TextInput
                    mode="outlined"
                    label="Congressional District"
                    value={district}
                    error={district.length > 0 && !isValidDistrict(district)}
                    onChangeText={val => setDistrict(val)}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Button mode="outlined" style={styles.switchButton} onPress={() => setIsShowingDistrict(!isShowingDistrict)}>
            <Text style={styles.buttonText}>
              {isShowingDistrict ? "Enter Address Instead" : "Enter District Instead"}
            </Text>
          </Button>
          <Button
            mode="contained"
            style={styles.continueButton}
            disabled={!canContinue || isTimerRunning}
            loading={isTimerRunning}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Button>
        </View>
      </View>
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
      marginTop: 10,
      color: "red",
      lineHeight: 15,
      height: 45,
    },
    title: {
      fontSize: 24,
    },
    description: {
      paddingTop: 10,
      fontSize: 15,
      paddingBottom: 10,
    },
    switchButton: { marginTop: 20 },
    buttonText: { lineHeight: 40 },
    continueButton: {
      marginTop: 20,
    },
    row: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    column: {
      width: "49%",
    },
    spinner: {},
    buttonContainer: { paddingBottom: "5%" },
  })
