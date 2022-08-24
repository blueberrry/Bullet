import React, { useEffect, FC, useState } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
// import DraggableFlatList, {
//   ScaleDecorator,
//   NestableScrollContainer,
// } from "react-native-draggable-flatlist"
import {
  Header,
  Screen,
  Text,
  AutoImage as Image,
  GradientBackground,
  Button,
  BulletItem,
} from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"

// TODO: Implement moment lib

/**
 *  Pseudo code
 * *    for example, we nav to day screen, if dayPriorityRanking value is null, change the ranking by timestamp?
 * *   -how would that work if we had a list of user sorted items with various ranking
 * *   - new items would be added to the list
 * *   - If migrating item we should just add it the lowest ranking (ie: 12)
 * *   - As user inputs entries, they should increment 1, 2, 3
 * *   - If user changes 3 to 1 then we will switch the list data 3, 1, 2 (renamed to 1, 2, 3)  // !important: best js way to do this?
 * *   - Is there any instance we need to sort by date?
 * *        - On daily - no, unless server doesn't serve ranking data.
 * *        - On weekly/monthly - no, unless server doesn't serve ranking data
 *
 **/

const ALL_DAYS_INITIAL_IDS = [
  "5b122234-4931-4037-8347-f662739ba01b",
  "aad640ce-76de-4a3a-86dc-6cf45750fe0c",
  "5ac99dc5-ee8f-414c-ae40-afb9580cdb5b",
  "011cda35-73ca-487c-9460-f4e7f6afd36c",
]

const ALL_DAYS_INITIAL_DATA = [
  {
    id: ALL_DAYS_INITIAL_IDS[0], // TODO: Or Date.now()/day()
    date: "day",
    dailyEntries: [
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
    ],
  },
  {
    id: ALL_DAYS_INITIAL_IDS[1],
    date: "day",
    dailyEntries: [
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
    ],
  },
  {
    id: ALL_DAYS_INITIAL_IDS[2],
    date: "day",
    dailyEntries: [
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
    ],
  },
  {
    id: ALL_DAYS_INITIAL_IDS[3],
    date: "day",
    dailyEntries: [
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
      { entryId: "", dayPriorityRanking: null, migrated: false },
    ],
  },
]

const DAILY_ENTRIES_INITIAL_DATA = ALL_DAYS_INITIAL_DATA[0].dailyEntries

const TEMP_DAY_ID = "ac5f2861-4a9e-42ce-b4f5-c06f21b84dfd"

// TODO: Change ID to Id

// Get this day data from ALL_DAYS (ALL_DAYS_INITIAL_DATA[0])
const getThisDay = (dayId, allDays) => {
  let thisDay = {} // TODO: types
  if (allDays.length > 0) {
    thisDay = allDays.find((day) => day.dayId === dayId)
  }
  return thisDay
}

// Get the current day's entry IDs as an array (ALL_DAYS_INITIAL_DATA[0].dailyEntries)
const getThisDaysEntryIds = (thisDay) => {
  let dayIdsArray = []
  dayIdsArray = thisDay.items.map((item) => item.entryID)
  return dayIdsArray
}

// Create a new array by filtering ALL_ENTRIES with current days ids
const getEntriesDromDayIds = (allBulletEntries, thisDaysEntryIds) => {
  const dailyEntries = allBulletEntries.filter((entry, index) => {
    if (thisDaysEntryIds.includes(entry.id)) {
      return entry
    }
  })

  return dailyEntries
}

// Day specific data such as migrated and order now should be merged to build out the rows with all the data needed for each item
// types Array<All_ENTRIES with entry migrated and order state>
const mergeBulletEntriesDataWithDailyData = (bulletEntriesForThisDay, thisDaysSpecificData) => {
  let newData = []

  if (bulletEntriesForThisDay > 0 && thisDaysSpecificData > 0) {
    newData = bulletEntriesForThisDay.map((entry) => {
      const { migrated, order } = thisDaysSpecificData.find(
        (daySpecificEntry) => daySpecificEntry.entryID === entry.ID,
      )
      return { ...entry, migrated, order }
    })
    return newData
  }
}

// if this items dayPriorityRanking is null then something has gone wrong 🤯, it shouldn't because each item should only update
// on user action (adding/removing/editing)
// but never feat 🦸‍♂️ >> if null then lets just assign it an order ranking based on the timestamp it was created!
// but oh no! 🤯 >> we will have to update the ALL_DAYS store AND the local state data!
//  if we only update the ALL_DAYS data, and did the filter/find/sort in the component, then we would get the correct data
//   🤔 What if we update local state first

// only needed if dayPriority is null
const sortEntriesByOldest = (entries) => {
  return entries.sort(function (a, b) {
    return a.dateCreated - b.dateCreated
  })
}

// only needed if dayPriority is null
const addRankingAfterSort = (entriesOldToNew) => {
  let entriesWithRankings = [] // TODO: Initialise type DailyEntrieEditRankingArray[]
  if (entriesOldToNew.length > 0) {
    entriesWithRankings = entriesOldToNew.forEach((entry, index) => ({
      ...entry,
      dayPriorityRanking: index + 1,
    })) // !important naughty naughty index 😉
  }
  return entriesWithRankings
}

/**
 *
 * Utilities // TODO: Move out
 *
 **/

// TODO: Create dailystore with expanded vals (see notebook)
// order  then fall back to timestamp

export const BulletBacklog: FC<StackScreenProps<NavigatorParamList, "bulletBacklog">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { bulletEntriesStore, allDaysStore } = useStores()
    const { bulletEntries } = bulletEntriesStore
    const { allDays } = allDaysStore

    const [x, setX] = useState(null)

    const [localDailyEntries, setLocalDailyEntries] = useState(null) // TODO: Move to daily store

    useEffect(() => {
      console.tron.log("got bullet entries", JSON.stringify(bulletEntries, null, 2))
    }, [bulletEntries])

    // TODO: Should we get this at a higher leve
    //       Surely the day component should only be passed the _days_ data as props and allEntries data
    //       We will getch initial day data here for now

    // useEffect(() => {
    //   function fetchTempInitialData() {
    //     bulletEntriesStore.getInitialBulletEntriesForTesting()
    //   }

    //   fetchTempInitialData()
    // }, [])

    const addBulletEntry = (newEntry = undefined) => {
      const newBulletEntries = [
        ...bulletEntries,
        {
          id: "52669457-0ee4-4094-bc41-5d63349619a8",
          status: "todo",
          text: "Newest entry",
          dateCreated: Date.now(),
        },
      ]
      bulletEntriesStore.saveBulletEntries(newBulletEntries)
    }

    const removeBulletEntry = (entryId = "52669457-0ee4-4094-bc41-5d63349619a8") => {
      const newBulletEntries = bulletEntries.filter((entry) => entryId !== entry.id)
      bulletEntriesStore.saveBulletEntries(newBulletEntries)
    }

    // TODO: BulletList component should be created, a flatlist where we can drag and drop to re-order (from draggable indicator)
    //       - initial order sorted based on timestamp || <listItem>.order
    //       - new order should be set in pageData onDrop of item dispatch action to update items order
    // TODO: BulletDraggableWrapper should wrap each item allowing us to swipe to reveal actions
    // TODO: Bullet item shoudd be passed item.text only
    // TODO: Performance might be better with RecyclerListView, investigate

    // TODO: If order null from pageData, calculate by timestamp.
    //       Create a function that assigned an iterative order value (1,2,3) based on earliest to latest dateCreated

    const renderItem = ({ item, index, drag, isActive }) => {
      return (
        <ScaleDecorator>
          <TouchableOpacity
            onLongPress={drag}
            style={{ backgroundColor: isActive ? "blue" : "grey" }}
          >
            {/* <Image source={{ uri: item.image }} style={IMAGE} /> */}
            {/* <Text style={LIST_TEXT}>entry id: {item.id}</Text>
      <Text style={LIST_TEXT}>entry status: {item.status}</Text>
      <Text style={LIST_TEXT}>entry text: {item.text}</Text>
    <Text style={LIST_TEXT}>entry dateCreated: {item.dateCreated}</Text> */}
            <BulletItem text={item.text} />
          </TouchableOpacity>
        </ScaleDecorator>
      )
    }

    return (
      <>
        <View testID="DemoListScreen" style={FULL}>
          <GradientBackground colors={["#422443", "#281b34"]} />
          <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
            <Header
              // headerTx="demoListScreen.title"
              headerText="Bullet Backlog"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />

            <View
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                borderWidth: 2,
                borderColor: "red",
              }}
            >
              <DraggableFlatList
                // contentContainerStyle={FLAT_LIST}
                containerStyle={{ flex: 1, width: "100%", height: "100%" }}
                data={[...bulletEntries]}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                onDragBegin={(x) => {
                  console.tron.log(`onDragBegin: ${x}`)
                  setX(x)
                }}
              />
            </View>

            <Button text="Add new bullet entry" onPress={addBulletEntry} />
            <Button text="Remove new bullet entry/ies" onPress={() => removeBulletEntry()} />
            {/* <Button text="Change bullet entries" onPress={() => removeBulletEntry()} /> */}
            {/* <Button text="Migrate to daily (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
            {/* <Button text="Migrate to weekly (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
            {/* <Button text="Migrate to monthly (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
            {/* <Button text="Delete (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
            {/* <Button text="Edit (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
          </Screen>
        </View>
      </>
    )
  },
)

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "column",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}
