import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context"
import SwipeUpDownModal from "react-native-swipe-modal-up-down"
import { spacing } from "../../theme"
import { SelectDateMenuModalProps } from "./select-date-menu-modal.props"

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

export const AddDateMenu = (props: SelectDateMenuModalProps) => {
  const { modalVisible, setModalVisible, animateModal, setAnimateModal, children } = props
  const [modalContentHeight, setModalContentHeight] = useState(0)

  const { height } = useSafeAreaFrame()

  return (
    <SafeAreaView>
      <SwipeUpDownModal
        modalVisible={modalVisible}
        PressToanimate={animateModal}
        ContentModalStyle={{ MODAL_CONTAINER_STYLES, marginTop: modalContentHeight }}
        ContentModal={
          <View
            style={MODAL_CONTENT_CONTAINER_STYLES}
            onLayout={(e) => {
              setModalContentHeight(height - e.nativeEvent.layout.height)
            }}
          >
            {children}
          </View>
        }
        HeaderStyle={HEADER_CONTENT_STYLES}
        HeaderContent={
          <View>
            <TouchableOpacity
              style={{ ...BACKGROUND_OVERLAY_BTN_STYLES, height: modalContentHeight }}
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
