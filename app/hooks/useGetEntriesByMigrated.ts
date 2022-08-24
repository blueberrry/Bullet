export const useGetEntriesByMigrated = (entries) => {
  const entriesNotMigrated = entries.filter((entry) => entry.migrated === false)
  const entriesMigrated = entries.filter((entry) => entry.migrated === true)
  const entriesMigratedTotal = entriesMigrated.length

  return {
    entriesNotMigrated,
    entriesMigrated,
    entriesMigratedTotal,
  }
}
