# remove-lockfiles

[![Package Version](https://img.shields.io/npm/v/remove-lockfiles.svg)](https://www.npmjs.com/package/remove-lockfiles)
[![Build Status: Linux](https://img.shields.io/travis/luftywiranda13/remove-lockfiles/master.svg)](https://travis-ci.org/luftywiranda13/remove-lockfiles)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/rx84a6lgs5eb3h0m/branch/master?svg=true)](https://ci.appveyor.com/project/luftywiranda13/remove-lockfiles/branch/master)
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
npm install --save-dev remove-lockfiles
```

## Usage

### Pre-commit hook

Install [husky](https://github.com/typicode/husky):

```sh
npm install husky --save-dev
```

Edit `package.json` to include this configuration:

```js
{
  "scripts": {
    "precommit": "remove-lockfiles"
  }
}
```

Looking for alternative to `husky`? We can also use `remove-lockfiles` with [pre-commit](https://github.com/observing/pre-commit).

### Standalone CLI

Please note that using `remove-lockfiles` as a standalone script will only unstage and remove the lockfiles, it won't prevent them to be committed.

Install `remove-lockfiles` globally:

```sh
npm install remove-lockfiles --global
```

Run the script:

```sh
$ remove-lockfiles --help

  Usage
    $ remove-lockfiles [path]

  Examples
    $ remove-lockfiles
    $ remove-lockfiles foo
    $ remove-lockfiles ../bar
```

## Related

* [del-nm-cli](https://github.com/luftywiranda13/del-nm-cli) － Delete `node_modules` and lockfiles
* [has-lockfile](https://github.com/luftywiranda13/has-lockfile) － Detect lockfiles in the working directory
* [lint-staged](https://github.com/okonet/lint-staged) － Run linters on git staged files

## Contributors

Thanks goes to these people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/22868432?v=3" width="100px;"/><br /><sub><b>Lufty Wiranda</b></sub>](https://github.com/luftywiranda13)<br />[💻](https://github.com/luftywiranda13/remove-lockfiles/commits?author=luftywiranda13 "Code") [📖](https://github.com/luftywiranda13/remove-lockfiles/commits?author=luftywiranda13 "Documentation") [🚇](#infra-luftywiranda13 "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars1.githubusercontent.com/u/170270?v=4" width="100px;"/><br /><sub><b>Sindre Sorhus</b></sub>](https://sindresorhus.com)<br />[💬](#question-sindresorhus "Answering Questions") [🤔](#ideas-sindresorhus "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/810438?v=4" width="100px;"/><br /><sub><b>Dan Abramov</b></sub>](http://twitter.com/dan_abramov)<br />[💬](#question-gaearon "Answering Questions") [🤔](#ideas-gaearon "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/9636410?v=4" width="100px;"/><br /><sub><b>Ade Viankakrisna Fadlil</b></sub>](https://musify.id)<br />[💬](#question-viankakrisna "Answering Questions") [🤔](#ideas-viankakrisna "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/364677?v=4" width="100px;"/><br /><sub><b>Jon Crenshaw</b></sub>](http://linkedin.com/in/jdcrensh)<br />[🤔](#ideas-jdcrensh "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT &copy; [Lufty Wiranda](https://www.luftywiranda.com)
