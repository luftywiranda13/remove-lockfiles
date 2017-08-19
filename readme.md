# remove-lockfiles

[![npm](https://img.shields.io/npm/v/remove-lockfiles.svg?style=flat-square)](https://www.npmjs.com/package/remove-lockfiles)
[![Travis branch](https://img.shields.io/travis/luftywiranda13/remove-lockfiles/master.svg?style=flat-square)](https://travis-ci.org/luftywiranda13/remove-lockfiles)
[![Codecov branch](https://img.shields.io/codecov/c/github/luftywiranda13/remove-lockfiles/master.svg?style=flat-square)](https://codecov.io/gh/luftywiranda13/remove-lockfiles)
[![npm](https://img.shields.io/npm/dm/remove-lockfiles.svg?style=flat-square)](https://npm-stat.com/charts.html?package=remove-lockfiles&from=2016-04-01)

Prevent committing lockfiles

## Why?

- [Lockfiles are for apps, not for libraries/packages](https://github.com/sindresorhus/ama/issues/479#issuecomment-310661514)
- [Listing lockfiles in .gitignore is considered a bad approach](https://github.com/facebookincubator/create-react-app/pull/2014#issuecomment-300811661)
- *[Unstaging only](https://github.com/facebookincubator/create-react-app/pull/2700)* will introduce new problems
- Not only unstage, but also remove any lockfiles
- No need to worry whether contributors are using `npm` or `yarn`
- If we specify `package-lock=false` in `.npmrc`, then what about in `.yarnrc`?
- Works on macOS, Linux, and Windows

## Installation

```sh
npm install remove-lockfiles --save-dev
```

## Usage

### Pre-commit hook

#### With [husky](https://github.com/typicode/husky)

Install `husky`:

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

#### With [pre-commit](https://github.com/observing/pre-commit)

Install `pre-commit`:

```sh
npm install pre-commit --save-dev
```

Edit `package.json` to include this configuration:

```js
{
  "scripts": {
    "remove-lockfiles": "remove-lockfiles",
  },
  "pre-commit": [
    "remove-lockfiles",
    // other tasks
  ]
}
```

### Standalone script

Please note that if we use `remove-lockfiles` as a standalone script, it will just unstage and remove the lockfiles but not prevent them to be committed.

Install `remove-lockfiles` globally:

```sh
npm install remove-lockfiles --global
```

Run the script inside the root directory of a Node.js project:

```sh
remove-lockfiles
```

## Related

- [husky](https://github.com/typicode/husky) － Git hooks made easy
- [pre-commit](https://github.com/observing/pre-commit) － Automatically install pre-commit hooks for your npm modules
- [shelljs](https://github.com/shelljs/shelljs) － Cross-platform Unix shell commands for Node.js
- [lint-staged](https://github.com/okonet/lint-staged) － Run linters on git staged files
- [has-lockfile](https://github.com/luftywiranda13/has-lockfile) － Check which lockfile is present in the working directory

## Contributors

Thanks goes to these people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/22868432?v=3" width="100px;"/><br /><sub>Lufty Wiranda</sub>](https://github.com/luftywiranda13)<br />[💻](https://github.com/luftywiranda13/remove-lockfiles/commits?author=luftywiranda13 "Code") [📖](https://github.com/luftywiranda13/remove-lockfiles/commits?author=luftywiranda13 "Documentation") [🚇](#infra-luftywiranda13 "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars1.githubusercontent.com/u/170270?v=4" width="100px;"/><br /><sub>Sindre Sorhus</sub>](https://sindresorhus.com)<br />[💬](#question-sindresorhus "Answering Questions") [🤔](#ideas-sindresorhus "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/810438?v=4" width="100px;"/><br /><sub>Dan Abramov</sub>](http://twitter.com/dan_abramov)<br />[💬](#question-gaearon "Answering Questions") [🤔](#ideas-gaearon "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/9636410?v=4" width="100px;"/><br /><sub>Ade Viankakrisna Fadlil</sub>](https://musify.id)<br />[💬](#question-viankakrisna "Answering Questions") [🤔](#ideas-viankakrisna "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/364677?v=4" width="100px;"/><br /><sub>Jon Crenshaw</sub>](http://linkedin.com/in/jdcrensh)<br />[🤔](#ideas-jdcrensh "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT &copy; [Lufty Wiranda](https://www.instagram.com/luftywiranda13/)
