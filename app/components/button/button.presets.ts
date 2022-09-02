import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"
import { BOLD } from "../../theme/global-consts"
import { palette } from "../../theme/palette"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}
const BASE_SELECT_VIEW = {
  ...BASE_VIEW,
  width: 50,
  height: 50, // TODO: See google mat design about border radius innder/outer elems
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
}

const LIGHT = { fontWeight: "300" } as TextStyle

const BASE_SELECT_TEXT = {
  color: palette.black,
  paddingHorizontal: spacing[0],
  fontSize: 10,
  letterSpacing: 0,
}
/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.orange } as ViewStyle,

  secondary: {
    ...BASE_VIEW,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: color.palette.deepPurple,
  } as ViewStyle,

  selectItem: {
    ...BASE_SELECT_VIEW,
    width: 50,
    height: 50,
    backgroundColor: color.palette.white,
  } as ViewStyle,

  selectedItem: {
    ...BASE_SELECT_VIEW,
    borderWidth: 2,
    borderColor: color.palette.black,
    backgroundColor: color.palette.deepPurple,
  } as ViewStyle,

  selectItemDisabled: {
    ...BASE_SELECT_VIEW,
    backgroundColor: color.palette.deepPurple,
  } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: { ...BASE_TEXT, fontSize: 9, color: color.palette.white } as TextStyle,
  secondary: { ...BASE_TEXT, ...BOLD, fontSize: 13, letterSpacing: 2 } as TextStyle,
  selectItem: { ...BASE_SELECT_TEXT, ...LIGHT } as TextStyle,
  selectedItem: { ...BASE_SELECT_TEXT, ...BOLD } as TextStyle,
  selectItemDisabled: {
    ...BASE_SELECT_TEXT,
    ...BOLD,
    opacity: 0.6,
  } as TextStyle,
  link: {
    ...BASE_SELECT_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
