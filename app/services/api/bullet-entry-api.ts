import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetBulletEntriesResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class BulletEntryApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getBulletEntries(): Promise<GetBulletEntriesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://run.mocky.io/v3/a9104caf-9bf3-4796-a3a7-59ea93aaf0c0",
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const bulletEntries = response.data.results

      return { kind: "ok", bulletEntries }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}

