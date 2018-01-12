#!/usr/bin/env node
'use strict';

const { blue, green } = require('chalk');
const { info, success } = require('log-symbols');
const meow = require('meow');
const updateNotifier = require('update-notifier');

const removeLockfiles = require('./');

const cli = meow(
  `
  Usage
    $ remove-lockfiles [path|options]

  Options
    --shrinkwrap    Include \`npm-shrinkwrap.json\` in removal

  Examples
    $ remove-lockfiles
    $ remove-lockfiles ../foo
    $ remove-lockfiles --shrinkwrap
    $ remove-lockfiles --shrinkwrap ../foo
`,
  {
    flags: {
      shrinkwrap: {
        type: 'boolean',
      },
    },
  }
);

updateNotifier({ pkg: cli.pkg }).notify();

removeLockfiles({
  cwd: cli.input[0],
  shrinkwrap: cli.flags.shrinkwrap,
}).then(res => {
  const log = console.log;

  switch (res.length) {
    case 0:
      log(info, blue('No lockfile found'));
      break;
    case 1:
      log(success, green('Removed: ') + res);
      break;
    default:
      log(success, green('Removed:\n') + res.join('\n'));
      break;
  }
});
