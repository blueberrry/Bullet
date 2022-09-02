import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { BulletEntryApi } from "../../services/api/bullet-entry-api"
import { withEnvironment } from "../extensions/with-environment"
import { Day, DayModel } from "../day/day"
import { DaysApi } from "../../services/api/days-api"
import { INITIAL_ALL_DAYS } from "../initial-data/initial-data"
import { YYYYMMDD } from "../../types/types"

/**
 * All Days store
 */
export const DaysStoreModel = types
  .model("DaysStoreModel")
  .props({
    days: types.optional(types.array(DayModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveDays: (daySnapshot: Day[]) => {
      // TODO: In CharacterModel this is DayStoreSnapshotOut
      self.days.replace(daySnapshot)
    },
  }))
  .actions((self) => ({
    getDays: async () => {
      const daysApi = new DaysApi(self.environment.api)
      const result = await daysApi.getDays()

      if (result.kind === "ok") {
        self.saveDays(result.days)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getDaysTest: () => {
      // Here we are saying that if we have no data/initial data only, we should save our hard coded initial entries for testing

      if (self.days.length < 3) {
        self.days.replace(INITIAL_ALL_DAYS.results)
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
      self.days.push(nextDay)
    },
    getSpecificDayById: (id) => {
      return self.days.find((day) => day.id === id)
    },
  }))

// getSpecificDaysidsByDayId
//

export interface DaysStore extends Instance<typeof DaysStoreModel> {}
export interface DaysStoreSnapshotOut extends SnapshotOut<typeof DaysStoreModel> {}
export interface DaysStoreSnapshotIn extends SnapshotIn<typeof DaysStoreModel> {}
export const createDayStoreDefaultModel = () => types.optional(DaysStoreModel, {})
