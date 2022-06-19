# workspace-cycles
> Find cyclic dependencies in your yarn/npm workspaces.

## Usage example

In the root folder of a project using workspaces:
```
❯ npx workspace-cycles
Cyclic dependencies found in workspace:  [ 'app -> hello -> app' ]
```

To exit with a failure code:
```
npx workspace-cycles --reject
```

You can also use it in your own script:
```js
import findWorkspaceCycles from 'workspace-cycles'

const cycles = await findWorkspaceCycles()
// [['app', 'hello', 'app']]
```
(These examples assume you have two packages `app` and `hello`, where `app` depends on `hello` and `hello` depends on `app`)


## Development setup
This project uses pnpm to manage dependencies.
At this time it has no build step.

To run tests with jest: `pnpm test`

## Limitations
- pnpm style workspaces are not yet supported.


## License
MIT







