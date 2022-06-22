#!/usr/bin/env node

import findWorkspaceCycles from "../src/index.js"

async function run() {
  const args = process.argv.slice(2)
  try {
    const cycles = await findWorkspaceCycles()

    if (cycles.length > 0) {
      console.log(
        "Cyclic dependencies found in workspace: ",
        cycles.map((packages) => packages.join(" -> "))
      )
      if (args.includes("--reject")) {
        process.exit(1)
      }
    } else {
      console.log("No cyclic dependencies found in workspace")
    }
  } catch (error) {
    console.error("ERROR: ", error.message)
  }
}

run()
