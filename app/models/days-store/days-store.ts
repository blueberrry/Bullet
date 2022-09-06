import { destroy, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { withEnvironment } from "../extensions/with-environment"
import { Day, DayModel } from "../day/day"
import { DaysApi } from "../../services/api/days-api"
import { YYYYMMDD } from "../../types/types"
import { getLatestDate } from "../../utils/date-formatting"
import moment from "moment"

/**
 * All Days store
 */
export const DaysStoreModel = types
  .model("DaysStoreModel")
  .props({
    days: types.optional(types.array(DayModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get datesArray() {
      return self.days.map((day) => day.date)
    },
  }))
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
  }))
  .actions((self) => ({
    addNextDay: () => {
      let nextDate: string // TODO: type for string YYYYMMDD
      // If there is daily data, increment the next day date and add to array
      if (self.days.length > 0) {
        // Gets highest date and sets the nextDate as the subsequent day
        const highestDateString = getLatestDate(self.days)
        nextDate = moment(highestDateString).add(1, "days").format("YYYYMMDD")
      } else {
        // If there is no daily data, add today as date
        nextDate = moment().format("YYYYMMDD")
      }
      const id = uuidv4()
      const nextDay = DayModel.create({
        id,
        date: nextDate,
      })
      self.days.push(nextDay)
    },
    addSpecificDate: (date: YYYYMMDD) => {
      const id = uuidv4()
      const newDay = DayModel.create({
        id,
        date,
      })
      self.days.push(newDay)
    },
    removeDay: (item) => {
      destroy(item)
    },
    getDayById: (id) => {
      return self.days.find((day) => day.id === id)
    },
  }))

// getSpecificDaysidsByDayId
//

export interface DaysStore extends Instance<typeof DaysStoreModel> {}
export interface DaysStoreSnapshotOut extends SnapshotOut<typeof DaysStoreModel> {}
export interface DaysStoreSnapshotIn extends SnapshotIn<typeof DaysStoreModel> {}
export const createDayStoreDefaultModel = () => types.optional(DaysStoreModel, {})
