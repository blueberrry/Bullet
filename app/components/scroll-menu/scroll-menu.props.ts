import { StyleProp, TextStyle } from "react-native"
import { DailyEntriesSnapshotIn, Day, DaySnapshotIn } from "../../models/all-days-day/all-days-day"
import { BulletEntryStoreSnapshotIn } from "../../models/bullet-entries-store/bullet-entries-store"

export interface ScrollMenuProps {
  entries: DaySnapshotIn[] // || Week || Month?
  allBulletEntries?: BulletEntryStoreSnapshotIn[]
  navigateToScreen: (id: string) => void
  addNextDay: () => void
  addSpecificDay: (date: string) => void
  removeDate: (date: Day["date"]) => void
}

export interface ScrollMenuBtnProps {
  id: Day["id"]
  date: Day["date"]
  entries: DailyEntriesSnapshotIn[] // DailyEntries[] & BulletEntriesStore[] //TODO: This
  allEntries?: any[] // TODO
  onMenuBtnPress: () => void
}

export interface ScrollMenuBtnDate {}

export interface ScrollMenuProgressProps {
  completed?: number
  total?: number
  style?: StyleProp<TextStyle>
}
