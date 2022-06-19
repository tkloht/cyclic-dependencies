#!/usr/bin/env node

import findWorkspaceCycles from "../src/index.js"

async function run() {
  try {
    const cycles = await findWorkspaceCycles()

    if (cycles.length > 0) {
      console.log(
        "Cyclic dependencies found in workspace: ",
        cycles.map((packages) => packages.join(" -> "))
      )
    } else {
      console.log("No cyclic dependencies found in workspace")
    }
  } catch (error) {
    console.error("ERROR: ", error.message)
  }
}

run()
