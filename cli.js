#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const logSymbols = require('log-symbols');
const meow = require('meow');

const removeLockfiles = require('./');

const cli = meow(`
  Usage
    $ remove-lockfiles [path|options]

  Options
    --shrinkwrap    Remove \`npm-shrinkwrap.json\`

  Examples
    $ remove-lockfiles
    $ remove-lockfiles foo
    $ remove-lockfiles ../bar
    $ remove-lockfiles --shrinkwrap
    $ remove-lockfiles --shrinkwrap foo
    $ remove-lockfiles --shrinkwrap ../bar
`);

removeLockfiles({ cwd: cli.input[0], shrinkwrap: cli.flags.shrinkwrap }).then(
  res => {
    const log = console.log;

    if (res.length === 0) {
      log(logSymbols.info, chalk.blue('No lockfile found'));
    } else {
      log(logSymbols.success, chalk.green('Removed:\n') + res.join('\n'));
    }
  }
);
