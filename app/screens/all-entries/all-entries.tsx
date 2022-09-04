import React, { useEffect, FC, useState, useMemo } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"

// !important - this isn't functioning as a backlog, this is an `all items` page

import {
  Header,
  Screen,
  AutoImage as Image,
  GradientBackground,
  Button,
  BulletItem,
  TextField,
} from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { Text } from "../../components/text/text" // TODO: Change to AppText
import { BulletEntryModel, BulletEntry } from "../../models/bullet-entry/bullet-entry"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import DraggableBulletList from "../../components/draggable-bullet-list/draggable-bullet-list"
import { applySnapshot, clone, getSnapshot } from "mobx-state-tree"
import Preview from "@storybook/react-native/dist/preview"
import { Footer } from "../../components/footer/footer"
import { GestureModal } from "../../components/gesture-modal/gesture-modal"
import { save } from "../../utils/storage"
import { EntryForm as EntryForm } from "../../components/entry-form/entry-form"
import { string } from "mobx-state-tree/dist/internal"

// TODO: Implement moment lib

/**
 *  Pseudo code
 * *    for example, we nav to day screen, if priorityRanking value is null, change the ranking by timestamp?
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

// TODO: BulletList component should be created, a flatlist where we can drag and drop to re-order (from draggable indicator)
//       - initial order sorted based on timestamp || <listItem>.order
//       - new order should be set in pageData onDrop of item dispatch action to update items order
// TODO: BulletDraggableWrapper should wrap each item allowing us to swipe to reveal actions
// TODO: Bullet item shoudd be passed item.text only
// TODO: Performance might be better with RecyclerListView, investigate

// TODO: If order null from pageData, calculate by timestamp.

// Get the current day's entry IDs as an array (ALL_DAYS_INITIAL_DATA[0].entries)
const getThisDaysIds = (thisDay) => {
  let dayIdsArray = []
  dayIdsArray = thisDay.items.map((item) => item.id)
  return dayIdsArray
}

// Create a new array by filtering ALL_ENTRIES with current days ids
const getEntriesDromDayIds = (allBulletEntries, thisDaysids) => {
  const entries = allBulletEntries.filter((entry, index) => {
    if (thisDaysids.includes(entry.id)) {
      return entry
    }
  })
  return entries
}

// Day specific data such as migrated and order now should be merged to build out the rows with all the data needed for each item
// types Array<All_ENTRIES with entry migrated and order state>
const mergeBulletEntriesDataWithDailyData = (bulletEntriesForThisDay, thisDaysSpecificData) => {
  let newData = []

  if (bulletEntriesForThisDay > 0 && thisDaysSpecificData > 0) {
    newData = bulletEntriesForThisDay.map((entry) => {
      const { migrated, order } = thisDaysSpecificData.find(
        (daySpecificEntry) => daySpecificEntry.id === entry.ID,
      )
      return { ...entry, migrated, order }
    })
    return newData
  }
}

// if this items priorityRanking is null then something has gone wrong 🤯, it shouldn't because each item should only update
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
      priorityRanking: index + 1,
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

export const AllEntries: FC<StackScreenProps<NavigatorParamList, "allEntries">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { bulletEntriesStore } = useStores()
    const { bulletEntries } = bulletEntriesStore

    const [entryFormVisible, setEntryFormVisible] = useState(false)
    const [animateEntryForm, setAnimateEntryForm] = useState(false)
    const [entryText, setEntryText] = useState("")

    const saveNewEntry = ({ text, status }) => {
      setEntryFormVisible(false)
      bulletEntriesStore.addBulletEntry({ text, status })
    }

    //       Create a function that assigned an iterative order value (1,2,3) based on earliest to latest dateCreated

    const renderBulletEntry = ({ item, index }) => {
      return (
        <Entry
          item={item}
          // onChangeStatus={changeStatus}
          // onRemoveItem={removeItem}
          key={`${item}-${index}`}
        />
      )
    }

    /**
     * * Bullet entries pseudo
     * * Add new bullet entry button at bottom / fixed
     * * Default saves as 'todo'
     * * Opens swipe modal with text input
     * * Button for each 'todo' 'done' 'note' 'inspirationalIdeas'
     * * Button for save
     */

    return (
      <>
        <View testID="DemoListScreen" style={FULL}>
          <GradientBackground colors={["#422443", "#000000"]} />
          <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
            <Header
              headerText="Bullet Backlog"
              leftIcon="back"
              onLeftPress={goBack}
              style={HEADER}
              titleStyle={HEADER_TITLE}
            />
            <Text>{`Total entries: ${bulletEntriesStore.totalBulletEntries}`}</Text>

            {/* <DraggableBulletList entries={[...bulletEntries]} /> */}
            <FlatList
              data={[...bulletEntries]}
              renderItem={renderBulletEntry}
              keyExtractor={(item) => item.id}
            />
            <Footer>
              <Button
                text="Add new bullet entry"
                preset="secondary"
                onPress={() => setEntryFormVisible(true)}
              />
            </Footer>
            <GestureModal
              modalVisible={entryFormVisible}
              setModalVisible={setEntryFormVisible}
              animateModal={animateEntryForm}
              setAnimateModal={setAnimateEntryForm}
              fillViewport={true}
              title="Add Entry"
            >
              <EntryForm onSaveEntry={saveNewEntry} />
            </GestureModal>
            {/* <Button text="Migrate to daily (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
            {/* <Button text="Migrate to weekly (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
            {/* <Button text="Migrate to monthly (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
            {/* <Button text="Edit (from flatlist item)" onPress={() => removeBulletEntry()} /> */}
          </Screen>
        </View>
      </>
    )
  },
)

// TODO: types check
export const Entry: FC<{
  item: BulletEntry
}> = observer((props) => {
  // const onChangeStatus = () => {}
  const { item } = props

  const [editEntryFormVisible, setEditEntryFormVisible] = useState(false)
  const [animateEditEntryForm, setAnimateEditEntryForm] = useState(false)

  const TOGGLABLE_ITEMS = ["todo", "done"]

  //   let cloneEntry = clone(item)

  const updateEntry = ({ text, status }) => {
    // cloneEntry.changeText(text)
    // cloneEntry.changeStatus(status)

    item.changeText(text)
    item.changeStatus(status)

    // applySnapshot(item, getSnapshot(cloneEntry))
    // cloneEntry = null
    setEditEntryFormVisible(false)
  }

  return (
    <View style={LIST_ITEM_STYLES}>
      {/* <Image source={{ uri: item.image }} style={IMAGE} /> */}
      {/* <Text style={LIST_TEXT}>entry id: {item.id}</Text>
     
      <Text style={LIST_TEXT}>entry text: {item.text}</Text>
    <Text style={LIST_TEXT}>entry dateCreated: {item.dateCreated}</Text> */}

      <Text style={LIST_TEXT}>status: {item.status}</Text>
      <BulletItem text={item.text}>
        {TOGGLABLE_ITEMS.includes(item.status) && (
          <ToggleDone
            isDone={item.status === "done"}
            onPress={() => {
              item.changeStatus("done") // TODO: SHould be toggle status
            }}
          />
        )}
      </BulletItem>
      <DummySwipeBtnRow
        LHSActions={[
          <SwipeBtn
            onPress={() => {
              item.remove()
            }}
            text="Remove"
          />,
        ]}
        RHSActions={[
          <SwipeBtn onPress={() => setEditEntryFormVisible(true)} text="Edit" />,
          <SwipeBtn onPress={() => {}} text="Migrate" />,
        ]}
      />
      <GestureModal
        modalVisible={editEntryFormVisible}
        setModalVisible={setEditEntryFormVisible}
        animateModal={animateEditEntryForm}
        setAnimateModal={setAnimateEditEntryForm}
        fillViewport={true}
        title="Edit Entry"
      >
        <EntryForm
          onSaveEntry={updateEntry}
          initialText={item.text}
          initialStatus={item.status}
          // item={item}
          editMode={true}
        />
      </GestureModal>
    </View>
  )
})

/**
 * * Buttons that appear when we swipe a row
 **/
interface SwipeBtnProps {
  text: string
  onPress: () => void
}

/**
 * * Frig new row for now to work with regular flatlist, convert to swipeable when logic complete
 **/
const DummySwipeBtnRow = ({ LHSActions = () => <></>, RHSActions = () => <></> }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View>{LHSActions}</View>
      <View style={{ width: "40%", backgroundColor: "black" }}></View>
      <View style={{ flexDirection: "row" }}>{RHSActions}</View>
    </View>
  )
}

const SWIPE_BTN_STYLES = {
  // flex: 1,
}
const SwipeBtn = (props: SwipeBtnProps) => {
  const { text, onPress } = props
  // different bg color depending on action
  return (
    <View style={SWIPE_BTN_STYLES}>
      <Button onPress={onPress} text={text} />
    </View>
  )
}

const ToggleDone = ({ isDone = false, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {!isDone ? <Text>☑️</Text> : <Text>✅</Text>}
    </TouchableOpacity>
  )
}

// TODO: Move to presets

const ENTRY_TEXT_CONTAINER = {
  flexDirection: "row",
  // marginHorizontal: spacing[2],
  justifyContent: "space-around",
} as ViewStyle

const LIST_ITEM_STYLES = { backgroundColor: "grey" }

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

const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
function useRef(arg0: () => BulletEntry) {
  throw new Error("Function not implemented.")
}
