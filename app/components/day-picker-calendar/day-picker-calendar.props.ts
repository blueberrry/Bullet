import { YYYYMMDD } from "../../types/types"

// TODO: Stricter
export interface DayPickerProps {
  dates: Array<YYYYMMDD> | string[]
  handleDayPress: (day: any) => void
}
