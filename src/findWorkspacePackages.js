import { globby } from 'globby'

import fs from 'fs/promises'
import path from 'path'

async function readWorkspaces() {

  const  rootPackage = await fs.readFile('./package.json')
  const {workspaces} = JSON.parse(rootPackage.toString())

  const workspacePackages = await globby(
    workspaces.map(x => path.join(x, 'package.json')),
    { gitignore: true }
  )

  return workspacePackages
}

export default readWorkspaces
