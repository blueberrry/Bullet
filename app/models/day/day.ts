import { Instance, SnapshotIn, SnapshotOut, types, destroy, hasParent } from "mobx-state-tree"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { BulletEntriesStoreModel } from "../bullet-entries-store/bullet-entries-store"
import { BulletEntryModel } from "../bullet-entry/bullet-entry"
import { EntryDetailsForDateSpan } from "../entry-details-for-datespan/entry-details-for-datespan"
import { useStores } from "../root-store/root-store-context"

/**
 * * Single Day Model
 */

export const DayModel = types
  .model("Day")
  .props({
    id: types.maybe(types.identifier || types.string),
    date: types.maybe(types.string), // types.maybe(type) makes a type optional and nullable, types.string should be todo|completed|note|inspirationIdeas|deleted  // !important types.maybe(types.number || types.string), caused the error
    // entries: types.maybe(types.array(entriesModel), []),
    entriesDetails: types.optional(types.array(EntryDetailsForDateSpan), []), // TODO: Should this be optional? When we create a new day, it adds entriesDetails: [] without types.optional
  })
  .views((self) => ({
    get totalEntries() {
      return self.entriesDetails.length
    },
    get entriesDetailsIds() {
      return self.entriesDetails.map((entry) => entry.id)
    },
  }))
  .actions((self) => ({
    add: ({ id = "", priorityRanking = null, migrated = false }) => {
      // const id = uuidv4()
      const newDayEntry = EntryDetailsForDateSpan.create({
        id,
        priorityRanking,
        migrated,
      })
      self.entriesDetails.push(newDayEntry)

      // Entry data to all entries
      // const { bulletEntriesStore } = useStores()

      // BulletEntriesStoreModel.addBulletEntry({
      //   text,
      //   status,
      // })
    },
    remove: () => {
      // TODO: Add to test
      // delegate to owner of wishlist item since we are changing the collection itself
      if (hasParent(self)) {
        // @ts-ignore
        getParent(self, 2).removeDay(self) // TODO: TS not infering properties on parent?
      }
    },
    removeEntryDetail: (item) => {
      destroy(item)
      // same as self.etnriesDetails.splice(self.entriesDettails.indexOf(item), 1)
    },
    removeEntryDetailById: (id) => {
      self.entriesDetails.filter((entryDetail) => entryDetail.id !== id)
    },
  }))

// getDaysids

// TODO: Sort above mess out

export interface Day extends Instance<typeof DayModel> {}
export interface DaySnapshotOut extends SnapshotOut<typeof DayModel> {}
export interface DaySnapshotIn extends SnapshotIn<typeof DayModel> {}
export const createDayDefaultModel = () => types.optional(DayModel, {})

/**
 * * each day has a list of entries/new bullet entries store?
 * * each days entries can reference all bullet entries
 * * selected day > new bullet entries store
 **/
