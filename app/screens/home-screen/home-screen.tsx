import React, { FC } from "react"
import { ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
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
import { useStores } from "../../models"
import { getHighestDate } from "../../utils/getHighestDate"
import moment from "moment"

export const logoIgnite = require("./logo-ignite.png")
export const heart = require("./heart.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
  width: 180,
  height: 100,
}
const LOVE_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const LOVE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}
const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}

const platformCommand = Platform.select({
  ios: "Cmd + D",
  android: "Cmd/Ctrl + M",
})

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "homeScreen">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { bulletEntriesStore, allDaysStore } = useStores()
    const { bulletEntries } = bulletEntriesStore
    const { allDays } = allDaysStore

    // TODO: Once backend completed we should fetch on mount similar to this
    // useEffect(() => {
    //   function fetchTempInitialData() {
    //     allDaysStore.getInitialAllDaysForTesting()
    //     bulletEntriesStore.getInitialBulletEntriesForTesting()
    //   }

    //   fetchTempInitialData()
    // }, [])

    const fetchTempInitialData = () => {
      allDaysStore.getInitialAllDaysForTesting()
      bulletEntriesStore.getInitialBulletEntriesForTesting()
    }

    const navigateToDay = (id) => {
      navigation.navigate("dailyList", { id })
    }

    // TODO: Migrate days entries to backlog if date is older than today
    //       or it could be greyed out with user prompt to migrate days manually/migrate all to backlog/monthly
    //       any dates older than yesterday should auto migrate to backlog/monthlies

    // TODO: Data is not persisting in async storage - looks like it's overwritten when we fetch the dummy data

    // TODO: Add day btn should open menu with + day or + date

    // TODO: Sould this be an action in store?
    const addNextDay = () => {
      let nextDate // TODO: type string YYYYMMDD
      // If there is daily data, increment the next day date and add to array
      if (allDays.length > 0) {
        // Gets highest date and sets the nextDate as the subsequent day
        const highestDateString = getHighestDate(allDays)
        nextDate = moment(highestDateString).add(1, "days").format("YYYYMMDD")
      } else {
        // If there is no daily data, add today as date
        nextDate = moment().format("YYYYMMDD")
      }

      const newDaysData = [
        ...allDays,
        {
          id: uuidv4(),
          date: nextDate, // increment after highest date in allDays
          dailyEntries: [
            // {
            //   entryId: "d3946066-b08a-4e02-b2e0-56ec737cbbf4", // currently no items with these ids in allBulletEntries
            //   dayPriorityRanking: null,
            //   migrated: false,
            // },
          ],
        },
      ]
      allDaysStore.saveAllDays(newDaysData)
    }

    const addSpecificDay = (newDay) => {
      const newDaysData = [
        ...allDays,
        {
          id: uuidv4(),
          date: newDay,
          dailyEntries: [
            // {
            //   entryId: "d3946066-b08a-4e02-b2e0-56ec737cbbf4", // currently no items with these ids in allBulletEntries
            //   dayPriorityRanking: null,
            //   migrated: false,
            // },
          ],
        },
      ]
      allDaysStore.saveAllDays(newDaysData)
    }

    const removeSpecificDay = (date) => {
      const newDaysData = allDays.filter((day) => day.date !== date)
      allDaysStore.saveAllDays(newDaysData)
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
        <GradientBackground colors={["#422443", "#281b34"]} />
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
                entries={[...allDays]}
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
              entries={[...allDays]}
              allBulletEntries={bulletEntries}
              navigateToScreen={navigateToDay}
              addDate={addNextDay}
              removeDate={removeSpecificDay}
            />
            <Button text="Get/reset initial testing state" onPress={fetchTempInitialData} />
            <Button text="Add next day" onPress={addNextDay} /> */}
          </View>
          <View>
            <Button
              style={DEMO}
              textStyle={DEMO_TEXT}
              tx="demoScreen.reactotron"
              onPress={demoReactotron}
            />
            <Text style={HINT} tx={`demoScreen.${Platform.OS}ReactotronHint` as const} />
          </View>
          <Button
            style={DEMO}
            textStyle={DEMO_TEXT}
            tx="demoScreen.demoList"
            onPress={() => navigation.navigate("demoList")}
          />
          <Button
            style={DEMO}
            textStyle={DEMO_TEXT}
            text="Demo all items"
            onPress={() => navigation.navigate("bulletBacklog")}
          />
          <Button
            style={DEMO}
            textStyle={DEMO_TEXT}
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
