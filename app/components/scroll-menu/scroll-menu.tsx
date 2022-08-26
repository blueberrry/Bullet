import moment from "moment"
import React, { useEffect, useState } from "react"
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
import SwipeUpDownModal from "react-native-swipe-modal-up-down"
import { Calendar, CalendarList, Agenda } from "react-native-calendars"
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context"
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
import { spacing } from "../../theme"
import { useConfigureDayPickerDates } from "../../hooks/useConfigureDayPickerDates"
import { convertDateToYYYYMMDD } from "../../utils/date-formatting"

const CALENDER_CONTAINER_STYLES = { backgroundColor: "#000000" }

const CALENDAR_THEME = {
  todayTextColor: "ffffff",
}

const DayPicker = (props) => {
  const { dates, addDay } = props
  const { minDate, maxDate, markedDates } = useConfigureDayPickerDates(dates)

  if (dates.length > 0) {
    return (
      <Calendar
        style={CALENDER_CONTAINER_STYLES}
        theme={CALENDAR_THEME}
        // Default = now
        initialDate={minDate}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={minDate}
        // Maximum date 1 month from earliest
        maxDate={maxDate}
        markedDates={{ ...markedDates }} //  todo: TYPES
        onDayPress={(day) => {
          const formattedDay = convertDateToYYYYMMDD(day.dateString)
          addDay(formattedDay)
        }}
        // Handler which gets executed on day long press. Default = undefined
        // onDayLongPress={(day) => {
        //   console.log("selected day", day.dateString) // TODO: Not needed
        // }}
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

const MODAL_CONTAINER_STYLES = {
  marginTop: 300, // Default
  borderColor: "red",
  borderWidth: 2,
}

const MODAL_CONTENT_CONTAINER_STYLES = { backgroundColor: "#005252", padding: spacing[1] }

const BACKGROUND_OVERLAY_BTN_STYLES = {
  flex: 1,
  height: 300, // default
  width: "100%",
  // borderColor: "green",
  // borderWidth: 4,
}

// todo: prop types

const AddDateMenu = ({
  modalVisible,
  setModalVisible,
  animateModal,
  setAnimateModal,
  children,
}) => {
  // TODO: Add button to launch menu/model to pick if !today todoy || nextDay || select day in upcoming 28 days
  // const [animateModal, setanimateModal] = useState(false)
  // const [datePickerVisible, setDatePickerVisible] = useState(false)

  const [modalContentHeight, setModalContentHeight] = useState(0)

  const { height, width } = useSafeAreaFrame()

  // TODO: Get height of rendered view and set that height as the swipe modal
  return (
    <SafeAreaView>
      <SwipeUpDownModal
        modalVisible={modalVisible}
        PressToanimate={animateModal}
        // if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
        ContentModalStyle={{ MODAL_CONTAINER_STYLES, marginTop: modalContentHeight }}
        ContentModal={
          <View
            style={MODAL_CONTENT_CONTAINER_STYLES}
            onLayout={(e) => {
              setModalContentHeight(height - e.nativeEvent.layout.height)
            }}
          >
            {children}
          </View>
        }
        HeaderStyle={styles.headerContent}
        HeaderContent={
          <View>
            <TouchableOpacity
              style={{ ...BACKGROUND_OVERLAY_BTN_STYLES, height: modalContentHeight }}
              onPress={() => {
                // setModalVisible(false)
                setAnimateModal(true)
              }}
            />
          </View>
        }
        onClose={() => {
          setModalVisible(false)
          setAnimateModal(false)
        }}
      />
    </SafeAreaView>
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
// TODO: Ensure data can have no dupes

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
        <DayPicker dates={datesOnly} addDay={addSpecificDay} />
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
