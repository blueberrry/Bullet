import React, { useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { TextField } from "../text-field/text-field"
import { Button } from "../button/button"
import { Footer } from "../footer/footer"

// TODO: Edit mode

const ADD_ENTRY_CONTAINER = {
  flexDirection: "row",
  justifyContent: "space-around",
} as ViewStyle

type OnSaveEntryArgs = {
  text: string
  status: string // TODO: "todo" | "done" | "note" | "inspirationalIdeas" | "deleted"
}

interface EntryFormProps {
  onSaveEntry: (args: OnSaveEntryArgs) => void
  editMode?: boolean
  initialText?: any // TODO: Types
  initialStatus?: any // TODO: Types
}

export const EntryForm = observer((props: EntryFormProps) => {
  // TODO: prop types
  const { onSaveEntry, editMode, initialText, initialStatus } = props

  const [entryText, setEntryText] = useState(editMode ? initialText : "")
  const [status, setStatus] = useState(editMode ? initialStatus : "todo") // TODO: types, initial state

  // const saveEntry = () => {
  //   bulletEntriesStore.addBulletEntry({ text: entryText, status })
  // }

  const isSelected = useMemo(
    () => (s: string) => s === status ? "selectedItem" : "selectItem",
    [status],
  )

  // useEffect(() => {
  //   console.tron.log("🚀 ~ file: entry-form.tsx ~ line 33 ~ EntryForm ~ status", status)
  // }, [status])

  return (
    <>
      <TextField
        placeholder="type a new entry!"
        onChangeText={(e) => {
          setEntryText(e)
        }}
        defaultValue={editMode ? initialText : undefined}
      />
      <View style={ADD_ENTRY_CONTAINER}>
        <Button preset={isSelected("todo")} text="todo" onPress={() => setStatus("todo")} />
        <Button preset={isSelected("done")} text="done" onPress={() => setStatus("done")} />
        <Button preset={isSelected("note")} text="note" onPress={() => setStatus("note")} />
        <Button
          preset={isSelected("inspirationalIdeas")}
          text="Inspirational Ideas"
          onPress={() => setStatus("inspirationalIdeas")}
        />
      </View>
      <Footer>
        <Button
          text="save"
          preset="secondary"
          onPress={() => onSaveEntry({ text: entryText, status })}
        />
      </Footer>
    </>
  )
})
