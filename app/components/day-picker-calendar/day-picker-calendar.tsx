import React from "react"
import { Calendar } from "react-native-calendars"
import { useConfigureDayPickerDates } from "../../hooks/useConfigureDayPickerDates"
import { convertDateToYYYYMMDD } from "../../utils/date-formatting"
import { DayPickerProps } from "./day-picker-calendar.props"

const CALENDER_CONTAINER_STYLES = { backgroundColor: "#000000" }

const CALENDAR_THEME = {
  todayTextColor: "ffffff",
}

export const DayPicker = (props: DayPickerProps) => {
  const { dates, handleDayPress } = props
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
        onDayPress={handleDayPress}
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
