import { StyleProp, TextStyle } from "react-native"
import { Day, DaySnapshotIn, DaySnapshotOut } from "../../models/day/day"
import { BulletEntryStoreSnapshotIn } from "../../models/bullet-entries-store/bullet-entries-store"
import {
  EntryDetails,
  EntryDetailsSnapshotOut,
} from "../../models/entry-details-for-datespan/entry-details-for-datespan"
import { YYYYMMDD } from "../../types/types"

export interface ScrollMenuProps {
  days: DaySnapshotOut[] // || Week || Month?
  datesArray: Array<YYYYMMDD> | string[] // TODO: Array<YYYYMMDD> Should work without string[]?
  navigateToScreen: (id: string) => void
  addNextDay: () => void
  addSpecificDay: (date: string) => void
  removeDate: (date: Day["date"]) => void
}

export interface ScrollMenuBtnProps {
  onMenuBtnPress: () => void
  id: Day["id"]
  date: Day["date"]
  totalTodosAndDone: number
  totalDone: number
  percentageDone: number
  totalMigrated: number
  totalNotes: number
  totalInspirationalIdeas: number
}

export interface ScrollMenuBtnDate {}

export interface ScrollMenuProgressProps {
  done?: number
  total?: number
  style?: StyleProp<TextStyle>
}
