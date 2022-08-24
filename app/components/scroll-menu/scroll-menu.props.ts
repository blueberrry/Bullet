import { StyleProp, TextStyle } from "react-native"
import { Day } from "../../models/all-days-day/all-days-day"
import { BulletEntryStoreSnapshotIn } from "../../models/bullet-entries-store/bullet-entries-store"

export interface ScrollMenuProps {
  data: Array<object>
  allBulletEntries?: BulletEntryStoreSnapshotIn[]
  navigateToScreen: (id: string) => void
}

export interface ScrollMenuBtnProps {
  id: string
  date: Day["date"]
  entries: any // DailyEntries[] & BulletEntriesStore[] //TODO: This
  allEntries?: any[] // TODO
  onMenuBtnPress: () => void
}

export interface ScrollMenuBtnDate {}

export interface ScrollMenuProgressProps {
  completed?: number
  total?: number
  style?: StyleProp<TextStyle>
}
