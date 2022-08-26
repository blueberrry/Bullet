// TODO: Put all moment date formatting utils in one utils file

import moment from "moment"

export const convertDateToYYYYMMDD = (date) => {
  const formattedDate = moment(date).format("YYYYMMDD")
  return formattedDate
}
