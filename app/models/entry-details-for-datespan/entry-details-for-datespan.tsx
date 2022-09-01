import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
/**
 * * Single Date Entry Details
 */

export const EntryDetailsForDateSpan = types.model("EntryDetailsForDateSpan").props({
  // id: types.reference(BulletEntryModel),
  id: types.maybe(types.identifier || types.string),
  priorityRanking: types.maybe(types.null || types.number),
  migrated: types.maybe(types.boolean),
})

export interface EntryDetails extends Instance<typeof EntryDetailsForDateSpan> {}
export interface EntryDetailsSnapshotOut extends SnapshotOut<typeof EntryDetailsForDateSpan> {}
export interface EntryDetailsSnapshotIn extends SnapshotIn<typeof EntryDetailsForDateSpan> {}
export const createEntryDetailsDefaultModel = () => types.optional(EntryDetailsForDateSpan, {})
