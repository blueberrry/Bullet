import { Instance, SnapshotIn, SnapshotOut, types, destroy, hasParent } from "mobx-state-tree"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { BulletEntriesStoreModel } from "../bullet-entries-store/bullet-entries-store"
import { BulletEntry, BulletEntryModel } from "../bullet-entry/bullet-entry"
import {
  EntryDetails,
  EntryDetailsForDateSpan,
} from "../entry-details-for-datespan/entry-details-for-datespan"
import { useStores } from "../root-store/root-store-context"

/**
 * * Single Day Model
 */

export const DayModel = types
  .model("Day")
  .props({
    id: types.maybe(types.identifier || types.string),
    date: types.maybe(types.string), // YYYYMMDD
    // entries: types.maybe(types.array(entriesModel), []),
    entriesDetails: types.optional(types.array(EntryDetailsForDateSpan), []), // TODO: Should this be optional? When we create a new day, it adds entriesDetails: [] without types.optional
  })
  .views((self) => ({
    get totalEntries() {
      return self.entriesDetails.length
    },
    get totalTodos() {
      return self.entriesDetails.filter((detail) => detail.entry.status === "todo").length
    },
    get totalDone() {
      const allDone = self.entriesDetails.filter((detail) => {
        if (detail.entry.status === "done") {
          return detail
        }
        return null
      })
      return allDone.length
    },
    get totalMigrated() {
      return self.entriesDetails.filter((detail) => detail.migrated).length
    },
    // TODO: This seems verbose, any way to simplify by extending bullet entry store view methods somehow?
    get totalNotes() {
      return self.entriesDetails.filter((detail) => detail.entry.status === "note").length
    },
    get totalInspirationalIdeas() {
      return self.entriesDetails.filter((detail) => detail.entry.status === "inspirationalIdeas")
        .length
    },
    get allNotMigratedDetails() {
      return self.entriesDetails.filter((detail) => !detail.migrated)
    },
    get allMigratedDetails() {
      return self.entriesDetails.filter((detail) => detail.migrated)
    },
    get allTodosDetails() {
      return self.entriesDetails.filter(
        (detail) => !detail.migrated && detail.entry.status === "todo",
      )
    },
    get allNotesDetails() {
      return self.entriesDetails.filter(
        (detail) => !detail.migrated && detail.entry.status === "note",
      )
    },
    get allInspirationalIdeasDetails() {
      return self.entriesDetails.filter(
        (detail) => !detail.migrated && detail.entry.status === "inspirationalIdeas",
      )
    },
    get allDoneDetails() {
      return self.entriesDetails.filter(
        (detail) => !detail.migrated && detail.entry.status === "done",
      )
    },
    entryDetailById(id: EntryDetails["entry"]) {
      return self.entriesDetails.find((detail) => detail.entry === id)
    },
  }))
  .actions((self) => ({
    addEntryDetails: ({ id = "", priorityRanking = null, migrated = false }) => {
      // const id = uuidv4()
      const newDayEntry = EntryDetailsForDateSpan.create({
        priorityRanking,
        migrated,
        entry: id,
      })
      self.entriesDetails.push(newDayEntry)
    },
    removeEntryDetail: (item) => {
      // TODO: type
      destroy(item)
      // same as self.etnriesDetails.splice(self.entriesDettails.indexOf(item), 1)
    },
    removeEntryDetailById: (id) => {
      self.entriesDetails.filter((detail) => detail.entry !== id)
    },
    removeDay: () => {
      // delegate to owner of day store item since we are changing the collection itself
      if (hasParent(self)) {
        // @ts-ignore
        getParent(self, 2).removeDay(self) // TODO: TS not infering properties on parent?
      }
    },
  }))

export interface Day extends Instance<typeof DayModel> {}
export interface DaySnapshotOut extends SnapshotOut<typeof DayModel> {}
export interface DaySnapshotIn extends SnapshotIn<typeof DayModel> {}
export const createDayDefaultModel = () => types.optional(DayModel, {})

/**
 * * each day has a list of entries/new bullet entries store?
 * * each days entries can reference all bullet entries
 * * selected day > new bullet entries store
 **/
