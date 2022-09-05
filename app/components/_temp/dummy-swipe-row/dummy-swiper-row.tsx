import React from "react"
import { View } from "react-native"
/**
 * @deprecated - Frig new row for now to work with regular flatlist, convert to swipeable when logic complete
 **/

export const DummySwipeBtnRow = ({
  LHSActions = [() => <></>],
  RHSActions = [() => <></>],
}: {
  LHSActions: any
  RHSActions: any
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View>{LHSActions}</View>
      <View style={{ width: "40%", backgroundColor: "black" }}></View>
      <View style={{ flexDirection: "row" }}>{RHSActions}</View>
    </View>
  )
}
