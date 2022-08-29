import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Single Days Entries Model
 */

// TODO: This could be incorrect, check/test
export const DailyEntriesModel = types.model("DailyEntries").props({
  entryId: types.maybe(types.identifier || types.string),
  dayPriorityRanking: types.maybe(types.null || types.number),
  migrated: types.maybe(types.boolean),
})

export interface DailyEntries extends Instance<typeof DailyEntriesModel> {}
export interface DailyEntriesSnapshotOut extends SnapshotOut<typeof DailyEntriesModel> {}
export interface DailyEntriesSnapshotIn extends SnapshotIn<typeof DailyEntriesModel> {}
export const createDailyEntriesDefaultModel = () => types.optional(DailyEntriesModel, {})

/**
 * Single Day Model.
 */
export const DayModel = types.model("Day").props({
  id: types.maybe(types.identifier),
  date: types.maybe(types.string), // types.maybe(type) makes a type optional and nullable, types.string should be todo|completed|note|inspirationIdeas|deleted  // !important types.maybe(types.number || types.string), caused the error
  // dailyEntries: types.maybe(types.array(DailyEntriesModel), []),
  dailyEntries: types.array(DailyEntriesModel), // TODO: Here might be causing all-days-store error
})

// getDaysEntryIds

// TODO: Sort above mess out

export interface Day extends Instance<typeof DayModel> {}
export interface DaySnapshotOut extends SnapshotOut<typeof DayModel> {}
export interface DaySnapshotIn extends SnapshotIn<typeof DayModel> {}
export const createDayDefaultModel = () => types.optional(DayModel, {})
