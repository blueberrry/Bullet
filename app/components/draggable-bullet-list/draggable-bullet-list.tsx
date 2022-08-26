import { View, Text, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import { BulletItem } from "../bullet-item/bullet-item"

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
      <TouchableOpacity onLongPress={drag} style={LIST_ITEM_STYLES}>
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

const DraggableBulletList = (props) => {
  const { entries } = props
  const [y, setY] = useState(0)
  return (
    <View style={DRAGGABLE_BULLET_LIST_CONTAINER_STYLES}>
      <DraggableFlatList
        // contentContainerStyle={FLAT_LIST}
        containerStyle={DRAGGABLE_LIST_STYLES}
        data={[...entries]}
        keyExtractor={(item) => String(item.id)} // TODO: This could also be entryId for dailies, I think the data will have both?
        renderItem={renderItem}
        onDragBegin={(x) => {
          console.tron.log(`onDragBegin: ${x}`)
          setY(x)
        }}
      />
    </View>
  )
}

export default DraggableBulletList
