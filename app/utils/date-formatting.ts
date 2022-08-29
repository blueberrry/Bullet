// TODO: Put all moment date formatting utils in one utils file

import moment from "moment"
import { DaySnapshotIn, DaySnapshotOut } from "../models/all-days-day/all-days-day"

export const convertDateToYYYYMMDD = (date) => {
  const formattedDate = moment(date).format("YYYYMMDD")
  return formattedDate
}

// TODO: Diff between snapshot in/out
export const getLatestDate = (allDays: DaySnapshotOut[]) => {
  const datesArrayAsNumbers = allDays.map((day) => parseInt(day.date, 10))
  const latestDate = Math.max(...datesArrayAsNumbers)
  return latestDate.toString()
}
