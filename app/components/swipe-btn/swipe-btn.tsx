import React from "react"
import { View } from "react-native"
import { Button } from "../button/button"

/**
 * * Buttons are revealed when we swipe row left or right
 **/

interface SwipeBtnProps {
  text: string
  onPress: () => void
}

const SWIPE_BTN_STYLES = {
  // flex: 1,
}

export const SwipeBtn = (props: SwipeBtnProps) => {
  const { text, onPress } = props
  // different bg color depending on action
  return (
    <View style={SWIPE_BTN_STYLES}>
      <Button onPress={onPress} text={text} />
    </View>
  )
}
