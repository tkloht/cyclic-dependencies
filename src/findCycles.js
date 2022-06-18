function findCycles(graph) {
  const cycles = []

  const first = Object.keys(graph).shift()
  const queue = [{name: first, path: []} ]

  while (queue.length > 0) {
    const current = queue.shift()

    if (current.path.includes(current.name)) {
      cycles.push([...current.path, current.name])
    } else {
      for (const name of graph[current.name]) {
        queue.unshift({name, path: [...current.path, current.name]})
      }
    }

  }


  return cycles
}


export default findCycles
