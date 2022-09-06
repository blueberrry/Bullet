import React, { FC, useState } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"

// !important - this isn't functioning as a backlog, this is an `all items` page

import { Header, Screen, GradientBackground, Button } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { AppText } from "../../components/app-text/app-text" // TODO: Change to AppText
import DraggableFlatList from "react-native-draggable-flatlist"
import DraggableBulletList from "../../components/draggable-bullet-list/draggable-bullet-list"
import { Footer } from "../../components/footer/footer"
import { GestureModal } from "../../components/gesture-modal/gesture-modal"
import { Accordian } from "../../components/accordian/accordian"
import { EntryForm } from "../../components/entry-form/entry-form"
import { EntryRow } from "../../components/entry-row/entry-row"

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

// TODO: Split components
// TODO: Nested sort priority ranking - if null, sort by timestamp and apply ranking
// TODO: If new, set new state as highestRank + 1 (day store)
// TODO: If moved (via drag), swap index (day store)

// TODO: Nested scroll warning back

export const DragEntriesList: FC<any> = observer(({ navigation }) => {
  const goBack = () => navigation.goBack()

  const { bulletEntriesStore } = useStores()
  const { bulletEntries } = bulletEntriesStore

  const todos = bulletEntriesStore.allTodos
  const notes = bulletEntriesStore.allNotes
  const inspirationalIdeas = bulletEntriesStore.allInspirationalIdeas
  const done = bulletEntriesStore.allDone

  const [entryFormVisible, setEntryFormVisible] = useState(false)
  const [animateEntryForm, setAnimateEntryForm] = useState(false)

  const saveNewEntry = ({ text, status }) => {
    setEntryFormVisible(false)
    bulletEntriesStore.addBulletEntry({ text, status })
  }

  const renderBulletEntry = ({ item, index }) => {
    return (
      <EntryRow
        item={item}
        // onChangeStatus={changeStatus}
        // onRemoveItem={removeItem}
        key={`${item}-${index}`}
      />
    )
  }

  return (
    <>
      <AppText>{`Total entries: ${bulletEntriesStore.totalBulletEntries}`}</AppText>

      {/* <DraggableBulletList entries={[...bulletEntries]} /> */}
      <Accordian title={`Todos (${todos.length})`}>
        <FlatList
          nestedScrollEnabled
          data={[...todos]}
          renderItem={renderBulletEntry}
          keyExtractor={(item) => item.id}
        />
      </Accordian>
      <Accordian title={`Notes (${notes.length})`}>
        <FlatList
          nestedScrollEnabled
          data={[...notes]}
          renderItem={renderBulletEntry}
          keyExtractor={(item) => item.id}
        />
      </Accordian>
      <Accordian title={`Inspirational Ideas (${inspirationalIdeas.length})`}>
        <FlatList
          data={[...inspirationalIdeas]}
          renderItem={renderBulletEntry}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled
        />
      </Accordian>
      <Accordian title={`Done (${done.length})`}>
        <FlatList
          data={[...done]}
          renderItem={renderBulletEntry}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled
        />
      </Accordian>

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
    </>
  )
})

// TODO: Move to presets

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
