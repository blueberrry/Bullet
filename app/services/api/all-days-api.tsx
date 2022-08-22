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
        "https://run.mocky.io/v3/cb213d73-7c35-4c65-b4a6-abbf8b9ff254",
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const allDays = response.data.results

      return { kind: "ok", allDays }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
