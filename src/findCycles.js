function findCycles(graph) {
  const cycles = []
  let queue = Object.keys(graph)
    .sort()
    .map((name) => ({ name, path: [] }))

  while (queue.length > 0) {
    const current = queue.shift()

    const index = current.path.indexOf(current.name)
    if (index > -1) {
      cycles.push([...current.path.slice(index), current.name])
    } else {
      for (const name of graph[current.name]) {
        queue = queue.filter((x) => x.name === current.name)
        queue.unshift({ name, path: [...current.path, current.name] })
      }
    }
  }

  return cycles
}

export default findCycles
