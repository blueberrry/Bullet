import * as React from "react"
import { View, ViewStyle, ImageStyle, TextStyle } from "react-native"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing, typography } from "../../theme"

const BULLET_ITEM: ViewStyle = {
  flexDirection: "column",
  marginTop: spacing[4],
  paddingBottom: spacing[4],
  borderBottomWidth: 1,
  borderBottomColor: "#3A3048",
}

const BULLET_TEXT_CONTAINER: ViewStyle = {
  flexDirection: "row",
}

const BULLET_TEXT_CONTAINER_WITH_SIBLING: ViewStyle = {
  ...BULLET_TEXT_CONTAINER,
  paddingBottom: spacing[2],
}

const BULLET_CONTAINER: ViewStyle = {
  marginTop: spacing[1] - 2,
  marginRight: spacing[1],
}
const BULLET: ImageStyle = {
  width: 20,
  height: 20,
}
const BULLET_TEXT: TextStyle = {
  flex: 1,
  fontFamily: typography.primary,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}

export interface BulletItemProps {
  text: string
  children?: React.ReactNode
}

export function BulletItem(props: BulletItemProps) {
  const { text, children } = props
  return (
    <View style={BULLET_ITEM}>
      <View style={!children ? BULLET_TEXT_CONTAINER : BULLET_TEXT_CONTAINER_WITH_SIBLING}>
        <Icon icon="bullet" containerStyle={BULLET_CONTAINER} style={BULLET} />
        <Text style={BULLET_TEXT} text={text} />
      </View>

      {children && <View>{children}</View>}
    </View>
  )
}
