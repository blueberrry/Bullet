// TODO: Put all moment date formatting utils in one utils file

import moment from "moment"
import { Day, DaySnapshotIn, DaySnapshotOut } from "../models/day/day"

export const convertDateToYYYYMMDD = (date) => {
  const formattedDate = moment(date).format("YYYYMMDD")
  return formattedDate
}

// TODO: Diff between snapshot in/out
export const getLatestDate = (days: Day[]) => {
  const datesArrayAsNumbers = days.map((day) => parseInt(day.date, 10))
  const latestDate = Math.max(...datesArrayAsNumbers)
  return latestDate.toString()
}
