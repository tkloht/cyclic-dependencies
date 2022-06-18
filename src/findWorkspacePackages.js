import { globby } from 'globby'

import fs from 'fs/promises'
import path from 'path'

async function readWorkspaces() {

  try {
    await fs.access('./package.json')
  } catch (error) {
    throw new Error("Missing package.json in working directory")
  }

  const  rootPackage = await fs.readFile('./package.json')
  const {workspaces} = JSON.parse(rootPackage.toString())

  if (!workspaces) {
    throw new Error("Missing workspace definition")
  }

  const workspacePackages = await globby(
    workspaces.map(x => path.join(x, 'package.json')),
    { gitignore: true }
  )

  return workspacePackages
}

export default readWorkspaces
