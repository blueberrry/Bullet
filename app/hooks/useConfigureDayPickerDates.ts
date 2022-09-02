import moment from "moment"

export const useConfigureDayPickerDates = (dates: string[]) => {
  // const [markedDates, setMarkedDates] = useState({})
  const minDate = moment().format("YYYY-MM-DD")
  const maxDate = moment().add(1, "month").format("YYYY-MM-DD")

  let markedDates = {}

  if (dates.length > 0) {
    dates.forEach((date) => {
      const formatDateForPicker = moment(date).format("YYYY-MM-DD")

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
  return { minDate, maxDate, markedDates }
}
