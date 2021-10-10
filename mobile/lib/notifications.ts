import Toast from "react-native-toast-message"

export function notify(message: string, type: "success" | "info" | "error" = "info") {
  Toast.show({
    type,
    position: "top",
    text1: message,
    visibilityTime: 2000,
    topOffset: 80,
  })
}
