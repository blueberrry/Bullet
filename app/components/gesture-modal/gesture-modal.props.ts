import React from "react"

export interface GestureModalProps {
  modalVisible: boolean
  setModalVisible: (arg: boolean) => void
  animateModal: boolean
  setAnimateModal: (arg: boolean) => void
  fillViewport?: boolean
  title?: string
  children: React.ReactNode
}
