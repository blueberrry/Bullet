/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from "react"
import { View, ViewStyle } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AppText } from "./app-text"

declare let module

const VIEWSTYLE = {
  flex: 1,
  backgroundColor: color.storybookDarkBg,
}
const viewStyleArray: ViewStyle[] = [VIEWSTYLE, { backgroundColor: "#7fff00" }]

storiesOf("AppText", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="default" usage="Used for normal body text.">
        <View style={VIEWSTYLE}>
          <AppText>Hello!</AppText>
          <AppText style={{ paddingTop: 10 }}>
            Check out{"\n"}
            my{"\n"}
            line height
          </AppText>
          <AppText style={{ paddingTop: 10 }}>
            The quick brown fox jumped over the slow lazy dog.
          </AppText>
          <AppText>$123,456,789.00</AppText>
        </View>
      </UseCase>
      <UseCase text="bold" usage="Used for bolded body text.">
        <View style={VIEWSTYLE}>
          <AppText preset="bold">Osnap! I'm puffy.</AppText>
        </View>
      </UseCase>
      <UseCase text="header" usage="Used for major section headers.">
        <View style={VIEWSTYLE}>
          <AppText preset="header">Behold!</AppText>
        </View>
      </UseCase>
    </Story>
  ))
  .add("Passing Content", () => (
    <Story>
      <UseCase
        text="text"
        usage="Used when you want to pass a value but don't want to open a child."
      >
        <View style={VIEWSTYLE}>
          <AppText text="Heyo!" />
        </View>
      </UseCase>
      <UseCase text="tx" usage="Used for looking up i18n keys.">
        <View style={VIEWSTYLE}>
          <AppText tx="common.ok" />
          <AppText tx="common.cancel" />
        </View>
      </UseCase>
      <UseCase
        text="children"
        usage="Used like you would normally use a React Native <Text> component."
      >
        <View style={VIEWSTYLE}>
          <AppText>Passing strings as children.</AppText>
        </View>
      </UseCase>
      <UseCase text="nested children" usage="You can embed them and change styles too.">
        <View style={VIEWSTYLE}>
          <AppText>
            {" "}
            Hello <AppText preset="bold">bolded</AppText> World.
          </AppText>
        </View>
      </UseCase>
    </Story>
  ))
  .add("Styling", () => (
    <Story>
      <UseCase text="Style array" usage="Text with style array">
        <View style={viewStyleArray}>
          <AppText>
            {" "}
            Hello <AppText preset="bold">bolded</AppText> World.
          </AppText>
        </View>
      </UseCase>
    </Story>
  ))
