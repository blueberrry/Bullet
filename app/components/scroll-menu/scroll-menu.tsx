import moment from "moment"
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import SwipeUpDownModal from "react-native-swipe-modal-up-down"
import { Calendar, CalendarList, Agenda } from "react-native-calendars"
import { getEntriesForSelectedDateSpan } from "../../utils/get-entries-for-selected-datespan"
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
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { spacing } from "../../theme"

const useConfigureDayPickerDates = (dates: string[]) => {
  // const [markedDates, setMarkedDates] = useState({})
  const minDate = moment().format("YYYY-MM-DD")
  const maxDate = moment().add(1, "month").format("YYYY-MM-DD")

  const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" }
  const massage = { key: "massage", color: "blue", selectedDotColor: "blue" }
  const workout = { key: "workout", color: "green" }

  let markedDates = {}
  // if (dates.length > 0) {
  if (dates && dates.length > 0) {
    debugger
    dates.forEach((date) => {
      const formatDateForPicker = moment(date).format("YYYY-MM-DD")
      console.tron.log(
        "🚀 ~ file: scroll-menu.tsx ~ line 39 ~ dates.forEach ~ formatDateForPicker",
        formatDateForPicker,
      )
      const newEntry = {
        [formatDateForPicker]: {
          disabled: true,
          disableTouchEvent: true,
          marked: true,
          dotColor: "grey",
        },
      }
      markedDates = { ...markedDates, ...newEntry }
    })
  }
  // }

  // useEffect(() => {
  //   if (dates.length > 0) {
  //     dates.forEach((date) => {
  //       const formatDateForPicker = moment(date).format("YYYY-MM-DD")
  //       console.tron.log(
  //         "🚀 ~ file: scroll-menu.tsx ~ line 39 ~ dates.forEach ~ formatDateForPicker",
  //         formatDateForPicker,
  //       )
  //       setMarkedDates((prev) => ({ ...prev, [formatDateForPicker]: { disabled: true } }))
  //     })
  //   }
  // }, [dates])

  // console.tron.log(
  //   "🚀 ~ file: scroll-menu.tsx ~ line 35 ~ useConfigureDayPickerDates ~ markedDates",
  //   markedDates,
  // )
  return { minDate, maxDate, markedDates }
}

const DayPicker = (props) => {
  const { dates } = props
  console.log("🚀 ~ file: scroll-menu.tsx ~ line 73 ~ DayPicker ~ dates", dates)
  const { minDate, maxDate, markedDates } = useConfigureDayPickerDates(dates)
  if (dates.length > 0) {
    debugger
    return (
      <Calendar
        style={{ backgroundColor: "#000000" }}
        theme={{
          // backgroundColor: "#abc123",
          // calendarBackground: "#abc123",
          // selectedDayTextColor: "#abc123t",
          todayTextColor: "ffffff",
        }}
        // Initially visible month. Default = now
        initialDate={minDate} // TODO: Should be today for now or earliest date that isn't disabled
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={minDate} // TODO: Should be today
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={maxDate} // TODO: Should be + 1 month from today
        // markedDates={{
        //   "2012-05-25": { marked: true, dotColor: "red", activeOpacity: 0 },
        //   "2012-05-26": { disabled: true },
        // }} // TODO: Pass all disabled events (perhaps with marking). Disabled events are ones that have already been created
        markedDates={{ ...markedDates }}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day)
          // TODO: should be passed up to addDay function
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day) // TODO: Not needed
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"} // TODO: Can't see this
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month)
        }} // TODO: Only change month is within certain days
        // Hide month navigation arrows. Default = false
        // hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => <Arrow />}
        // Do not show days of other months in month page. Default = false
        // hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        // hideDayNames={true}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        // disableArrowLeft={true}
        // Disable right arrow. Default = false
        // disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={(date) => {
          return <></>
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    )
  }
  return <></>
}

const styles = {
  containerContent: { flex: 1, marginTop: 40 },
  headerContent: {
    marginTop: 0,
  },
  modal: {
    backgroundColor: "#005252",
    marginTop: 300,
  },
}

const BACKGROUND_OVERLAY_BTN_STYLES = {
  flex: 1,
  height: 300,
  width: "100%",
}

const MODAL_CONTENT_CONTAINER_STYLES = { flex: 1, padding: spacing[1] }

const AddDateMenu = ({ modalVisible, setModalVisible, datesArray = [] }) => {
  console.tron.log("🚀 ~ file: scroll-menu.tsx ~ line 130 ~ AddDateMenu ~ datesArray", datesArray)
  // TODO: Add button to launch menu/model to pick if !today todoy || nextDay || select day in upcoming 28 days
  const [animateModal, setanimateModal] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  return (
    <SwipeUpDownModal
      modalVisible={modalVisible}
      PressToanimate={animateModal}
      // if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
      ContentModal={
        <View style={MODAL_CONTENT_CONTAINER_STYLES}>
          <Text>Add day</Text>
          <Button
            text="Add next day"
            onPress={() => {
              setanimateModal(true)
            }}
          />
          <Button
            text="Add specific day"
            onPress={() => {
              setDatePickerVisible(true)
              // setanimateModal(true)
            }}
          />
          {datePickerVisible && <DayPicker dates={datesArray} />}
        </View>
      }
      HeaderStyle={styles.headerContent}
      ContentModalStyle={styles.modal}
      HeaderContent={
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={BACKGROUND_OVERLAY_BTN_STYLES}
            // text={"Press Me"}
            onPress={() => {
              // setModalVisible(false)
              setanimateModal(true)
            }}
          />
        </View>
      }
      onClose={() => {
        setDatePickerVisible(false)
        setModalVisible(false)
        setanimateModal(false)
      }}
    />
  )
}

/**
 *
 * * ScrollMenuList
 *
 **/

// TODO: Remaining items move to backlog/monthly at midnight, user should be notified of impending auto-migrate
// TODO: Highlight current day with <TODAY> badge/pill on top
// TODO: Sort list by date order

export const ScrollMenu = (props: ScrollMenuProps) => {
  const { entries, allBulletEntries, navigateToScreen, addDate, removeDate } = props

  const [addDateModalVisible, setAddDateModalVisible] = useState(false)

  const datesOnly = entries.map((entry) => entry.date)
  console.log(
    "🚀 ~ file: scroll-menu.tsx ~ line 229 ~ ScrollMenu ~ datesOnly",
    JSON.stringify(datesOnly),
  )

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
          entries={item.dailyEntries}
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
            <Button text="+" onPress={() => setAddDateModalVisible(true)} />
          </View>
        }
      />
      <AddDateMenu
        modalVisible={addDateModalVisible}
        setModalVisible={setAddDateModalVisible}
        datesArray={datesOnly}
      />
      <View style={{ height: 300, width: "100%", backgroundColor: "red" }}></View>
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
