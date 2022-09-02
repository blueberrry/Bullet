import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context"
import SwipeUpDownModal from "react-native-swipe-modal-up-down"
import { Text } from "../../components/text/text"
import { spacing } from "../../theme"
import { GestureModalProps } from "./gesture-modal.props"

const MODAL_CONTAINER_STYLES = {
  marginTop: 300, // Default
  borderColor: "red",
  borderWidth: 2,
}

const MODAL_CONTENT_CONTAINER_STYLES = { backgroundColor: "#005252", padding: spacing[1] }

const HEADER_CONTENT_STYLES = { marginTop: 0 }

const BACKGROUND_OVERLAY_BTN_STYLES = {
  flex: 1,
  height: 300, // default
  width: "100%",
}

export const GestureModal = (props: GestureModalProps) => {
  const {
    modalVisible,
    setModalVisible,
    animateModal,
    setAnimateModal,
    fillViewport = false,
    title,
    children,
  } = props
  const [modalContentHeight, setModalContentHeight] = useState(0)

  const { height } = useSafeAreaFrame()

  const MODAL_CONTAINER_MARGIN_TOP = { marginTop: !fillViewport ? modalContentHeight : 0 }
  const MODAL_CONTENT_CONTAINER_HEIGHT = { height: !fillViewport ? "auto" : "100%" }

  const BACKGROUND_OVERLAY_BTN_FLEX = { flex: !fillViewport ? 1 : 0 }
  const BACKGROUND_OVERLAY_BTN_HEIGHT = { height: !fillViewport ? "auto" : 0 }

  return (
    <SafeAreaView>
      <SwipeUpDownModal
        modalVisible={modalVisible}
        PressToanimate={animateModal}
        ContentModalStyle={{ ...MODAL_CONTAINER_STYLES, ...MODAL_CONTAINER_MARGIN_TOP }}
        ContentModal={
          <View
            // pointerEvents="none"
            onStartShouldSetResponder={() => true} // View responds to start of touch
            style={{
              ...MODAL_CONTENT_CONTAINER_STYLES,
              ...MODAL_CONTENT_CONTAINER_HEIGHT,
            }}
            onLayout={(e) => {
              !fillViewport && setModalContentHeight(height - e.nativeEvent.layout.height)
            }}
          >
            {title && <Text>{title}</Text>}
            {children}
          </View>
        }
        HeaderStyle={HEADER_CONTENT_STYLES}
        HeaderContent={
          <View>
            <TouchableOpacity
              style={{
                ...BACKGROUND_OVERLAY_BTN_STYLES,
                ...BACKGROUND_OVERLAY_BTN_FLEX,
                ...BACKGROUND_OVERLAY_BTN_HEIGHT,
              }}
              onPress={() => {
                // setModalVisible(false)
                setAnimateModal(true)
              }}
            />
          </View>
        }
        onClose={() => {
          setModalVisible(false)
          setAnimateModal(false)
        }}
      />
    </SafeAreaView>
  )
}
