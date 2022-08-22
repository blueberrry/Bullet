import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { BulletEntryApi } from "../../services/api/bullet-entry-api"
import { withEnvironment } from "../extensions/with-environment"
import { DayModel, DaySnapshotOut } from "../all-days-day/all-days-day"
import { AllDaysApi } from "../../services/api/all-days-api"
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
    saveAllDays: (allDaysSnapshot: DaySnapshotOut[]) => {
      self.allDays.replace(allDaysSnapshot)
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

export interface AllDaysStore extends Instance<typeof AllDaysStoreModel> {}
export interface DayStoreSnapshotOut extends SnapshotOut<typeof AllDaysStoreModel> {}
export interface DayStoreSnapshotIn extends SnapshotIn<typeof AllDaysStoreModel> {}
export const createDayStoreDefaultModel = () => types.optional(AllDaysStoreModel, {})




