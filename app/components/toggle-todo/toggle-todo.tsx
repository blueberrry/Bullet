import { observer } from "mobx-react-lite"
import React from "react"
import { TouchableOpacity } from "react-native"
import { AppText } from "../app-text/app-text"

interface ToggleTodoProps {
  isDone: boolean
  onPress: () => void
}
export const ToggleTodo = (props: ToggleTodoProps) => {
  const { isDone = false, onPress } = props
  return (
    <TouchableOpacity onPress={onPress}>
      {!isDone ? <AppText>☑️</AppText> : <AppText>✅</AppText>}
    </TouchableOpacity>
  )
}
