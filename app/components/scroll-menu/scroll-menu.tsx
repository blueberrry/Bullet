import moment from "moment"
import React from "react"
import { FlatList, StyleProp, TextStyle, TouchableOpacity, View } from "react-native"
import { Day } from "../../models/all-days-day/all-days-day"
import { BulletEntriesStore } from "../../models/bullet-entries-store/bullet-entries-store"
import { spacing } from "../../theme"
import { getEntriesForSelectedDateSpan } from "../../utils/get-entries-for-selected-datespan"
import { Text } from "../../components/text/text"
import { useGetEntriesByMigrated } from "../../hooks/useGetEntriesByMigrated"
import { useGetEntriesByStatus } from "../../hooks/useGetEntriesByStatus"
import CircularProgress from "react-native-circular-progress-indicator"
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import {
  HORIZONTAL_SCROLL_MENU_STYLES,
  PREVIEW_CONTAINER_STYLE,
  PREVIEW_ITEMS_CONTAINER_STYLES,
  PREVIEW_ITEM_CONTAINER_STYLES,
  PREVIEW_ITEM_STYLES,
  PROGRESS_CONTAINER_STYLES,
  SCROLL_MENU_BTN_STYLES,
  SCROLL_MENU_PROGRESS_STYLES,
} from "./scroll-menu.presets"
import {
  HorizontalScrollMenuProps,
  ScrollMenuBtnProps,
  ScrollMenuProgressProps,
} from "./scroll-menu.props"

/**
 *
 * * ScrollMenuList
 *
 **/

export const HorizontalScrollMenu = (props: HorizontalScrollMenuProps) => {
  const { data, allBulletEntries, navigateToScreen } = props

  const renderItem = ({ item }) => {
    return (
      <ScrollMenuBtn
        onMenuBtnPress={() => {
          navigateToScreen(item.id)
        }}
        id={item.id}
        date={item.date}
        entries={item.dailyEntries}
        allEntries={allBulletEntries}
      />
    )
  }

  return (
    <FlatList
      data={[...data]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      style={HORIZONTAL_SCROLL_MENU_STYLES}
      contentContainerStyle={{}}
      extraData={allBulletEntries}
    />
  )
}

/**
 *
 * * ScrollMenuListBtn
 *
 **/

const ScrollMenuBtn = (props: ScrollMenuBtnProps) => {
  const { date, entries, allEntries, onMenuBtnPress } = props

  const entriesForThisDateSpan = getEntriesForSelectedDateSpan(allEntries, entries) // TODO: usememo

  // TODO: Remaining items move to backlog/monthly at midnight, user should be notified of impending auto-migrate
  // TODO: Highlight current day with <TODAY> badge/pill on top

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
