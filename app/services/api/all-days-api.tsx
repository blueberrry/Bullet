import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetAllDaysResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class AllDaysApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getAllDaysEntries(): Promise<GetAllDaysResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://run.mocky.io/v3/09a5471c-684a-4e6e-83e6-09404e7b2cbf",
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      debugger
      const allDays = response.data.results

      return { kind: "ok", allDays }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
