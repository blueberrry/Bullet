import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { BulletEntryApi } from "../../services/api/bullet-entry-api"
import { BulletEntryModel, BulletEntrySnapshotOut } from "../bullet-entry/bullet-entry"
import { withEnvironment } from "../extensions/with-environment"
import { INITIAL_ALL_BULLET_ENTRIES } from "../initial-data/initial-data"

/**
 * All bullet entries irrespective of date
 */
export const BulletEntriesStoreModel = types
  .model("BulletEntriesStore")
  .props({
    bulletEntries: types.optional(types.array(BulletEntryModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveBulletEntries: (bulletEntriesSnapshot: BulletEntrySnapshotOut[]) => {
      self.bulletEntries.replace(bulletEntriesSnapshot)
    },
  }))
  .actions((self) => ({
    getBulletEntries: async () => {
      const bulletEntryApi = new BulletEntryApi(self.environment.api)
      const result = await bulletEntryApi.getBulletEntries()

      if (result.kind === "ok") {
        self.saveBulletEntries(result.bulletEntries)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    getInitialBulletEntriesForTesting: () => {
      // Here we are saying that if we have no data/initial data only, we should save our hard coded initial entries for testing
      if (self.bulletEntries.length < 3) {
        self.bulletEntries.replace(INITIAL_ALL_BULLET_ENTRIES.results)
      }
    },
  }))

export interface BulletEntriesStore extends Instance<typeof BulletEntriesStoreModel> {}
export interface BulletEntryStoreSnapshotOut extends SnapshotOut<typeof BulletEntriesStoreModel> {}
export interface BulletEntryStoreSnapshotIn extends SnapshotIn<typeof BulletEntriesStoreModel> {}
export const createBulletEntryStoreDefaultModel = () => types.optional(BulletEntriesStoreModel, {})
