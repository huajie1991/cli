/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/lib/commands/query.js TAP global > should return expected linked node res 1`] = `
[
  {
    "name": "lorem",
    "version": "2.0.0",
    "_id": "lorem@2.0.0",
    "pkgid": "lorem@2.0.0",
    "location": "node_modules/lorem",
    "path": "{CWD}/test/lib/commands/tap-testdir-query-global/globalDir/lib/node_modules/lorem",
    "realpath": "{CWD}/test/lib/commands/tap-testdir-query-global/globalDir/lib/node_modules/lorem",
    "resolved": null,
    "isLink": false,
    "isWorkspace": false
  }
]
`

exports[`test/lib/commands/query.js TAP linked node > should return expected linked node res 1`] = `
[
  {
    "name": "a",
    "version": "1.0.0",
    "_id": "a@1.0.0",
    "pkgid": "a@1.0.0",
    "location": "a",
    "path": "{CWD}/test/lib/commands/tap-testdir-query-linked-node/a",
    "realpath": "{CWD}/test/lib/commands/tap-testdir-query-linked-node/a",
    "resolved": null,
    "isLink": false,
    "isWorkspace": false
  }
]
`

exports[`test/lib/commands/query.js TAP simple query > should return expected object 1`] = `
[
  {
    "name": "project",
    "dependencies": {
      "a": "^1.0.0",
      "b": "^1.0.0"
    },
    "pkgid": "project@",
    "location": "",
    "path": "{CWD}/test/lib/commands/tap-testdir-query-simple-query",
    "realpath": "{CWD}/test/lib/commands/tap-testdir-query-simple-query",
    "resolved": null,
    "isLink": false,
    "isWorkspace": false
  },
  {
    "pkgid": "a@",
    "location": "node_modules/a",
    "path": "{CWD}/test/lib/commands/tap-testdir-query-simple-query/node_modules/a",
    "realpath": "{CWD}/test/lib/commands/tap-testdir-query-simple-query/node_modules/a",
    "resolved": null,
    "isLink": false,
    "isWorkspace": false
  },
  {
    "pkgid": "b@",
    "location": "node_modules/b",
    "path": "{CWD}/test/lib/commands/tap-testdir-query-simple-query/node_modules/b",
    "realpath": "{CWD}/test/lib/commands/tap-testdir-query-simple-query/node_modules/b",
    "resolved": null,
    "isLink": false,
    "isWorkspace": false
  }
]
`

exports[`test/lib/commands/query.js TAP workspace query > should return expected workspace res 1`] = `
[
  {
    "name": "c",
    "version": "1.0.0",
    "_id": "c@1.0.0",
    "pkgid": "c@1.0.0",
    "location": "c",
    "path": "{CWD}/test/lib/commands/tap-testdir-query-workspace-query/c",
    "realpath": "{CWD}/test/lib/commands/tap-testdir-query-workspace-query/c",
    "resolved": null,
    "isLink": false,
    "isWorkspace": true
  }
]
`
