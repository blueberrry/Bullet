import moment from "moment"
import React, { useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { getEntriesForSelectedDateSpan } from "../../utils/configure-entries"
import { AppText } from "../app-text/app-text"
import { useGetEntriesByMigrated } from "../../hooks/useGetEntriesByMigrated"
import { useGetEntriesByStatus } from "../../hooks/useGetEntriesByStatus"
import CircularProgress from "react-native-circular-progress-indicator"
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import {
  DELETE_BTN_STYLES,
  FIRST_ACTION,
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
import { GestureModal } from "../gesture-modal/gesture-modal"
import { observer } from "mobx-react-lite"

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
// TODO: Move other components out
// TODO: Reusability - how much of this is reusable for weeklies/monthlies?
// TODO: On press open edit mode modal

export const ScrollMenu = observer((props: ScrollMenuProps) => {
  const { days, datesArray, navigateToScreen, addNextDay, addSpecificDay, removeDate } = props

  // TODO: Pass merged (Bullet entries + entry details) from parent

  const [dateMenuVisible, setDateMenuVisible] = useState(false)
  const [animateDateMenu, setAnimateDateMenu] = useState(false)

  const [datePickerVisble, setDatePickerVisible] = useState(false)
  const [animateDatePicker, setAnimateDatePicker] = useState(false)

  // TODO: See if can move percentage to view/extension/memoize
  const renderItem = ({ item }) => {
    const totalTodosAndDone = item.totalTodos + item.totalDone
    const percentageDone = totalTodosAndDone > 0 ? (item.totalDone / totalTodosAndDone) * 100 : 0

    return (
      <View style={RELATIVE_WRAPPER_STYLE}>
        <Button text="delete" style={DELETE_BTN_STYLES} onPress={() => removeDate(item)} />
        <ScrollMenuBtn
          onMenuBtnPress={() => {
            navigateToScreen(item.id)
          }}
          id={item.id}
          date={item.date}
          totalTodosAndDone={totalTodosAndDone}
          totalDone={item.totalDone}
          percentageDone={Math.round(percentageDone)}
          totalMigrated={item.totalMigrated}
          totalNotes={item.totalNotes}
          totalInspirationalIdeas={item.totalInspirationalIdeas}
        />
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={[...days]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        style={HORIZONTAL_SCROLL_MENU_STYLES}
        contentContainerStyle={{}}
        ListFooterComponent={
          <View style={SCROLL_MENU_ADD_BTN_CONTAINER_STYLES}>
            <Button text="+" onPress={() => setDateMenuVisible(true)} />
          </View>
        }
      />
      <GestureModal
        modalVisible={dateMenuVisible}
        setModalVisible={setDateMenuVisible}
        animateModal={animateDateMenu}
        setAnimateModal={setAnimateDateMenu}
        title="Add Day"
      >
        <Button
          text="Add next day"
          preset="secondary"
          style={FIRST_ACTION}
          onPress={() => {
            addNextDay()
            setAnimateDateMenu(true)
            setDateMenuVisible(false)
          }}
        />
        <Button
          text="Add specific day"
          preset="secondary"
          onPress={() => {
            setDateMenuVisible(false)
            setDatePickerVisible(true)
            // setanimateModal(true)
          }}
        />
      </GestureModal>
      <GestureModal
        modalVisible={datePickerVisble}
        setModalVisible={setDatePickerVisible}
        animateModal={animateDatePicker}
        setAnimateModal={setAnimateDatePicker}
        title="Add Date"
      >
        <DayPicker
          dates={datesArray}
          handleDayPress={(dayObj) => {
            const formattedDay = convertDateToYYYYMMDD(dayObj.dateString)
            addSpecificDay(formattedDay)
            setAnimateDatePicker(true)
            setDatePickerVisible(false)
          }}
        />
      </GestureModal>
    </>
  )
})

/**
 *
 * * ScrollMenuListBtn
 *
 **/

const ScrollMenuBtn = observer((props: ScrollMenuBtnProps) => {
  const {
    date,
    onMenuBtnPress,
    totalTodosAndDone,
    totalDone,
    percentageDone,
    totalMigrated,
    totalNotes,
    totalInspirationalIdeas,
  } = props

  return (
    <TouchableOpacity onPress={onMenuBtnPress} style={SCROLL_MENU_BTN_STYLES}>
      <ScrollMenuBtnDate date={date} />
      <View style={PREVIEW_CONTAINER_STYLE}>
        <View style={PROGRESS_CONTAINER_STYLES}>
          <ScrollMenuProgress done={totalDone} total={totalTodosAndDone}></ScrollMenuProgress>
        </View>
        <View style={PREVIEW_ITEMS_CONTAINER_STYLES}>
          <View style={PREVIEW_ITEM_CONTAINER_STYLES}>
            <View style={PREVIEW_ITEM_STYLES}>
              <AntDesign name="checksquareo" size={22} color="black" />
              <AppText>{`${percentageDone}%`}</AppText>
            </View>
          </View>
          <View style={PREVIEW_ITEM_CONTAINER_STYLES}>
            <View style={PREVIEW_ITEM_STYLES}>
              <MaterialCommunityIcons name="content-save-move" size={24} color="black" />
              <AppText>{totalMigrated}</AppText>
            </View>
          </View>
          <View style={PREVIEW_ITEM_CONTAINER_STYLES}>
            <View style={PREVIEW_ITEM_STYLES}>
              <FontAwesome5 name="sticky-note" size={24} color="black" />
              <AppText>{totalNotes}</AppText>
            </View>
          </View>
          <View style={PREVIEW_ITEM_CONTAINER_STYLES}>
            <View style={PREVIEW_ITEM_STYLES}>
              <FontAwesome5 name="lightbulb" size={24} color="black" />
              <AppText>{totalInspirationalIdeas}</AppText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

/**
 *
 * * ScrollMenuBtnDate
 *
 **/

const ScrollMenuBtnDate = observer(({ date }) => {
  const day = moment(date).format("dddd")
  const dateText = moment(date).format("Do MMMM YYYY")
  return (
    <View>
      <AppText preset="header">{day}</AppText>
      <AppText>{dateText}</AppText>
    </View>
  )
})

/**
 *
 * * ScrollMenuProgress
 *
 **/

const ScrollMenuProgress = observer((props: ScrollMenuProgressProps) => {
  const { done = 1, total = 1, style: styleOverride } = props
  const textStyle = { ...SCROLL_MENU_PROGRESS_STYLES, styleOverride }

  return (
    <CircularProgress
      value={done}
      radius={50}
      duration={2000}
      progressValueColor={"#ecf0f1"}
      maxValue={total}
      title={`${done}/${total} ✅`}
      showProgressValue={false}
      titleColor={"white"}
      titleStyle={textStyle}
    />
  )
})
