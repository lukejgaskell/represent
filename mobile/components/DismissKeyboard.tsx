import { Keyboard, TouchableWithoutFeedback } from "react-native"
import React, { ReactNode } from "react"

export const DismissKeyboard = ({ children }: { children: ReactNode }) => {
  return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
}
