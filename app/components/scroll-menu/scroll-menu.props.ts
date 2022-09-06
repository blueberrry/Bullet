import { StyleProp, TextStyle } from "react-native"
import { Day, DaySnapshotIn } from "../../models/day/day"
import { BulletEntryStoreSnapshotIn } from "../../models/bullet-entries-store/bullet-entries-store"
import { EntryDetailsSnapshotOut } from "../../models/entry-details-for-datespan/entry-details-for-datespan"
import { YYYYMMDD } from "../../types/types"

export interface ScrollMenuProps {
  entries: DaySnapshotIn[] // || Week || Month?
  datesArray: Array<YYYYMMDD> | string[] // TODO: Array<YYYYMMDD> Should work without string[]?
  navigateToScreen: (id: string) => void
  addNextDay: () => void
  addSpecificDay: (date: string) => void
  removeDate: (date: Day["date"]) => void
}

export interface ScrollMenuBtnProps {
  id: Day["id"]
  date: Day["date"]
  entries: EntryDetailsSnapshotOut[] // entries[] & BulletEntriesStore[] //TODO: This
  allEntries?: any[] // TODO
  onMenuBtnPress: () => void
}

export interface ScrollMenuBtnDate {}

export interface ScrollMenuProgressProps {
  done?: number
  total?: number
  style?: StyleProp<TextStyle>
}
