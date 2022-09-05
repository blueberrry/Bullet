import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native"
import { AppText } from "../app-text/app-text"

// TODO Style resets/overrides
interface AccordianProps {
  title: string
  headerStyle?: ViewStyle
  headerTextStyle?: TextStyle
  bodyContainerStyle?: ViewStyle
  isExpanded?: boolean
  children: React.ReactNode
}

export function Accordian(props: AccordianProps) {
  const { title, isExpanded = true, children } = props
  return (
    <Collapse isExpanded={isExpanded}>
      <CollapseHeader>
        <View>
          <AppText>{title}</AppText>
        </View>
      </CollapseHeader>
      <CollapseBody>{children}</CollapseBody>
    </Collapse>
  )
}
