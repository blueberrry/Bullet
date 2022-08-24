import { TextStyle, ViewStyle } from "react-native"
import { spacing } from "../../theme"

/**
 * All text will start off looking like this.
 */
export const HORIZONTAL_SCROLL_MENU_STYLES: ViewStyle = { width: "100%", backgroundColor: "sienna" }

export const PREVIEW_CONTAINER_STYLE: ViewStyle = { flex: 1 }

export const RELATIVE_WRAPPER_STYLE: ViewStyle = { position: "relative" }

export const DELETE_BTN_STYLES: ViewStyle = { position: "absolute", zIndex: 5, right: -5 }

export const SCROLL_MENU_ADD_BTN_CONTAINER_STYLES: ViewStyle = {
  flex: 1,
  width: 200,
  height: 300,
  margin: 10,
  padding: spacing[3],
  justifyContent: "center",
  alignItems: "center",
}

export const SCROLL_MENU_BTN_STYLES: ViewStyle = {
  ...SCROLL_MENU_ADD_BTN_CONTAINER_STYLES,
  backgroundColor: "green",
  borderWidth: 2,
  borderColor: "blue",
  borderRadius: 20,
  alignItems: "flex-start",
}

export const PREVIEW_ITEMS_CONTAINER_STYLES: ViewStyle = {
  flex: 1,
  backgroundColor: "pink",
  height: "auto",
  borderWidth: 2,
  borderColor: "red",
  flexDirection: "row",
  flexWrap: "wrap",
}

export const PREVIEW_ITEM_CONTAINER_STYLES: ViewStyle = {
  width: "50%",
  height: "50%",
  padding: spacing[1],
}

export const PREVIEW_ITEM_STYLES: ViewStyle = {
  padding: spacing[1],
  flexDirection: "row",
  backgroundColor: "blue",
  flex: 1,
  justifyContent: "space-around",
}

export const PROGRESS_CONTAINER_STYLES: ViewStyle = {
  marginTop: spacing[2],
  backgroundColor: "red",
  alignItems: "center",
  paddingVertical: spacing[1],
  flex: 1,
}

export const SCROLL_MENU_PROGRESS_STYLES: TextStyle = { fontWeight: "normal", fontSize: 17 }

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  horizontalScrollMenu: HORIZONTAL_SCROLL_MENU_STYLES as ViewStyle,
  scrollMenuBtn: SCROLL_MENU_BTN_STYLES as ViewStyle,
  previewItemsContainer: PREVIEW_ITEMS_CONTAINER_STYLES as ViewStyle,
  previewItemContainer: PREVIEW_ITEM_CONTAINER_STYLES as ViewStyle,
  previewItem: PREVIEW_ITEM_STYLES as ViewStyle,
  progressContainer: PROGRESS_CONTAINER_STYLES as ViewStyle,
}

/**
 * A list of preset names.
 */
// export type ScrollMenuPresetNames = keyof typeof viewPresets
