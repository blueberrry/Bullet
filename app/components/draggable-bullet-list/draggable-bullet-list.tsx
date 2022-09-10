import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import React, { useState } from "react"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import { BulletItem } from "../bullet-item/bullet-item"
import { EntryDetails } from "../../models/entry-details-for-datespan/entry-details-for-datespan"
import { Day } from "../../models/day/day"
import { BulletEntry } from "../../models/bullet-entry/bullet-entry"
import { AppText } from "../app-text/app-text"
import { ToggleTodo } from "../toggle-todo/toggle-todo"
import { GestureModal } from "../gesture-modal/gesture-modal"
import { EntryForm } from "../entry-form/entry-form"
import { observer } from "mobx-react-lite"

const DRAGGABLE_BULLET_LIST_CONTAINER_STYLES = {
  flex: 1,
  width: "100%",
  height: "100%",
  borderWidth: 2,
  borderColor: "red",
}

const DRAGGABLE_LIST_STYLES = { flex: 1, width: "100%", height: "100%" }

const renderItem = ({ item, index, drag, isActive }) => {
  const LIST_ITEM_STYLES = { backgroundColor: isActive ? "blue" : "grey" }
  return (
    <ScaleDecorator>
      <DraggableEntryRow item={item} drag={drag} />
    </ScaleDecorator>
  )
}

// TODO: Can this component be refactored to handle item.entry.text && item.text? - so it can also be used by 'all entries'

interface DraggableBulletListProps {
  dateInfo?: any
  entriesDetails: EntryDetails[]
  addNewEntry: (args: { text: BulletEntry["text"]; status: BulletEntry["status"] }) => void
}

const DraggableBulletList = observer((props: DraggableBulletListProps) => {
  const { dateInfo, entriesDetails } = props
  const [y, setY] = useState(0)
  return (
    <View style={DRAGGABLE_BULLET_LIST_CONTAINER_STYLES}>
      <DraggableFlatList
        // contentContainerStyle={FLAT_LIST}
        containerStyle={DRAGGABLE_LIST_STYLES}
        data={[...entriesDetails]}
        keyExtractor={(item) => String(item.entry)} // TODO: This could also be id for dailies, I think the data will have both?
        renderItem={renderItem}
        onDragBegin={(x) => {
          console.tron.log(`onDragBegin: ${x}`)
          setY(x)
        }}
      />
    </View>
  )
})

export default DraggableBulletList

interface DraggableEntryRowProps {
  item: EntryDetails
  drag: () => void // TODO: Correct type
  // updateEntry: (args: { text: BulletEntry["text"]; status: BulletEntry["status"] }) => void
}

const DraggableEntryRow = observer((props: DraggableEntryRowProps) => {
  const { item, drag } = props

  const [editEntryFormVisible, setEditEntryFormVisible] = useState(false)
  const [animateEditEntryForm, setAnimateEditEntryForm] = useState(false)

  const TOGGLABLE_ITEMS = ["todo", "done"] // TODO: Move to consts

  const updateEntry = ({ text, status }) => {
    // cloneEntry.changeText(text)
    // cloneEntry.changeStatus(status)
    item.entry.changeText(text)
    item.entry.changeStatus(status)
    // applySnapshot(item, getSnapshot(cloneEntry))
    // cloneEntry = null
    setEditEntryFormVisible(false)
  }

  return (
    <TouchableOpacity
      onLongPress={drag}
      onPress={() => setEditEntryFormVisible(true)}
      style={LIST_ITEM_STYLES}
    >
      <View style={LIST_ITEM_STYLES}>
        <AppText style={LIST_TEXT}>status: {item.entry.status}</AppText>
        <BulletItem text={item.entry.text} childrenInline={true}>
          {TOGGLABLE_ITEMS.includes(item.entry.status) && (
            <ToggleTodo
              isDone={item.entry.status === "done"}
              onPress={() => {
                item.entry.toggleTodoStatus()
              }}
            />
          )}
        </BulletItem>
        {/* <DummySwipeBtnRow
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
      /> */}
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
            initialText={item.entry.text}
            initialStatus={item.entry.status}
            editMode={true}
          />
        </GestureModal>
      </View>
    </TouchableOpacity>
  )
})

const LIST_ITEM_STYLES: ViewStyle = { backgroundColor: "grey" }

const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
