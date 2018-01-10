#!/usr/bin/env node
'use strict';

const { blue, green } = require('chalk');
const { info, success } = require('log-symbols');
const meow = require('meow');

const removeLockfiles = require('./');

const cli = meow(`
  Usage
    $ remove-lockfiles [path]

  Examples
    $ remove-lockfiles
    $ remove-lockfiles foo
    $ remove-lockfiles ../bar
`);

removeLockfiles(cli.input[0]).then(res => {
  const log = console.log;

  if (res.length === 0) {
    log(info, blue('No lockfile found'));
  }

  if (res.length > 0) {
    log(success, green('Removed:\n') + res.join('\n'));
  }
});
