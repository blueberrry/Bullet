import React, { FC } from "react"
import { ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { applySnapshot, onSnapshot, getSnapshot, clone } from "mobx-state-tree"
import { observer } from "mobx-react-lite"

import {
  BulletItem,
  Button,
  Header,
  AppText,
  Screen,
  AutoImage as Image,
  GradientBackground,
} from "../../components"
import { ScrollMenu } from "../../components/scroll-menu/scroll-menu"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import {
  CONTAINER,
  HEADER,
  HEADER_TITLE,
  HEART,
  HINT,
  IGNITE,
  LOVE,
  LOVE_WRAPPER,
  TAGLINE,
  TITLE,
} from "./home-screen.presets"
import { FULL } from "../../theme/global-consts"
import { YYYYMMDD } from "../../types/types"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"

export const logoIgnite = require("./logo-ignite.png")
export const heart = require("./heart.png")

// TODO: Migrate days entries to backlog if date is older than today
// TODO: Move styles to presets component

// TODO: Make sure data persists in production

// !important ScrollMenu does not rerender when we update, could apply snapshot/getsnapshot be needed

// TODO: Remove observers from relevant dumb components

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "homeScreen">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const [rerender, setRerender] = React.useState(false)

    // TODO: Why am I having to force a rerender here? Mob X should return new values from the hooks
    const { bulletEntriesStore, daysStore } = useStores(rerender)
    const { bulletEntries } = bulletEntriesStore
    const { days } = daysStore

    // !important this does not look correct, mst should be taking care of rerendering when bulletEntries changes
    // TODO: Investigate, rerendering the whole context is probably expensive
    // useFocusEffect(React.useCallback(() => setRerender((prev) => !prev), []))

    // TODO: Once backend completed we should fetch on mount similar to this - use generator mobx function
    const fetchTempInitialData = () => {
      daysStore.getDays()
      bulletEntriesStore.getBulletEntries()
    }

    const navigateToDay = (id) => {
      navigation.navigate("dailyList", { id })
    }

    // !important - hack!
    // TODO: fix
    useFocusEffect(React.useCallback(() => setRerender((prev) => !prev), []))

    return (
      <View testID="DemoScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#000000"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="demoScreen.howTo"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <AppText style={TITLE} preset="header" tx="demoScreen.title" />
          <AppText style={TAGLINE} tx="demoScreen.tagLine" />
          <BulletItem text="Daily Entries">
            <ScrollMenu
              days={days}
              datesArray={daysStore.datesArray}
              navigateToScreen={navigateToDay}
              addNextDay={daysStore.addNextDay}
              addSpecificDay={(date: YYYYMMDD) => daysStore.addSpecificDate(date)}
              removeDate={(item) => daysStore.removeDay(item)}
              // extraData={bulletEntries}
            />
            <Button text="Get/reset initial testing state" onPress={fetchTempInitialData} />
          </BulletItem>
          <View>
            <AppText>Weeklies</AppText>
            {/* <ScrollMenu
              entries={[...weeks]}
              allBulletEntries={bulletEntries}
              navigateToScreen={navigateToDay}
              addDate={addNextDay}
              removeDate={removeSpecificDay}
            />
            <Button text="Get/reset initial testing state" onPress={fetchTempInitialData} />
            <Button text="Add next day" onPress={addNextDay} /> */}
          </View>
          <View>
            <AppText style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} />
          </View>
          <Button
            preset="secondary"
            tx="demoScreen.demoList"
            onPress={() => navigation.navigate("demoList")}
          />
          <Button
            preset="secondary"
            text="All Entries"
            onPress={() => navigation.navigate("allEntries")}
          />
          <Button
            preset="secondary"
            text="Backlog"
            onPress={() => navigation.navigate("bulletBacklog")}
          />
          <Button
            preset="secondary"
            text="Daily list"
            onPress={() => navigation.navigate("dailyList")}
          />
          <Image source={logoIgnite} style={IGNITE} />
          <View style={LOVE_WRAPPER}>
            <AppText style={LOVE} text="Made with" />
            <Image source={heart} style={HEART} />
            <AppText style={LOVE} text="by Infinite Red" />
          </View>
        </Screen>
      </View>
    )
  },
)
