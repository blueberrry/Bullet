import moment from "moment"
import React, { useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { getEntriesForSelectedDateSpan } from "../../utils/configure-entries"
import { Text } from "../../components/text/text"
import { useGetEntriesByMigrated } from "../../hooks/useGetEntriesByMigrated"
import { useGetEntriesByStatus } from "../../hooks/useGetEntriesByStatus"
import CircularProgress from "react-native-circular-progress-indicator"
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import {
  DELETE_BTN_STYLES,
  HORIZONTAL_SCROLL_MENU_STYLES,
  PREVIEW_CONTAINER_STYLE,
  PREVIEW_ITEMS_CONTAINER_STYLES,
  PREVIEW_ITEM_CONTAINER_STYLES,
  PREVIEW_ITEM_STYLES,
  PROGRESS_CONTAINER_STYLES,
  RELATIVE_WRAPPER_STYLE,
  SCROLL_MENU_ADD_BTN_CONTAINER_STYLES,
  SCROLL_MENU_BTN_STYLES,
  SCROLL_MENU_PROGRESS_STYLES,
} from "./scroll-menu.presets"
import { ScrollMenuProps, ScrollMenuBtnProps, ScrollMenuProgressProps } from "./scroll-menu.props"
import { Button } from "../button/button"
import { convertDateToYYYYMMDD } from "../../utils/date-formatting"
import { DayPicker } from "../day-picker-calendar/day-picker-calendar"
import { AddDateMenu } from "../select-date-menu-modal/select-date-menu-modal"

/**
 *
 * * ScrollMenuList
 *
 **/

// TODO: Remaining items move to backlog/monthly at midnight, user should be notified of impending auto-migrate
// TODO: Highlight current day with <TODAY> badge/pill on top
// TODO: Sort list by date order
// TODO: Ensure data can have no dupes
// TODO: On day picker select we need to close the modal
// TODO: Add specific day not showing when no days
// TODO: Move other components out
// TODO: Reusability - how much of this is reusable for weeklies/monthlies?

export const ScrollMenu = (props: ScrollMenuProps) => {
  const { entries, allBulletEntries, navigateToScreen, addNextDay, addSpecificDay, removeDate } =
    props

  const [dateMenuVisible, setDateMenuVisible] = useState(false)
  const [animateDateMenu, setAnimateDateMenu] = useState(false)

  const [datePickerVisble, setDatePickerVisible] = useState(false)
  const [animateDatePicker, setAnimateDatePicker] = useState(false)

  const datesOnly = entries.map((entry) => entry.date)

  const renderItem = ({ item }) => {
    return (
      <View style={RELATIVE_WRAPPER_STYLE}>
        <Button text="delete" style={DELETE_BTN_STYLES} onPress={() => removeDate(item.date)} />
        <ScrollMenuBtn
          onMenuBtnPress={() => {
            navigateToScreen(item.id)
          }}
          id={item.id}
          date={item.date}
          entries={item.entriesDetails}
          allEntries={allBulletEntries}
        />
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={[...entries]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        style={HORIZONTAL_SCROLL_MENU_STYLES}
        contentContainerStyle={{}}
        extraData={allBulletEntries}
        ListFooterComponent={
          <View style={SCROLL_MENU_ADD_BTN_CONTAINER_STYLES}>
            {/* <Button text="+" onPress={addDate} /> */}
            <Button text="+" onPress={() => setDateMenuVisible(true)} />
          </View>
        }
      />
      <AddDateMenu
        modalVisible={dateMenuVisible}
        setModalVisible={setDateMenuVisible}
        animateModal={animateDateMenu}
        setAnimateModal={setAnimateDateMenu}
      >
        <Text>Add day</Text>
        <Button
          text="Add next day"
          onPress={() => {
            addNextDay()
            setAnimateDateMenu(true)
            setDateMenuVisible(false)
          }}
        />
        <Button
          text="Add specific day"
          onPress={() => {
            setDateMenuVisible(false)
            setDatePickerVisible(true)
            // setanimateModal(true)
          }}
        />
      </AddDateMenu>
      <AddDateMenu
        modalVisible={datePickerVisble}
        setModalVisible={setDatePickerVisible}
        animateModal={animateDatePicker}
        setAnimateModal={setAnimateDatePicker}
      >
        <Text>Add day</Text>
        <DayPicker
          dates={datesOnly}
          handleDayPress={(dayObj) => {
            const formattedDay = convertDateToYYYYMMDD(dayObj.dateString)
            addSpecificDay(formattedDay)
            setAnimateDatePicker(true)
            setDatePickerVisible(false)
          }}
        />
      </AddDateMenu>
    </>
  )
}

/**
 *
 * * ScrollMenuListBtn
 *
 **/

const ScrollMenuBtn = (props: ScrollMenuBtnProps) => {
  const { date, entries, allEntries, onMenuBtnPress } = props

  // get migrated entries/not migrated from days entries
  // get days entries ids as array
  // get entriesData from allEntries

  // merge entriesData with day entries details

  const entriesForThisDateSpan = getEntriesForSelectedDateSpan(allEntries, entries) // TODO: usememo

  const { entriesNotMigrated, entriesMigratedTotal } =
    useGetEntriesByMigrated(entriesForThisDateSpan)

  const {
    completedTotal,
    allTodosTotal,
    percentageTodosCompleted,
    notesTotal,
    inspirationalIdeasTotal,
  } = useGetEntriesByStatus(entriesNotMigrated)

  return (
    <TouchableOpacity onPress={onMenuBtnPress} style={SCROLL_MENU_BTN_STYLES}>
      <ScrollMenuBtnDate date={date} />
      <View style={PREVIEW_CONTAINER_STYLE}>
        <View style={PROGRESS_CONTAINER_STYLES}>
          <ScrollMenuProgress completed={completedTotal} total={allTodosTotal}></ScrollMenuProgress>
          {/* <Text preset="secondary">Tasks completed</Text> */}
        </View>
        <View style={PREVIEW_ITEMS_CONTAINER_STYLES}>
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
    </TouchableOpacity>
  )
}

/**
 *
 * * ScrollMenuBtnDate
 *
 **/

const ScrollMenuBtnDate = ({ date }) => {
  const day = moment(date).format("dddd")
  const dateText = moment(date).format("Do MMMM YYYY")
  return (
    <View>
      <Text preset="header">{day}</Text>
      <Text>{dateText}</Text>
    </View>
  )
}

/**
 *
 * * ScrollMenuProgress
 *
 **/

const ScrollMenuProgress = (props: ScrollMenuProgressProps) => {
  const { completed = 1, total = 1, style: styleOverride } = props
  const textStyle = { ...SCROLL_MENU_PROGRESS_STYLES, styleOverride }

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
      titleStyle={textStyle}
    />
  )
}
