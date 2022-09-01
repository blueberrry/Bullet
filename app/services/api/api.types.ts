import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { BulletEntry } from "../../models/bullet-entry/bullet-entry"
import { Day } from "../../models/day/day"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetBulletEntriesResult =
  | { kind: "ok"; bulletEntries: BulletEntry[] }
  | GeneralApiProblem

export type GetBulletEntryResult = { kind: "ok"; bulletEntry: BulletEntry } | GeneralApiProblem

export type GetAllDaysResult = { kind: "ok"; allDays: Day[] } | GeneralApiProblem

export type GetDayResult = { kind: "ok"; day: Day } | GeneralApiProblem
