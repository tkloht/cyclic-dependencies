/* DFS with node coloring
 * white: unvisited
 * gray: currently visiting this node and its children
 * black: already visited this node and all children
 * if we investigate edge to gray node, it is a back edge -> cycle
 */

function findCycles(graph) {
  let queue = Object.keys(graph)
    .sort()
    .map((name) => ({ name, path: [] }))

  const nodes = Object.keys(graph).sort()
  const colors = nodes.reduce((acc, current) => ({ ...acc, [current]: "white" }), {})
  let cycles = []

  function visit(name, path = []) {
    colors[name] = "gray"
    const neighbours = graph[name]
    for (const neighbour of neighbours) {
      const color = colors[neighbour]
      if (color === "white") {
        visit(neighbour, [...path, name])
      } else if (color === "gray") {
        const index = path.indexOf(neighbour)
        cycles.push([...path.slice(index), name, neighbour])
      }
    }
    colors[name] = "black"
  }

  while (nodes.some((x) => colors[x] === "white")) {
    const whiteNode = nodes.find((x) => colors[x] === "white")
    visit(whiteNode)
  }

  return cycles
}

export default findCycles
