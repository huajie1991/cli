---
title: Dependency Selector Syntax & Querying
section: 7
description: Dependency Selector Syntax & Querying
---

### Description

The `npm query` commmand exposes a new dependency selector syntax (informed by & respecting many aspects of the [CSS Selectors 4 Spec](https://dev.w3.org/csswg/selectors4/#relational)) which:

- Standardizes the shape of, & querying of, dependency graphs with a robust object model, metadata & selector syntax
- Leverages existing, known language syntax & operators from CSS to make disparate package information broadly accessible
- Unlocks the ability to answer complex, multi-faceted questions about dependencies, their relationships & associative metadata
- Consolidates redundant logic of similar query commands in `npm` (ex. `npm fund`, `npm ls`, `npm outdated`, `npm audit` ...)

### Dependency Selector Syntax `v1.0.0`

#### Overview:

- there is no "type" or "tag" selectors (ex. `div, h1, a`) as a dependency/target is the only type of `Node` that can be queried
- the term "dependencies" is in reference to any `Node` found in a `tree` returned by `Arborist`

#### Selectors

- `*` universal selector
- `#<name>` dependency selector (equivalent to `[name="..."]`)
- `#<name>@<version>` (equivalent to `[name=<name>]:semver(<version>)`)
- `,` selector list delimiter
- `.` class selector
- `:` pseudo class selector
- `>` direct decendent/child selector
- `~` sibling selector

#### Pseudo Selectors
- [`:not(<selector>)`](https://developer.mozilla.org/en-US/docs/Web/CSS/:not)
- [`:has(<selector>)`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- [`:is(<selector list>)`](https://developer.mozilla.org/en-US/docs/Web/CSS/:is)
- [`:root`](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) matches the root node/dependency
- [`:scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) matches node/dependency it was queried against
- [`:empty`](https://developer.mozilla.org/en-US/docs/Web/CSS/:empty) when a dependency has no dependencies
- [`:private`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#private) when a dependency is private
- `:link` when a dependency is linked
- `:deduped` when a dependency has been deduped
- `:override` when a dependency is an override
- `:extraneous` when a dependency exists but is not defined as a dependency of any node
- `:invalid` when a dependency version is out of its ancestors specified range
- `:missing` when a dependency is not found on disk
- `:semver(<spec>)` matching a valid [`node-semver`](https://github.com/npm/node-semver) spec
- `:path(<path>)` [glob](https://www.npmjs.com/package/glob) matching based on dependencies path relative to the project
- `:type(<type>)` [based on currently recognized types](https://github.com/npm/npm-package-arg#result-object)

#### [Attribute Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

The attribute selector evaluates the key/value pairs in `package.json` if they are `String`s.

- `[]` attribute selector (ie. existence of attribute)
- `[attribute=value]` attribute value is equivalant...
- `[attribute~=value]` attribute value contains word...
- `[attribute*=value]` attribute value contains string...
- `[attribute|=value]` attribute value is equal to or starts with...
- `[attribute^=value]` attribute value begins with...
- `[attribute$=value]` attribute value ends with...

#### `Array` & `Object` Attribute Selectors

The generic `:attr()` pseudo selector standardizes a pattern which can be used for attribute selection of `Object`s, `Array`s or `Arrays` of `Object`s accessible via `Arborist`'s `Node.package` metadata. This allows for iterative attribute selection beyond top-level `String` evaluation. The last argument passed to `:attr()` must be an `attribute` selector or a nested `:attr()`. See examples below:

#### `Objects`

```css
/* return dependencies that have a `scripts.test` containing `"tap"` */
*:attr(scripts, [test~=tap])
```

#### Nested  `Objects`

Nested objects are expressed as sequential arguments to `:attr()`.

```css
/* return dependencies that have a testling config for opera browsers */
*:attr(testling, browsers, [~=opera])
```

#### `Arrays`

`Array`s specifically uses a special/reserved `.` character in place of a typical attribute name. `Arrays` also support exact `value` matching when a `String` is passed to the selector.

##### Example of an `Array` Attribute Selection:
```css
/* removes the distinction between properties & arrays */
/* ie. we'd have to check the property & iterate to match selection */
*:attr([keywords^=react])
*:attr(contributors, :attr([name~=Jordan]))
```

##### Example of an `Array` matching directly to a value:
```css
/* return dependencies that have the exact keyword "react" */
/* this is equivalent to `*:keywords([value="react"])` */
*:attr([keywords=react])
```

##### Example of an `Array` of `Object`s:
```css
/* returns */
*:attr(contributors, [email=ruyadorno@github.com])
```

### Groups

Dependency groups are defined by the package relationships to their ancestors (ie. the dependency types that are defined in `package.json`). This approach is user-centric as the ecosystem has been taught to think about dependencies in these groups first-and-foremost. Dependencies are allowed to be apart of multiple groups (ex. a `workspace` may also be a `dev` dependency & may also be `bundled` - a selector for that type of dependency would look like: `*.workspace.dev.bundled`).

- `.prod`
- `.dev`
- `.optional`
- `.peer`
- `.bundled`
- `.workspace`

### Command

#### `npm query "<selector>"` (alias `q`)

#### Options:

- `query-output`
  - Default: `list` - a human-readable subset of dependency information
  - `json` - all data available

#### Example Response Output

- an array of dependency objects is returned which can contain multiple copies of the same package which may or may not have been linked or deduped

```json
[
  {
    "name": "",
    "version": "",
    "description": "",
    "homepage": "",
    "bugs": {},
    "author": {},
    "license": {},
    "funding": {},
    "files": [],
    "main": "",
    "browser": "",
    "bin": {},
    "man": [],
    "directories": {},
    "repository": {},
    "scripts": {},
    "config": {},
    "dependencies": {},
    "devDependencies": {},
    "optionalDependencies": {},
    "bundledDependencies": {},
    "peerDependencies": {},
    "peerDependenciesMeta": {},
    "engines": {},
    "os": [],
    "cpu": [],
    "workspaces": {},
    "keywords": [],
    ...
  },
  ...
```

### Usage

```bash
# get all workspace direct deps
npm query ":root > .workspace > *"
```

### Extended Use Cases & Queries

```stylus
// all deps
*

// all direct deps
:root > *

// direct production deps
:root > .prod

// direct development deps
:root > .dev

// any peer dep of a direct deps
:root > * > .peer

// any workspace dep
.workspace

// all workspaces that depend on another workspace
.workspace > .workspace

// all workspaces that have peer deps
.workspace:has(.peer)

// any dep named "lodash"
// equivalent to [name="lodash"]
#lodash

// any deps named "lodash" & within semver range ^"1.2.3"
#lodash@^1.2.3
// equivalent to...
[name="lodash"]:semver(^1.2.3)

// get the hoisted node for a given semver range
#lodash@^1.2.3:not(:deduped)

// querying deps with a specific version
#lodash@2.1.5
// equivalent to...
[name="lodash"][version="2.1.5"]

// has any deps
:has(*)

// deps with no other deps (ie. "leaf" nodes)
:empty

// manually querying git dependencies
[repository^=github:],
[repository^=git:],
[repository^=https://github.com],
[repository^=http://github.com],
[repository^=https://github.com],
[repository^=+git:...]

// querying for all git dependencies
:type(git)

// get production dependencies that aren't also dev deps
.prod:not(.dev)

// get dependencies with specific licenses
[license=MIT], [license=ISC]

// find all packages that have @ruyadorno as a contributor
:attr(contributors, [email=ruyadorno@github.com])
```

### Piping `npm query` to other commands

```bash
# find all dependencies with postinstall scripts & uninstall them
npm query ":attr(scripts, [postinstall])" | jq 'map(.name)|join("\n")' -r | xargs -I {} npm uninstall {}

# find all git dependencies & explain who requires them
npm query ":type(git)" | jq 'map(.name)' | xargs -I {} npm why {}
```

### Programmatic Usage

- `Arborist`'s `Node` Class will have a new `.querySelectorAll()` method
  - this method will return a filtered, flattened dependency Arborist `Node` list based on a valid query selector
- Introduce a new command, `npm query`, which will take a dependency selector & output a flattened dependency Node list (output is in `json` by default, but configurable)

```js
const Arborist = require('@npmcli/arborist')
const arb = new Arborist({})
```

```js
// root-level
arb.loadActual((tree) => {
  // query all production dependencies
  const results = await tree.querySelectorAll('.prod')
  console.log(results)
})
```

```js
// iterative
arb.loadActual((tree) => {
  // query for the deduped version of react
  const results = await tree.querySelectorAll('#react:not(:deduped)')
  // query the deduped react for git deps
  const deps = await results[0].querySelectorAll(':type(git)')
  console.log(deps)
})
```
