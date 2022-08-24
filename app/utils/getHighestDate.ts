import { DaySnapshotIn, DaySnapshotOut } from "../models/all-days-day/all-days-day"

// TODO: Diff between snapshot in/out
export const getHighestDate = (allDays: DaySnapshotOut[]) => {
  const datesArrayAsNumbers = allDays.map((day) => parseInt(day.date, 10))
  const highestDate = Math.max(...datesArrayAsNumbers)
  return highestDate.toString()
}
