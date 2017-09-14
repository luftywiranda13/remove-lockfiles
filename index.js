'use strict';

const chalk = require('chalk');
const hasLockfile = require('has-lockfile');
const logSymbols = require('log-symbols');
const shell = require('shelljs');

shell.config.silent = true;

module.exports = () => {
  const log = console.log;
  const lockfile = hasLockfile();

  if (lockfile === null) {
    log(logSymbols.info, chalk.blue('No lockfile detected'));
  } else {
    shell.exec(`git rm --cached ${lockfile}`);
    shell.rm('-f', lockfile);

    log(logSymbols.success, chalk.green('Removed: ') + lockfile);
  }
};
