import React from "react"

export interface SelectDateMenuModalProps {
  modalVisible: boolean
  setModalVisible: (arg: boolean) => void
  animateModal: boolean
  setAnimateModal: (arg: boolean) => void
  children: React.ReactNode
}
