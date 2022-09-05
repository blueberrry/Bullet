import React from "react"
import { TouchableOpacity } from "react-native"
import { AppText } from "../app-text/app-text"

export const ToggleTodo = ({ isDone = false, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {!isDone ? <AppText>☑️</AppText> : <AppText>✅</AppText>}
    </TouchableOpacity>
  )
}
