#!/usr/bin/env node
'use strict';

const { blue, green } = require('chalk');
const { info, success } = require('log-symbols');
const meow = require('meow');

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

removeLockfiles({
  cwd: cli.input[0],
  shrinkwrap: cli.flags.shrinkwrap,
}).then(res => {
  const log = console.log;

  if (res.length === 0) {
    log(info, blue('No lockfile found'));
  }

  if (res.length > 0) {
    log(success, green('Removed:\n') + res.join('\n'));
  }
});
