import { globby } from "globby"

import fs from "fs/promises"
import path from "path"
import yaml from "js-yaml"

async function readWorkspaces() {
  try {
    await fs.access("./package.json")
  } catch (error) {
    throw new Error("Missing package.json in working directory")
  }

  const rootPackage = await fs.readFile("./package.json", "utf8")
  let { workspaces } = JSON.parse(rootPackage)

  if (!workspaces) {
    try {
      const pnpmWorkspaceFile = await fs.readFile("./pnpm-workspace.yaml", "utf8")
      const pnpmWorkspaceDefinition = yaml.load(pnpmWorkspaceFile)
      workspaces = pnpmWorkspaceDefinition.packages
    } catch (e) {
      throw new Error("Missing workspace definition")
    }
  }

  const workspacePackages = await globby(
    workspaces.map((x) => path.join(x, "package.json")),
    { gitignore: true }
  )

  return workspacePackages
}

export default readWorkspaces
