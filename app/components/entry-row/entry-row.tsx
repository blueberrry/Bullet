import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import { useStores } from "../../models"
import { BulletEntry } from "../../models/bullet-entry/bullet-entry"
import { Day } from "../../models/day/day"
import { EntryDetails } from "../../models/entry-details-for-datespan/entry-details-for-datespan"
import { AppText } from "../app-text/app-text"
import { BulletItem } from "../bullet-item/bullet-item"
import { EntryForm } from "../entry-form/entry-form"
import { GestureModal } from "../gesture-modal/gesture-modal"
import { SwipeBtn } from "../swipe-btn/swipe-btn"
import { ToggleTodo } from "../toggle-todo/toggle-todo"
import { DummySwipeBtnRow } from "../_temp/dummy-swipe-row/dummy-swiper-row"

// TODO: types check
export const EntryRow: FC<{
  item: BulletEntry
  itemDetails?: EntryDetails | undefined // if rendered within date view (month/day) extra details for rank and migrated
}> = observer((props) => {
  const { item } = props

  /**
   * * render item function in parent
   * * render itemDateDetails in parent
   * * item.changeText from parent pass id
   * * item.changeStatus from parent pass id
   * * itemDateDetails.changeMigrated from parent pass id -- optional, if day view
   * * itemDateDetails.changePriorityRanking from parent pass id -- optional, if day view
   * * Wrap <DraggableItem> thing in parent -- if day view
   * * Both should have swipe reveal functionality with CRUD to main store
   * * if !dayView do not show migrate option
   * * if dayView show migrate and rendered from DraggableFlatlist so we can sort in parent
   * * essentially this is just a dumb component entry row with swipe CRUD actions only
   * * all entries updates only to bullet entries store
   * * day view updates to entries store but also manages sort and migrated
   * * will get to getBulletEntryById(item.id) for item from day, if not found, means deleted from all entries, details should be deleted
   * * all entries can just be passed item directly from store
   * * possibly won't need observer if all handled in parent component
   * * will have to think about monthlies
   * ! important get rid of as much logic from that 'merge' hook. we can't use this because we can't run the mobX actions on the mutated data
   **/

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
      <AppText style={LIST_TEXT}>status: {item.status}</AppText>
      <BulletItem text={item.text} childrenInline={true}>
        {TOGGLABLE_ITEMS.includes(item.status) && (
          <ToggleTodo
            isDone={item.status === "done"}
            onPress={() => {
              // if (item.status === "todo") {
              //   item.changeStatus("done")
              // }
              // if (item.status === "done") {
              //   item.changeStatus("todo") // TODO: Move toggle logic to store action
              // }
              item.toggleTodoStatus()
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

const LIST_ITEM_STYLES: ViewStyle = { backgroundColor: "grey" }

const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
