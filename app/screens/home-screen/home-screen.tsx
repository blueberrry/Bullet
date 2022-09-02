import React, { FC } from "react"
import { ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import moment from "moment"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import {
  BulletItem,
  Button,
  Header,
  Text,
  Screen,
  AutoImage as Image,
  GradientBackground,
} from "../../components"
import { ScrollMenu } from "../../components/scroll-menu/scroll-menu"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"
import { getLatestDate } from "../../utils/date-formatting"
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

export const logoIgnite = require("./logo-ignite.png")
export const heart = require("./heart.png")

// TODO: Migrate days entries to backlog if date is older than today
// TODO: Move styles to presets component

// TODO: Data is not persisting in async storage - looks like it's overwritten when we fetch the dummy data

// TODO: Sould this logic be in the `addNextDay` action?

// TODO: Some of these views/texts with styles could be extracted to reusable components, eg Header

const platformCommand = Platform.select({
  ios: "Cmd + D",
  android: "Cmd/Ctrl + M",
})

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "homeScreen">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { bulletEntriesStore, daysStore } = useStores()
    const { bulletEntries } = bulletEntriesStore
    const { days } = daysStore

    // TODO: Once backend completed we should fetch on mount similar to this

    const fetchTempInitialData = () => {
      daysStore.getDaysTest()
      bulletEntriesStore.getInitialBulletEntriesForTesting()
    }

    const navigateToDay = (id) => {
      navigation.navigate("dailyList", { id })
    }

    //       or it could be greyed out with user prompt to migrate days manually/migrate all to backlog/monthly
    //       any dates older than yesterday should auto migrate to backlog/monthlies

    const addNextDay = () => {
      let nextDate // TODO: type for string YYYYMMDD
      // If there is daily data, increment the next day date and add to array
      if (days.length > 0) {
        // Gets highest date and sets the nextDate as the subsequent day
        const highestDateString = getLatestDate(days)
        nextDate = moment(highestDateString).add(1, "days").format("YYYYMMDD")
      } else {
        // If there is no daily data, add today as date
        nextDate = moment().format("YYYYMMDD")
      }
      daysStore.addNextDay(nextDate)
    }

    const addSpecificDay = (newDate) => {
      // daysStore.addSpecificDay(newDate)
    }

    const removeSpecificDay = (date) => {
      const newDaysData = days.filter((day) => day.date !== date)
      daysStore.saveDays(newDaysData)
    }

    const demoReactotron = React.useMemo(
      () => async () => {
        console.tron.log("Your Friendly tron log message")
        console.tron.logImportant("I am important")
        console.tron.display({
          name: "DISPLAY",
          value: {
            numbers: 1,
            strings: "strings",
            booleans: true,
            arrays: [1, 2, 3],
            objects: {
              deeper: {
                deeper: {
                  yay: "👾",
                },
              },
            },
            functionNames: function hello() {
              /* dummy function */
            },
          },
          preview: "More control with display()",
          important: true,
          image: {
            uri: "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
          },
        })
        // make an API call for the demo
        // Don't do API like this, use store's API
        const demo = new Api()
        demo.setup()
        demo.getUser("1")
        // Let's do some async storage stuff
        await save("Cool Name", "Boaty McBoatface")
      },
      [],
    )

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
          <Text style={TITLE} preset="header" tx="demoScreen.title" />
          <Text style={TAGLINE} tx="demoScreen.tagLine" />
          <BulletItem text="Integrated here, Navigation with State, TypeScript, Storybook, and i18n." />
          <BulletItem
            text={`To run Storybook, press ${platformCommand} or shake the device to show the developer menu, then select "Toggle Storybook"`}
          />
          <BulletItem text="Load up Reactotron! You can inspect your app, view the events, interact, and so much more!" />
          <View>
            <BulletItem text="Daily Entries">
              <ScrollMenu
                entries={[...days]}
                allBulletEntries={bulletEntries}
                navigateToScreen={navigateToDay}
                addNextDay={addNextDay}
                addSpecificDay={addSpecificDay}
                removeDate={removeSpecificDay}
              />
              <Button text="Get/reset initial testing state" onPress={fetchTempInitialData} />
            </BulletItem>
          </View>
          <View>
            <Text>Weeklies</Text>
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
            <Button preset="secondary" tx="demoScreen.reactotron" onPress={demoReactotron} />
            <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} />
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
            <Text style={LOVE} text="Made with" />
            <Image source={heart} style={HEART} />
            <Text style={LOVE} text="by Infinite Red" />
          </View>
        </Screen>
      </View>
    )
  },
)
