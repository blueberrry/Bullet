export const useGetEntriesByStatus = (entries) => {
  // TODO: Union type
  // TODO: Should this all be in a useEffect ?
  const todos = entries.filter((entry) => entry.status === "todo")
  const todosTotal = todos.length

  const completed = entries.filter((entry) => entry.status === "completed")
  const completedTotal = completed.length

  const allTodosTotal = todosTotal + completedTotal

  const percentageTodosCompleted = allTodosTotal > 0 ? (completedTotal / allTodosTotal) * 100 : 0

  const notes = entries.filter((entry) => entry.status === "notes")
  const notesTotal = notes.length

  const inspirationalIdeas = entries.filter((entry) => entry.status === "inspirationalIdeas")
  const inspirationalIdeasTotal = inspirationalIdeas.length

  return {
    todos,
    todosTotal,
    completed,
    completedTotal,
    allTodosTotal,
    percentageTodosCompleted: Math.round(percentageTodosCompleted),
    notes,
    notesTotal,
    inspirationalIdeas,
    inspirationalIdeasTotal,
  }
}
