// TODO: This will work but not utilising mobx state tree properly

export const getEntriesForSelectedDateSpan = (allBulletEntries, entriesForThisDate) => {
  if (allBulletEntries.length > 0 && entriesForThisDate.length > 0) {
    return entriesForThisDate.map((entryForThisDate) => {
      const matchedEntry = allBulletEntries.find((entry) => entry.id === entryForThisDate.entryId)
      if (matchedEntry) {
        return { ...matchedEntry, ...entryForThisDate }
      }
      return entryForThisDate
    })
  }
  console.tron.warn("no bullet entries or no daily/weekly/monthly entries")
  return []
}

// Get this day data from ALL_DAYS (ALL_DAYS_INITIAL_DATA[0])
export const getThisDay = (dayId, allDays) => {
  let thisDay = {} // TODO: types
  if (allDays.length > 0) {
    thisDay = allDays.find((day) => day.dayId === dayId)
  }
  return thisDay
}

// Get the current day's entry IDs as an array (ALL_DAYS_INITIAL_DATA[0].dailyEntries)
export const getThisDaysEntryIds = (thisDay) => {
  let dayIdsArray = []
  dayIdsArray = thisDay.items.map((item) => item.entryID)
  return dayIdsArray
}

// Create a new array by filtering ALL_ENTRIES with current days ids
export const getEntriesDromDayIds = (allBulletEntries, thisDaysEntryIds) => {
  const dailyEntries = allBulletEntries.filter((entry, index) => {
    if (thisDaysEntryIds.includes(entry.id)) {
      return entry
    }
  })

  return dailyEntries
}

// Day specific data such as migrated and order now should be merged to build out the rows with all the data needed for each item
// types Array<All_ENTRIES with entry migrated and order state>
export const mergeBulletEntriesDataWithDailyData = (
  bulletEntriesForThisDay,
  thisDaysSpecificData,
) => {
  let newData = []

  if (bulletEntriesForThisDay > 0 && thisDaysSpecificData > 0) {
    newData = bulletEntriesForThisDay.map((entry) => {
      const { migrated, order } = thisDaysSpecificData.find(
        (daySpecificEntry) => daySpecificEntry.entryID === entry.ID,
      )
      return { ...entry, migrated, order }
    })
    return newData
  }
  return newData
}

// if this items dayPriorityRanking is null then something has gone wrong 🤯, it shouldn't because each item should only update
// on user action (adding/removing/editing)
// but never feat 🦸‍♂️ >> if null then lets just assign it an order ranking based on the timestamp it was created!
// but oh no! 🤯 >> we will have to update the ALL_DAYS store AND the local state data!
//  if we only update the ALL_DAYS data, and did the filter/find/sort in the component, then we would get the correct data
//   🤔 What if we update local state first

// only needed if dayPriority is null
export const sortEntriesByOldest = (entries) => {
  return entries.sort(function (a, b) {
    return a.dateCreated - b.dateCreated
  })
}

// only needed if dayPriority is null
export const addRankingAfterSort = (entriesOldToNew) => {
  let entriesWithRankings = [] // TODO: Initialise type DailyEntrieEditRankingArray[]
  if (entriesOldToNew.length > 0) {
    entriesWithRankings = entriesOldToNew.forEach((entry, index) => ({
      ...entry,
      dayPriorityRanking: index + 1,
    })) // !important naughty naughty index 😉
  }
  return entriesWithRankings
}
