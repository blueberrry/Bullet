// TODO: types
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
