# remove-lockfiles

[![Package Version](https://img.shields.io/npm/v/remove-lockfiles.svg)](https://www.npmjs.com/package/remove-lockfiles)
[![Build Status: Linux](https://img.shields.io/travis/luftywiranda13/remove-lockfiles/master.svg)](https://travis-ci.org/luftywiranda13/remove-lockfiles)
[![Build Status: Windows](https://img.shields.io/appveyor/ci/luftywiranda13/remove-lockfiles/master.svg)](https://ci.appveyor.com/project/luftywiranda13/remove-lockfiles)
[![Coverage Status](https://img.shields.io/codecov/c/github/luftywiranda13/remove-lockfiles/master.svg)](https://codecov.io/gh/luftywiranda13/remove-lockfiles)
[![Downloads Status](https://img.shields.io/npm/dm/remove-lockfiles.svg)](https://npm-stat.com/charts.html?package=remove-lockfiles&from=2016-04-01)

Prevent committing lockfiles

## Why

* [Lockfiles are for apps, not for libraries/packages](https://github.com/sindresorhus/ama/issues/479#issuecomment-310661514)
* [Listing lockfiles in .gitignore is considered a bad approach](https://github.com/facebookincubator/create-react-app/pull/2014#issuecomment-300811661)
* _[Unstaging only](https://github.com/facebookincubator/create-react-app/pull/2700)_ will introduce new problems
* Not only unstage, but also remove any lockfiles
* No need to worry whether contributors are using `npm` or `yarn`
* If we specify `package-lock=false` in `.npmrc`, then what about in `.yarnrc`?
* Works on macOS, Linux, and Windows

## Installation

```sh
npm install --save remove-lockfiles
```

## Usage

```js
const removeLockfiles = require('remove-lockfiles');

removeLockfiles().then(lockfiles => {
  console.log('Removed:\n', lockfiles.join('\n'));
});
```

## API

### removeLockfiles([path])

Returns a promse of an array for deleted lockfiles

#### path

Type: `string`<br />
Default: `process.cwd()`

## Related

* [remove-lockfiles-cli](https://github.com/luftywiranda13/remove-lockfiles-cli) － CLI for this module
* [del-nm-cli](https://github.com/luftywiranda13/del-nm-cli) － Delete `node_modules` and lockfiles
* [has-lockfile](https://github.com/luftywiranda13/has-lockfile) － Detect lockfiles in the working directory

## License

MIT &copy; [Lufty Wiranda](https://www.luftywiranda.com)
