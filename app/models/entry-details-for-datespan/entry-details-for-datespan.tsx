import { Instance, SnapshotIn, SnapshotOut, hasParent, types, getParent } from "mobx-state-tree"
import { SlideInDown } from "react-native-reanimated"
import { BulletEntryModel } from "../bullet-entry/bullet-entry"
/**
 * * Single Date Entry Details
 */

export const EntryDetailsForDateSpan = types
  .model("EntryDetailsForDateSpan")
  .props({
    // id: types.reference(types.late(() => BulletEntryModel)),
    id: types.maybe(types.identifier || types.string), // TODO: This should somehow reference a bulletentrymodel id
    priorityRanking: types.union(types.null, types.number),
    migrated: types.maybe(types.boolean),
    // id: types.reference(BulletEntryModel),
  })
  .actions((self) => ({
    changePriorityRanking(newRank) {
      self.priorityRanking = newRank
    },
    changeMigrated(migrated) {
      self.migrated = migrated
    },
    remove: () => {
      // TODO: Add to test
      // delegate to owner of wishlist item since we are changing the collection itself
      if (hasParent(self)) {
        // @ts-ignore
        getParent(self, 2).removeEntryDetail(self) // TODO: TS not infering properties on parent?
      }
    },
  }))

export interface EntryDetails extends Instance<typeof EntryDetailsForDateSpan> {}
export interface EntryDetailsSnapshotOut extends SnapshotOut<typeof EntryDetailsForDateSpan> {}
export interface EntryDetailsSnapshotIn extends SnapshotIn<typeof EntryDetailsForDateSpan> {}
export const createEntryDetailsDefaultModel = () => types.optional(EntryDetailsForDateSpan, {})
