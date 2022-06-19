import findWorkspacePackages from "./findWorkspacePackages.js"
import buildPackageGraph from "./buildPackageGraph.js"
import findCycles from "./findCycles.js"

async function findWorkspaceCycles() {
  const workspaces = await findWorkspacePackages()
  const graph = await buildPackageGraph(workspaces)

  const cycles = await findCycles(graph)
  return cycles
}

export default findWorkspaceCycles
