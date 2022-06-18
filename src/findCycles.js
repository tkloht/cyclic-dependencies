function findCycles(graph) {
  const cycles = []
  let queue = Object.keys(graph)
    .sort()
    .map((name) => ({ name, path: [] }))

  while (queue.length > 0) {
    const current = queue.shift()

    if (current.path.includes(current.name)) {
      cycles.push([...current.path, current.name])
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
