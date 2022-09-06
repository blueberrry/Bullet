import { getEntriesForSelectedDateSpan } from "../utils/configure-entries"
import { useGetEntriesByMigrated } from "./useGetEntriesByMigrated"
import { useGetEntriesByStatus } from "./useGetEntriesByStatus"

export const useEntriesForDate = (dateEntries, allEntries) => {
  const entriesForThisDateWithDetails = getEntriesForSelectedDateSpan(dateEntries, allEntries) // TODO: usememo

  const { entriesNotMigrated, entriesMigrated, entriesMigratedTotal } = useGetEntriesByMigrated(
    entriesForThisDateWithDetails,
  )

  const {
    todos,
    todosTotal,
    done,
    doneTotal,
    allTodosTotal,
    percentageTodosCompleted,
    notes,
    notesTotal,
    inspirationalIdeas,
    inspirationalIdeasTotal,
  } = useGetEntriesByStatus(entriesNotMigrated)

  return {
    entriesForThisDateWithDetails,
    entriesNotMigrated,
    entriesMigrated,
    entriesMigratedTotal,
    todos,
    todosTotal,
    done,
    doneTotal,
    allTodosTotal,
    percentageTodosCompleted,
    notes,
    notesTotal,
    inspirationalIdeas,
    inspirationalIdeasTotal,
  }
}

// TODO: This should probably be store logic, perhaps entriesDetails should create new bullet-entries-store instance
//       but also need the extra date - can we run store methods for entry details AND bullet entries after merging data like this?
//       eg item.changeText & item.changeMigrated
