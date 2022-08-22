import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Single Days Entries Model
 */

// TODO: This could be incorrect, check/test
export const DailyEntriesModel = types.model("DailyEntries").props({
  entryId: types.maybe(types.identifier || types.string),
  dayPriorityRanking: types.null || types.number,
  migrated: types.null || types.boolean,
})

export interface DailyEntries extends Instance<typeof DailyEntriesModel> {}
export interface DailyEntriesSnapshotOut extends SnapshotOut<typeof DailyEntriesModel> {}
export interface DailyEntriesSnapshotIn extends SnapshotIn<typeof DailyEntriesModel> {}
export const createDailyEntriesDefaultModel = () => types.optional(DailyEntriesModel, {})

/**
 * Single Day Model.
 */
export const DayModel = types.model("Day").props({
  dayId: types.identifier,
  date: types.maybe(types.number || types.string), // types.maybe(type) makes a type optional and nullable, types.string should be todo|completed|note|inspirationIdeas|deleted
  dailyEntries: DailyEntriesModel,
})

// TODO: Sort above mess out

export interface Day extends Instance<typeof DayModel> {}
export interface DaySnapshotOut extends SnapshotOut<typeof DayModel> {}
export interface DaySnapshotIn extends SnapshotIn<typeof DayModel> {}
export const createDayDefaultModel = () => types.optional(DayModel, {})
