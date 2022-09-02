import React, { FC } from "react"
import { View } from "react-native"
import { color, spacing } from "../../theme"
import { palette } from "../../theme/palette"

interface FooterProps {
  children: React.ReactNode
}

const FOOTER_CONTAINER_STYLES = {
  marginTop: "auto",
  padding: spacing[1],
  backgroundColor: palette.black,
}

export const Footer: FC<FooterProps> = ({ children }) => {
  /**
   * * Component always fixed to bottom of entire viewport, no matter where it's rendered? Or enforce position in screen tree?
   * * Or should there be a bespoke component that renders the add bullet modal, it will be used in daily/weeklies/monthlies/backlog
   * * Or should it alwa
   */
  return <View style={FOOTER_CONTAINER_STYLES}>{children}</View>
}
