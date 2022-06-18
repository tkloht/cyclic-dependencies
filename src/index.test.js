import initFixture from "./testutils/readFixture"
import findWorkspacePackages from "./findWorkspacePackages"
import buildPackageGraph from "./buildPackageGraph"
import findCycles from "./findCycles"

describe("findWorkspacePackages", () => {
  it("finds workspace packages when explicitly declared", async () => {
    initFixture("default")
    const workspaces = await findWorkspacePackages()

    expect(workspaces).toStrictEqual(["example1/package.json", "example2/package.json"])
  })

  it("finds workspace packages declared with *", async () => {
    initFixture("star")
    const workspaces = await findWorkspacePackages()

    expect(workspaces).toStrictEqual([
      "packages/example1/package.json",
      "packages/example2/package.json",
    ])
  })

  it("finds workspace packages declared with **", async () => {
    initFixture("doublestar")
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

  it("excludes node_modules", async () => {
    initFixture("exclude-node-modules")
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

  it("throws error if workspace definition is missing", async () => {
    initFixture("missing-workspace")
    await expect(findWorkspacePackages()).rejects.toEqual(Error("Missing workspace definition"))
  })

  it("throws error if no package", async () => {
    initFixture("missing-root-package")
    await expect(findWorkspacePackages()).rejects.toEqual(
      Error("Missing package.json in working directory")
    )
  })
})

describe("buildPackageGraph", () => {
  it("returns adjacency list of workspace packages", async () => {
    initFixture("default")
    const workspaces = await findWorkspacePackages()
    const graph = await buildPackageGraph(workspaces)

    expect(graph).toEqual({ example1: ["example2"], example2: [] })
  })
})

describe("findCycles", () => {
  it("returns none if no cycle", async () => {
    initFixture("default")
    const workspaces = await findWorkspacePackages()
    const graph = await buildPackageGraph(workspaces)
    const cycles = await findCycles(graph)

    expect(cycles).toStrictEqual([])
  })

  it("finds a direct cycle", async () => {
    initFixture("cycle")
    const workspaces = await findWorkspacePackages()
    const graph = await buildPackageGraph(workspaces)
    const cycles = await findCycles(graph)

    expect(cycles).toStrictEqual([["example1", "example2", "example1"]])
  })

  it.todo("finds larger cycle")
  it.todo("finds multiple cycles")
})
