/**
 * * Date types
 */
// TODO: Unfortunate date types (31st Feb) will pass

// year dates
type d = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

// years 1900 - 2099
export type YYYY = `19${d}${d}` | `20${d}${d}`

// months 01 - 12
type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type MM = `0${oneToNine}` | `1${0 | 1 | 2}`

// days 01 - 31
export type DD = `${0}${oneToNine}` | `${1 | 2}${d}` | `3${0 | 1}`

// 20220901
export type YYYYMMDD = `${YYYY}${MM}${DD}`

// 2022-09-01

export type YYYYMMDDDashSeperator = `${YYYY}-${MM}-${DD}`
