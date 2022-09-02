import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { EntryDetailsForDateSpan } from "../entry-details-for-datespan/entry-details-for-datespan"

/**
 * * Single Day Model
 */

export const DayModel = types.model("Day").props({
  id: types.maybe(types.identifier || types.string),
  date: types.maybe(types.string), // types.maybe(type) makes a type optional and nullable, types.string should be todo|completed|note|inspirationIdeas|deleted  // !important types.maybe(types.number || types.string), caused the error
  // entries: types.maybe(types.array(entriesModel), []),
  entriesDetails: types.optional(types.array(EntryDetailsForDateSpan), []), // TODO: Should this be optional? When we create a new day, it adds entriesDetails: [] without types.optional
})

// getDaysids

// TODO: Sort above mess out

export interface Day extends Instance<typeof DayModel> {}
export interface DaySnapshotOut extends SnapshotOut<typeof DayModel> {}
export interface DaySnapshotIn extends SnapshotIn<typeof DayModel> {}
export const createDayDefaultModel = () => types.optional(DayModel, {})
