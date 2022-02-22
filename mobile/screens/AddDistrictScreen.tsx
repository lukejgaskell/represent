import { ActivityIndicator, Button, Paragraph, TextInput, Title } from "react-native-paper"
import Colors, { IColors } from "../constants/Colors"
import React, { useContext, useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"

import { UserContext } from "../stores/user/UserProvider"
import { getAddressInfo } from "../stores/user/api"
import { notify } from "../lib/notifications"
import { states } from "../lib/stateHelper"
import useColorScheme from "../hooks/useColorScheme"
import { useNavigation } from "@react-navigation/native"

function isValidStateAbreviation(abv: string) {
  return states.find(s => s.abbreviation === abv) ? true : false
}
let timer: any = null

export default function AddDistrictScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const styles = createStyles(Colors[colorScheme])

  const userContext = useContext(UserContext)

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [stateAbv, setStateAbv] = useState("")
  const [district, setDistrict] = useState("")
  const [isStateError, setIsStateError] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isShowingDistrict, setIsShowingDistrict] = useState(false)

  const canContinue = stateAbv.length > 0 && district.length > 0
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
          notify("We were unable to determine your district from your address, please fix your address or type your district manually.", "error")
        } else {
          setDistrict(res.district?.toString())
          setStateAbv(res.state?.toString())
        }
      } catch (e) {
        notify("We had a issue determining your district please try again later or type it in manually.", "error")
      }

      setIsTimerRunning(false)
    }, 3000)
  }, [address, city, state])

  useEffect(() => {
    if (isStateError) setIsStateError(false)
  }, [stateAbv])

  async function handleContinue() {
    const isValidState = stateAbv.length > 1 && isValidStateAbreviation(stateAbv)
    if (!isValidState) return setIsStateError(true)
    const userData = { ...userContext.settings, state: stateAbv, district }
    if (userContext.saveSettings) userContext.saveSettings(userData)
    if (navigation.canGoBack()) navigation.goBack()
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <View>
            <View>
              <Title style={styles.title}>Help us find your representatives!</Title>
              <Paragraph style={styles.description}>Please enter your address or your state and congressional district</Paragraph>
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
                    <TextInput mode="outlined" label="State Abbreviation" value={stateAbv} onChangeText={val => setStateAbv(val.toUpperCase())} />
                  </View>
                  <View>
                    <TextInput mode="outlined" label="Congressional District" value={district} onChangeText={val => setDistrict(val)} />
                  </View>
                </View>
              )}
            </View>
          </View>
          <View>
            <Button mode="text" style={styles.switchButton} onPress={() => setIsShowingDistrict(!isShowingDistrict)}>
              {isShowingDistrict ? "Enter Address Instead" : "Enter District Instead"}
            </Button>
            <Button mode="contained" style={styles.button} disabled={!canContinue || isTimerRunning} loading={isTimerRunning} onPress={handleContinue}>
              Continue
            </Button>
          </View>
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
      top: 40,
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
    button: {
      marginTop: 50,
      paddingTop: 10,
      paddingBottom: 10,
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
  })
