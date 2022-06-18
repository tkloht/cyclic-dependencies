import fs from "fs/promises"

async function buildPackageGraph(workspacePackages) {
  const packages = await Promise.all(
    workspacePackages.map(async (packagePath) => {
      const file = await fs.readFile(packagePath)
      return JSON.parse(file.toString())
    })
  )

  const packageNames = packages.map((x) => x.name)
  let result = {}

  for (let name of packageNames) {
    result[name] = []
  }

  for (let p of packages) {
    const dependencies = Object.keys(p.dependencies || {}).filter((dependency) =>
      packageNames.includes(dependency)
    )
    const devDependencies = Object.keys(p.devDependencies || {}).filter((dependency) =>
      packageNames.includes(dependency)
    )
    result[p.name] = dependencies.concat(devDependencies)
  }

  return result
}

export default buildPackageGraph
