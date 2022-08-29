import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { BulletEntryApi } from "../../services/api/bullet-entry-api"
import { withEnvironment } from "../extensions/with-environment"
import { Day, DayModel, DaySnapshotIn, DaySnapshotOut } from "../all-days-day/all-days-day"
import { AllDaysApi } from "../../services/api/all-days-api"
import { INITIAL_ALL_DAYS } from "../initial-data/initial-data"
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
      // console.tron.log(
      //   "🚀 ~ file: all-days-store.ts ~ line 17 ~ .actions ~ allDaysSnapshot",
      //   allDaysSnapshot,
      // )

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
    getInitialAllDaysForTesting: () => {
      // Here we are saying that if we have no data/initial data only, we should save our hard coded initial entries for testing
      if (self.allDays.length < 3) {
        self.allDays.replace(INITIAL_ALL_DAYS.results)
      }
    },
  }))
  .actions((self) => ({
    addNextDay: (date) => {
      const nextDay = { id: uuidv4(), date, dailyEntries: [] }
      self.allDays.push(nextDay)
    },
  }))
  .actions((self) => ({
    addSpecificDay: (date) => {
      const nextDay = { id: uuidv4(), date, dailyEntries: [] }
      self.allDays.push(nextDay)
    },
  }))

export interface AllDaysStore extends Instance<typeof AllDaysStoreModel> {}
export interface DayStoreSnapshotOut extends SnapshotOut<typeof AllDaysStoreModel> {}
export interface DayStoreSnapshotIn extends SnapshotIn<typeof AllDaysStoreModel> {}
export const createDayStoreDefaultModel = () => types.optional(AllDaysStoreModel, {})
