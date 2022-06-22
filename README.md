# cyclic-dependencies

> Find cyclic dependencies in your yarn/npm workspaces.

## Usage example

In the root folder of a project using workspaces:

```
❯ npx cyclic-dependencies
Cyclic dependencies found in workspace:  [ 'app -> hello -> app' ]
```

To exit with a failure code:

```
npx cyclic-dependencies --reject
```

You can also use it in your own script:

```js
import findCyclicDependencies from "cyclic-dependencies"

const cycles = await findCyclicDependencies()
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
