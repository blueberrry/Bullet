import { destroy, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import "react-native-get-random-values"
import { SlideInDown } from "react-native-reanimated"
import { v4 as uuidv4 } from "uuid"
import { BulletEntryApi } from "../../services/api/bullet-entry-api"
import { BulletEntry, BulletEntryModel } from "../bullet-entry/bullet-entry"
import { withEnvironment } from "../extensions/with-environment"
import { INITIAL_ALL_BULLET_ENTRIES } from "../initial-data/initial-data"
// import { INITIAL_ALL_BULLET_ENTRIES } from "../initial-data/initial-data"

/**
 * All bullet entries irrespective of date
 */
export const BulletEntriesStoreModel = types
  .model("BulletEntriesStore")
  .props({
    bulletEntries: types.optional(types.array(BulletEntryModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    // not allowed to change the model, only derive information from it
    // powered behind the scenes, tracks which data is relevant and only calculated when necessary
    get totalBulletEntries() {
      return self.bulletEntries.length
    },
    get allTodos() {
      return self.bulletEntries.filter((entry) => entry.status === "todo")
    },
    get allNotes() {
      return self.bulletEntries.filter((entry) => entry.status === "note")
    },
    get allInspirationalIdeas() {
      return self.bulletEntries.filter((entry) => entry.status === "inspirationalIdeas")
    },
    get allDone() {
      return self.bulletEntries.filter((entry) => entry.status === "done")
    },
  }))
  .actions((self) => ({
    saveBulletEntries: (bulletEntriesSnapshot: BulletEntry[]) => {
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
    // TODO: Causes tests to fail
    getInitialBulletEntriesForTesting: () => {
      // TODO: Temp starting point in lieue of api request
      if (self.bulletEntries.length < 3) {
        self.bulletEntries.replace(INITIAL_ALL_BULLET_ENTRIES.results)
      }
    },
  }))
  .actions((self) => ({
    addBulletEntry: ({ text = "", status = "todo" }) => {
      const id = uuidv4()
      const newBulletEntry = BulletEntryModel.create({
        id,
        text,
        status,
        dateCreated: Date.now(),
      })
      self.bulletEntries.push(newBulletEntry)
    },

    removeBulletEntry: (item) => {
      destroy(item)
    },

    getEntriesFromIds: (ids = []) => {
      // should be in view
      // pass array of guids for specific date
      // return relevant entries from all bullet entires
      const entriesFromIds = self.bulletEntries.filter((entry) => {
        if (ids.includes(entry.id)) {
          return entry
        }
        return null
      })

      return entriesFromIds
    },
  }))

export interface BulletEntriesStore extends Instance<typeof BulletEntriesStoreModel> {}
export interface BulletEntryStoreSnapshotOut extends SnapshotOut<typeof BulletEntriesStoreModel> {}
export interface BulletEntryStoreSnapshotIn extends SnapshotIn<typeof BulletEntriesStoreModel> {}
export const createBulletEntryStoreDefaultModel = () => types.optional(BulletEntriesStoreModel, {})
