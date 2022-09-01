import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { BulletEntryApi } from "../../services/api/bullet-entry-api"
import { withEnvironment } from "../extensions/with-environment"
import { Day, DayModel, DaySnapshotIn, DaySnapshotOut } from "../day/day"
import { AllDaysApi } from "../../services/api/all-days-api"
import { INITIAL_ALL_DAYS } from "../initial-data/initial-data"
import { YYYYMMDD } from "../../types/types"
import { EntryDetailsForDateSpan } from "../entry-details-for-datespan/entry-details-for-datespan"

/**
 * All Days store
 */
export const AllDaysStoreModel = types
  .model("AllDaysStoreModel")
  .props({
    allDays: types.optional(types.array(DayModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveAllDays: (allDaysSnapshot: Day[]) => {
      // TODO: Still don't understand snapshotin/out
      self.allDays.replace(allDaysSnapshot) // TODO: Fix this
    },
  }))
  .actions((self) => ({
    getAllDays: async () => {
      const allDaysApi = new AllDaysApi(self.environment.api)
      const result = await allDaysApi.getAllDaysEntries()

      if (result.kind === "ok") {
        self.saveAllDays(result.allDays)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))
  .actions((self) => ({
    // TODO: This is a temp starting point in lieue of an api request
    getInitialAllDaysForTesting: () => {
      // Here we are saying that if we have no data/initial data only, we should save our hard coded initial entries for testing
      if (self.allDays.length < 3) {
        self.allDays.replace(INITIAL_ALL_DAYS.results)
      }
    },
  }))
  .actions((self) => ({
    addNextDay: (date: YYYYMMDD) => {
      // const nextDay = { id: uuidv4(), date, entriesDetails: [] }
      const id = uuidv4()
      const nextDay = DayModel.create({
        id,
        date,
        // entriesDetails: [{ id: "", priorityRanking: null, migrated: false }],
      })
      self.allDays.push(nextDay)
    },
  }))
  .actions((self) => ({
    addSpecificDay: (date: YYYYMMDD) => {
      const nextDay = { id: uuidv4(), date, entriesDetails: [] }
      self.allDays.push(nextDay)
    },
  }))
  .actions((self) => ({
    getSpecificDayById: (id) => {
      return self.allDays.find((day) => day.id === id)
    },
  }))

// getSpecificDaysidsByDayId
//

export interface AllDaysStore extends Instance<typeof AllDaysStoreModel> {}
export interface DayStoreSnapshotOut extends SnapshotOut<typeof AllDaysStoreModel> {}
export interface DayStoreSnapshotIn extends SnapshotIn<typeof AllDaysStoreModel> {}
export const createDayStoreDefaultModel = () => types.optional(AllDaysStoreModel, {})
