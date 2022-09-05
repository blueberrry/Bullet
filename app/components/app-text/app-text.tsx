import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./app-text.presets"
import { AppTextProps } from "./app-text.props"
import { translate } from "../../i18n"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function AppText(props: AppTextProps) {
  // grab the props
  const { preset = "default", tx, txOptions, text, children, style: styleOverride, ...rest } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const style = presets[preset] || presets.default
  const styles = [style, styleOverride]

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}
