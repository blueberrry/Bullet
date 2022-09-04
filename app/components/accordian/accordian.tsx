import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native"
import { Text } from "../text/text"

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
          <Text>{title}</Text>
        </View>
      </CollapseHeader>
      <CollapseBody>{children}</CollapseBody>
    </Collapse>
  )
}
