import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import Colors, { IColors } from "../constants/Colors"
import { UserContext } from "../stores/user/UserProvider"
import { getAddressInfo } from "../stores/user/api"
import { notify } from "../lib/notifications"

import { states } from "../lib/stateHelper"
import { Card, Paragraph, Title } from "react-native-paper"

function isValidStateAbreviation(abv: string) {
  return states.find(s => s.abbreviation === abv) ? true : false
}

export default function AddDistrictScreen() {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]
  const styles = createStyles(Colors[colorScheme])

  const userContext = useContext(UserContext)

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [stateAbv, setStateAbv] = useState("")
  const [district, setDistrict] = useState("")
  const [isStateError, setIsStateError] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const canContinue = !(stateAbv.length > 0 && district.length > 0)
  const canAddressSearch = address.length > 0 && city.length > 0 && state.length > 0

  useEffect(() => {
    if (!canAddressSearch) return
    setIsTimerRunning(true)

    const timer = setTimeout(async () => {
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

    return () => clearTimeout(timer)
  }, [address, city, state])

  useEffect(() => {
    if (isStateError) setIsStateError(false)
  }, [stateAbv])

  async function handleContinue() {
    const isValidState = stateAbv.length > 1 && isValidStateAbreviation(stateAbv)
    if (!isValidState) return setIsStateError(true)
    const userData = { ...userContext.settings, state: stateAbv, district }
    if (userContext.saveSettings) userContext.saveSettings(userData)
  }

  return (
    <SafeAreaView>
      <Card style={styles.container}>
        <Card.Content>
          <View>
            <View>
              <View>
                <Title>Help us find your representatives!</Title>
                <Paragraph>Please enter your address or your state and congressional district</Paragraph>
              </View>
              <View>
                <View>
                  <View>
                    <TextInput value={address} onChangeText={val => setAddress(val)} />
                  </View>
                  <View>
                    <TextInput value={city} onChangeText={val => setCity(val)} />
                  </View>
                  <View>
                    <TextInput value={state} onChangeText={val => setState(val)} />
                  </View>
                </View>
              </View>
            </View>
            {isTimerRunning ? (
              <View>
                <ActivityIndicator />
              </View>
            ) : (
              <>
                <View>
                  <Title>OR</Title>
                </View>
                <View>
                  <View>
                    <TextInput value={stateAbv} onChangeText={val => setStateAbv(val.toUpperCase())} />
                  </View>
                  <View>
                    <TextInput value={district} onChangeText={val => setDistrict(val)} />
                  </View>
                </View>
              </>
            )}
            <View>
              <Button title="continue" disabled={canContinue} onPress={handleContinue}>
                Continue
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
    </SafeAreaView>
  )
}

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      // alignItems: "center",
      // justifyContent: "center",
    },
  })
