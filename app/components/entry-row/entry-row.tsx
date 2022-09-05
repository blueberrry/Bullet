import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import { BulletEntry } from "../../models/bullet-entry/bullet-entry"
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
}> = observer((props) => {
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
      <AppText style={LIST_TEXT}>status: {item.status}</AppText>
      <BulletItem text={item.text} childrenInline={true}>
        {TOGGLABLE_ITEMS.includes(item.status) && (
          <ToggleTodo
            isDone={item.status === "done"}
            onPress={() => {
              if (item.status === "todo") {
                item.changeStatus("done")
              }
              if (item.status === "done") {
                item.changeStatus("todo") // TODO: Move toggle logic to store action
              }
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
