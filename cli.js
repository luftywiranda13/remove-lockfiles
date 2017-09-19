#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const logSymbols = require('log-symbols');
const meow = require('meow');

const removeLockfiles = require('./');

const cli = meow(`
  Usage
    $ remove-lockfiles <path>

  Examples
    $ remove-lockfiles
    $ remove-lockfiles foo
    $ remove-lockfiles ../bar
`);

removeLockfiles(cli.input[0]).then(res => {
  const log = console.log;

  if (res.length === 0) {
    log(logSymbols.info, chalk.blue('No lockfile found'));
  } else {
    log(logSymbols.success, chalk.green('Removed: ') + res.join(' & '));
  }
});
