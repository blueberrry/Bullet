export const useGetEntriesByStatus = (entries) => {
  // TODO: Union type
  // TODO: Should this all be in a useEffect ?
  const todos = entries.filter((entry) => entry.status === "todo")
  const todosTotal = todos.length

  const done = entries.filter((entry) => entry.status === "done")
  const doneTotal = done.length

  const allTodosTotal = todosTotal + doneTotal

  const percentageTodosCompleted = allTodosTotal > 0 ? (doneTotal / allTodosTotal) * 100 : 0

  const notes = entries.filter((entry) => entry.status === "note")
  const notesTotal = notes.length

  const inspirationalIdeas = entries.filter((entry) => entry.status === "inspirationalIdeas")
  const inspirationalIdeasTotal = inspirationalIdeas.length

  return {
    todos,
    todosTotal,
    done,
    doneTotal,
    allTodosTotal,
    percentageTodosCompleted: Math.round(percentageTodosCompleted),
    notes,
    notesTotal,
    inspirationalIdeas,
    inspirationalIdeasTotal,
  }
}
