import initFixture from "./testutils/readFixture"
import findWorkspacePackages from "./src/findWorkspacePackages"
import buildPackageGraph from "./src/buildPackageGraph"
import findCycles from "./src/findCycles"

describe("pnpm findWorkspacePackages", () => {
  it("finds workspace packages when explicitly declared", async () => {
    initFixture("pnpm-default")
    const workspaces = await findWorkspacePackages()

    expect(workspaces).toStrictEqual(["example1/package.json", "example2/package.json"])
  })

  it("finds workspace packages declared with *", async () => {
    initFixture("pnpm-star")
    const workspaces = await findWorkspacePackages()

    expect(workspaces).toStrictEqual([
      "packages/example1/package.json",
      "packages/example2/package.json",
    ])
  })

  it("finds workspace packages declared with **", async () => {
    initFixture("pnpm-doublestar")
    const workspaces = await findWorkspacePackages()

    expect(workspaces.sort()).toStrictEqual(
      [
        "packages/backend/one/package.json",
        "packages/backend/two/package.json",
        "packages/frontend/one/package.json",
        "packages/frontend/two/package.json",
      ].sort()
    )
  })
})
