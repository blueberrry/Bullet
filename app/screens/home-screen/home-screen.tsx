import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import moment from "moment"
import React, { CSSProperties, FC, useEffect, useState } from "react"
import { ScrollView, TouchableOpacity, FlatList, View } from "react-native"
import ProgressCircle from "react-native-progress-circle"
import CircularProgress from "react-native-circular-progress-indicator"
import { useStores } from "../../models"
import { DailyEntries, Day } from "../../models/all-days-day/all-days-day"
import { BulletEntriesStore } from "../../models/bullet-entries-store/bullet-entries-store"
import { NavigatorParamList } from "../../navigators/app-navigator"
import { Text } from "../../components/text/text"
import { spacing } from "../../theme/spacing"
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"

interface ScrollMenuPreviewProps {
  children?: React.ReactNode
  completed?: number
  total?: number
}

const ScrollMenuProgress = (props: ScrollMenuPreviewProps) => {
  const { children, completed = 1, total = 1 } = props
  return (
    <CircularProgress
      value={completed}
      radius={50}
      duration={2000}
      progressValueColor={"#ecf0f1"}
      maxValue={total}
      title={`${completed}/${total} ✅`}
      showProgressValue={false}
      titleColor={"white"}
      titleStyle={{ fontWeight: "normal", fontSize: 17 }}
    />
  )
}

const PROGRESS_CONTAINER_STYLES = {
  marginTop: spacing[2],
  backgroundColor: "red",
  // flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing[1],
  flex: 1,
}

const OTHER_PREVIEW_ITEMS_CONTAINER_STYLES = {
  flex: 1,
  backgroundColor: "pink",
  height: "auto",
  borderWidth: 2,
  borderColor: "red",
  flexDirection: "row",
  flexWrap: "wrap",
}

const PREVIEW_ITEM_CONTAINER_STYLES = {
  width: "50%",
  height: "50%",
  // borderWidth: 2,
  // borderColor: "red",
  // margin: spacing[1],
  padding: spacing[1],
  // backgroundColor: "blue",
}

const PREVIEW_ITEM_STYLES = {
  padding: spacing[1],
  flexDirection: "row",
  backgroundColor: "blue",
  flex: 1,
  justifyContent: "space-around",
}

const useGetEntriesByMigrated = (entries) => {
  const entriesNotMigrated = entries.filter((entry) => entry.migrated === false)
  const entriesMigrated = entries.filter((entry) => entry.migrated === true)
  const entriesMigratedTotal = entriesMigrated.length

  return {
    entriesNotMigrated,
    entriesMigrated,
    entriesMigratedTotal,
  }
}

const useGetEntriesByStatus = (entries) => {
  // TODO: Union type
  // TODO: Should this all be in a useEffect ?
  const todos = entries.filter((entry) => entry.status === "todo")
  const todosTotal = todos.length

  const completed = entries.filter((entry) => entry.status === "completed")
  const completedTotal = completed.length

  const allTodosTotal = todosTotal + completedTotal

  const percentageTodosCompleted = (completedTotal / allTodosTotal) * 100

  const notes = entries.filter((entry) => entry.status === "notes")
  const notesTotal = notes.length

  const inspirationalIdeas = entries.filter((entry) => entry.status === "inspirationalIdeas")
  const inspirationalIdeasTotal = inspirationalIdeas.length

  return {
    todos,
    todosTotal,
    completed,
    completedTotal,
    allTodosTotal,
    percentageTodosCompleted,
    notes,
    notesTotal,
    inspirationalIdeas,
    inspirationalIdeasTotal,
  }
}

const ScrollMenuPreviewContainer = (props) => {
  // TODO: prop type
  const { entries } = props

  const { entriesNotMigrated, entriesMigrated, entriesMigratedTotal } =
    useGetEntriesByMigrated(entries)

  const {
    todos,
    todosTotal,
    completed,
    completedTotal,
    allTodosTotal,
    percentageTodosCompleted,
    notes,
    notesTotal,
    inspirationalIdeas,
    inspirationalIdeasTotal,
  } = useGetEntriesByStatus(entriesNotMigrated)

  // TODO: This logic could be extracted to a hook or live as actions in the store.
  //       It's probably best as local state maybe unless we need to merge in the same way for the screen.

  return (
    <View style={{ flex: 1 }}>
      <View style={PROGRESS_CONTAINER_STYLES}>
        <ScrollMenuProgress completed={completedTotal} total={allTodosTotal}></ScrollMenuProgress>
        {/* <Text preset="secondary">Tasks completed</Text> */}
      </View>
      <View style={OTHER_PREVIEW_ITEMS_CONTAINER_STYLES}>
        <View style={PREVIEW_ITEM_CONTAINER_STYLES}>
          <View style={PREVIEW_ITEM_STYLES}>
            <AntDesign name="checksquareo" size={22} color="black" />
            <Text>{`${percentageTodosCompleted}%`}</Text>
          </View>
        </View>
        <View style={PREVIEW_ITEM_CONTAINER_STYLES}>
          <View style={PREVIEW_ITEM_STYLES}>
            <MaterialCommunityIcons name="content-save-move" size={24} color="black" />
            <Text>{entriesMigratedTotal}</Text>
          </View>
        </View>
        <View style={PREVIEW_ITEM_CONTAINER_STYLES}>
          <View style={PREVIEW_ITEM_STYLES}>
            <FontAwesome5 name="sticky-note" size={24} color="black" />
            <Text>{notesTotal}</Text>
          </View>
        </View>
        <View style={PREVIEW_ITEM_CONTAINER_STYLES}>
          <View style={PREVIEW_ITEM_STYLES}>
            <FontAwesome5 name="lightbulb" size={24} color="black" />
            <Text>{inspirationalIdeasTotal}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// Should be re-useable and work for weeklies/monthlies data too
const getEntriesForSelectedDateSpan = (allBulletEntries, entriesForThisDate) => {
  debugger
  if (allBulletEntries.length > 0 && entriesForThisDate.length > 0) {
    return entriesForThisDate.map((entryForThisDate) => {
      const matchedEntry = allBulletEntries.find((entry) => entry.id === entryForThisDate.entryId)
      if (matchedEntry) {
        return { ...matchedEntry, ...entryForThisDate }
      }
      return entryForThisDate
    })
  }
  console.tron.warn("no bullet entries or no daily entries")
  return []
}

// TODO: union off all days/weeks/months types
export interface ScrollMenuBtnProps {
  id: string
  date: Day["date"]
  entries: any // DailyEntries[] & BulletEntriesStore[] //TODO: This
  allEntries?: any[] // TODO
  onMenuBtnPress: () => void
}

/**
 *
 * * ScrollMenuBtn
 *
 **/

const SCROLL_MENU_BTN_STYLES = {
  width: 200,
  height: 300,
  margin: 10,
  backgroundColor: "green",
  borderWidth: 2,
  borderColor: "blue",
  borderRadius: 20,
  padding: spacing[3],
}

const ScrollMenuBtnDate = ({ date }) => {
  const day = moment(date).format("dddd")
  const dateText = moment().format("Do MMMM YYYY")
  return (
    <View>
      <Text preset="header">{day}</Text>
      <Text>{dateText}</Text>
    </View>
  )
}

const ScrollMenuBtn = (props: ScrollMenuBtnProps) => {
  const { id, date, entries, allEntries, onMenuBtnPress } = props

  const entriesForThisDateSpan = getEntriesForSelectedDateSpan(allEntries, entries) // TODO: usememo

  // TODO: Nice date header
  // TODO: Previews/Progress indicators for all 4 status:    todo, done, migrated, notes, inspirationalIdeas  -- add DONE
  // TODO: Remaining items move to backlog/monthly at midnight, user should be notified of impending auto-migrate
  // TODO: Highlight current day with <TODAY> badge/pill on top

  return (
    <TouchableOpacity onPress={onMenuBtnPress} style={SCROLL_MENU_BTN_STYLES}>
      <ScrollMenuBtnDate date={date} />
      <ScrollMenuPreviewContainer entries={entriesForThisDateSpan} />
      {/* <Text>{date}</Text> */}
      {/* <Text>{`entries merged ${JSON.stringify(entriesForThisDateSpan, null, 2)}`}</Text> */}
    </TouchableOpacity>
  )
  // }
  // return <Text>No entries</Text>
}

/**
 *
 * * ScrollMenuList
 *
 **/

const HORIZONTAL_SCROLL_MENU_STYLES = { width: "100%", backgroundColor: "sienna" }

export interface HorizontalScrollMenuProps {
  data: Array<object>
  allBulletEntries?: BulletEntriesStore[]
  navigateToScreen: (id: string) => void
}

export const HorizontalScrollMenu = (props: HorizontalScrollMenuProps) => {
  const { allBulletEntries } = props

  const renderItem = ({ item }) => {
    return (
      <ScrollMenuBtn
        onMenuBtnPress={() => {
          debugger
          props.navigateToScreen(item.id)
        }}
        id={item.id}
        date={item.date}
        entries={item.dailyEntries}
        allEntries={allBulletEntries}
      />
    )
  }

  //  if (props.data.length > 0) {
  return (
    <FlatList
      data={[...props.data]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      style={HORIZONTAL_SCROLL_MENU_STYLES}
      contentContainerStyle={{}}
      extraData={allBulletEntries}
    />
  )
  // }
  // return <></>
}

/**
 *
 * * Home Screen
 *
 **/

// TODO: Create function to merge dailyEntries with their respective entry data from bulletEntries

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "homeScreen">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { bulletEntriesStore, allDaysStore } = useStores()
    const { bulletEntries } = bulletEntriesStore
    const { allDays } = allDaysStore

    // Get all days on mount
    useEffect(() => {
      async function fetchData() {
        await allDaysStore.getAllDays()
        await bulletEntriesStore.getBulletEntries()
      }

      fetchData()
    }, [])

    const navigateToDay = (id) => {
      navigation.navigate("dailyList", { id })
    }

    return (
      <ScrollView>
        <View>
          <Text>Daily Entries</Text>

          <HorizontalScrollMenu
            data={[...allDays]}
            allBulletEntries={bulletEntries}
            navigateToScreen={navigateToDay}
          />
        </View>
      </ScrollView>
    )
  },
)

/**
 *
 * * Utils
 *
 */

/**
 *
 * * Psuedo
 * *  When we create a new day we assign it a unique id as a random guid
 * *  We also assign it the date selected in this format yymmdd (with moment)
 * *  This will be the add day button
 *
 */