/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppText, FormRow } from "../"
import { color } from "../../theme/color"
import { ViewStyle } from "react-native"

declare let module

const TEXT_STYLE_OVERRIDE = {
  color: color.storybookTextColor,
}
const arrayStyle: ViewStyle[] = [{ borderWidth: 5 }, { borderColor: "#32cd32" }]

storiesOf("FormRow", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Assembled", () => (
    <Story>
      <UseCase
        text="Fully Assembled"
        usage="FormRow has many parts designed to fit together.  Here is what it looks like all assembled."
      >
        <FormRow preset="top">
          <AppText preset="fieldLabel" style={TEXT_STYLE_OVERRIDE}>
            Hello! I am at the top
          </AppText>
        </FormRow>
        <FormRow preset="middle">
          <AppText style={TEXT_STYLE_OVERRIDE}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi officia quo rerum
            impedit asperiores hic ex quae, quam dolores vel odit doloribus, tempore atque deserunt
            possimus incidunt, obcaecati numquam officiis.
          </AppText>
        </FormRow>
        <FormRow preset="middle">
          <AppText preset="secondary" style={TEXT_STYLE_OVERRIDE}>
            ...one more thing
          </AppText>
        </FormRow>
        <FormRow preset="bottom">
          <AppText style={TEXT_STYLE_OVERRIDE}>🎉 Footers!</AppText>
        </FormRow>
      </UseCase>
      <UseCase text="Alternatives" usage="Less commonly used presets.">
        <FormRow preset="clear">
          <AppText style={TEXT_STYLE_OVERRIDE}>
            My borders are still there, but they are clear. This causes the text to still align
            properly due to the box model of flexbox.
          </AppText>
        </FormRow>
        <FormRow preset="soloRound">
          <AppText style={TEXT_STYLE_OVERRIDE}>I'm round</AppText>
        </FormRow>
        <FormRow preset="soloStraight" style={{ marginTop: 10, backgroundColor: "#ffe" }}>
          <AppText style={TEXT_STYLE_OVERRIDE}>I'm square and have a custom style.</AppText>
        </FormRow>
      </UseCase>
    </Story>
  ))
  .add("Presets", () => (
    <Story>
      <UseCase text="top" usage="The top of a form.">
        <FormRow preset="top">
          <AppText style={TEXT_STYLE_OVERRIDE}>Curved borders at the top.</AppText>
          <AppText style={TEXT_STYLE_OVERRIDE}>Nothing below</AppText>
        </FormRow>
      </UseCase>
      <UseCase text="middle" usage="A row in the middle of a form.">
        <FormRow preset="middle">
          <AppText style={TEXT_STYLE_OVERRIDE}>No curves and empty at the bottom.</AppText>
        </FormRow>
      </UseCase>
      <UseCase text="bottom" usage="The bottom of a form.">
        <FormRow preset="bottom">
          <AppText style={TEXT_STYLE_OVERRIDE}>Curved at the bottom</AppText>
          <AppText style={TEXT_STYLE_OVERRIDE}>Line at the top.</AppText>
        </FormRow>
      </UseCase>
      <UseCase text="soloRound" usage="A standalone curved form row.">
        <FormRow preset="soloRound">
          <AppText style={TEXT_STYLE_OVERRIDE}>Curves all around.</AppText>
        </FormRow>
      </UseCase>
      <UseCase text="soloStraight" usage="A standalone straight form row.">
        <FormRow preset="soloStraight">
          <AppText style={TEXT_STYLE_OVERRIDE}>Curves nowhere.</AppText>
        </FormRow>
      </UseCase>
      <UseCase text="clear" usage="Identical dimensions but transparent edges.">
        <FormRow preset="clear">
          <AppText style={TEXT_STYLE_OVERRIDE}>Curves nowhere.</AppText>
        </FormRow>
      </UseCase>
    </Story>
  ))
  .add("Styling", () => (
    <Story>
      <UseCase text="Style array" usage="Form row with an array of styles">
        <FormRow preset="soloStraight" style={arrayStyle}>
          <AppText style={TEXT_STYLE_OVERRIDE}>Array style.</AppText>
        </FormRow>
      </UseCase>
    </Story>
  ))
