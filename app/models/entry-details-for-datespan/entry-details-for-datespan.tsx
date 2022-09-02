import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { BulletEntryModel } from "../bullet-entry/bullet-entry"
/**
 * * Single Date Entry Details
 */

export const EntryDetailsForDateSpan = types.model("EntryDetailsForDateSpan").props({
  // entryId: types.maybe(types.reference(BulletEntryModel)),
  id: types.maybe(types.identifier || types.string), // TODO: This should somehow reference a bulletentrymodel id
  priorityRanking: types.maybe(types.null || types.number),
  migrated: types.maybe(types.boolean),
})

export interface EntryDetails extends Instance<typeof EntryDetailsForDateSpan> {}
export interface EntryDetailsSnapshotOut extends SnapshotOut<typeof EntryDetailsForDateSpan> {}
export interface EntryDetailsSnapshotIn extends SnapshotIn<typeof EntryDetailsForDateSpan> {}
export const createEntryDetailsDefaultModel = () => types.optional(EntryDetailsForDateSpan, {})
