import initFixture from './testutils/readFixture'
import findWorkspacePackages from './findWorkspacePackages'

describe("find workspace packages", () => {
  it("finds workspace packages when explicitly declared", async () => {
    initFixture('default')
    const workspaces = await findWorkspacePackages()

    expect(workspaces).toStrictEqual(['example1/package.json', 'example2/package.json'])
  })

  it("finds workspace packages declared with *", async () => {
    initFixture('star')
    const workspaces = await findWorkspacePackages()

    expect(workspaces).toStrictEqual([
      'packages/example1/package.json',
      'packages/example2/package.json'
    ])
  })

  it("finds workspace packages declared with **", async () => {
    initFixture('doublestar')
    const workspaces = await findWorkspacePackages()

    expect(workspaces.sort()).toStrictEqual([
      'packages/backend/one/package.json',
      'packages/backend/two/package.json',
      'packages/frontend/one/package.json',
      'packages/frontend/two/package.json',
    ].sort())
  })


  it("excludes node_modules", async () => {
    initFixture('exclude-node-modules')
    const workspaces = await findWorkspacePackages()

    expect(workspaces.sort()).toStrictEqual([
      'packages/backend/one/package.json',
      'packages/backend/two/package.json',
      'packages/frontend/one/package.json',
      'packages/frontend/two/package.json',
    ].sort())
  })

  it("throws error if workspace definition is missing", async () => {
    initFixture('missing-workspace')
    await expect(findWorkspacePackages()).rejects.toEqual(Error("Missing workspace definition"))
  })

  it("throws error if no package", async () => {
    initFixture('missing-root-package')
    await expect(findWorkspacePackages()).rejects.toEqual(Error("Missing package.json in working directory"))
  })
})