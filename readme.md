# remove-lockfiles

> Prevent committing lockfiles

[![npm](https://img.shields.io/npm/v/remove-lockfiles.svg?style=flat-square)](https://www.npmjs.com/package/remove-lockfiles)
[![npm](https://img.shields.io/npm/dt/remove-lockfiles.svg?style=flat-square)](https://npm-stat.com/charts.html?package=remove-lockfiles&from=2016-04-01)
[![Travis branch](https://img.shields.io/travis/luftywiranda13/remove-lockfiles/master.svg?style=flat-square)](https://travis-ci.org/luftywiranda13/remove-lockfiles)
[![Codecov branch](https://img.shields.io/codecov/c/github/luftywiranda13/remove-lockfiles/master.svg?style=flat-square)](https://codecov.io/github/luftywiranda13/remove-lockfiles)
<br />
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Code of Conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](./other/code_of_conduct.md)
[![Roadmap](https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square)](./other/roadmap.md)

## Why?

- [Lockfiles are for apps, not for libraries/packages](https://github.com/sindresorhus/ama/issues/479#issuecomment-310661514)
- [Listing lockfiles in `.gitignore` is considered a bad approach](https://github.com/facebookincubator/create-react-app/pull/2014#issuecomment-300811661)
- Not only unstage, but also remove any lockfiles
- *[Unstaging only](https://github.com/facebookincubator/create-react-app/pull/2700)* will introduce new problems
- No need to worry whether contributors are using `npm` or `yarn`
- No need to specify `package-lock=false` in `.npmrc`. How about in `.yarnrc`?
- A cross-platform solution. Works on macOS, Linux, and Windows

## Installation

Install [husky](https://github.com/typicode/husky) to make utilizing `git-hooks` easier:

```sh
npm install husky --save-dev
```

Then, install this package:

```sh 
npm install remove-lockfiles --save-dev 
```

## Usage

We need to run `remove-lockfiles` before committing. To do that, edit your `package.json` to include this configuration:

```js
{
  "scripts": {
    "precommit": "remove-lockfiles"
  }
}
```

From now on, lockfiles will never get committed into your project even if they're generated. `remove-lockfiles` will unstage and also remove any lockfiles before any commits.

> <strong>Tip:</strong> If you want to remove the *already committed* lockfiles:
>
> 1. Remove it from your repository by running `git rm package-lock.json/yarn.lock`
> 2. Then, run `git commit -am "remove lockfiles"`
> 3. Finally, use this package so lockfiles will never bother you again

## Contributors

Thanks goes to these people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/22868432?v=3" width="100px;"/><br /><sub>Lufty Wiranda</sub>](https://github.com/luftywiranda13)<br />[💻](https://github.com/luftywiranda13/remove-lockfiles/commits?author=luftywiranda13 "Code") [📖](https://github.com/luftywiranda13/remove-lockfiles/commits?author=luftywiranda13 "Documentation") [🚇](#infra-luftywiranda13 "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars1.githubusercontent.com/u/170270?v=4" width="100px;"/><br /><sub>Sindre Sorhus</sub>](https://sindresorhus.com)<br />[💬](#question-sindresorhus "Answering Questions") [🤔](#ideas-sindresorhus "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/810438?v=4" width="100px;"/><br /><sub>Dan Abramov</sub>](http://twitter.com/dan_abramov)<br />[💬](#question-gaearon "Answering Questions") [🤔](#ideas-gaearon "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/9636410?v=4" width="100px;"/><br /><sub>Ade Viankakrisna Fadlil</sub>](https://musify.id)<br />[💬](#question-viankakrisna "Answering Questions") [🤔](#ideas-viankakrisna "Ideas, Planning, & Feedback") | [<img src="https://avatars2.githubusercontent.com/u/364677?v=4" width="100px;"/><br /><sub>Jon Crenshaw</sub>](http://linkedin.com/in/jdcrensh)<br />[🤔](#ideas-jdcrensh "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Related

// TODO

## License

MIT &copy; [Lufty Wiranda](https://www.instagram.com/luftywiranda13/)
