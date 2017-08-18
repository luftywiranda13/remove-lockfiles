'use strict';

const chalk = require('chalk');
const hasLockfile = require('has-lockfile');
const logSymbols = require('log-symbols');
const shell = require('shelljs');

shell.config.silent = true;

const remove = lockfile => shell.rm('-f', lockfile);
const unstage = lockfile => shell.exec(`git rm --cached ${lockfile}`);

module.exports = () => {
  const log = console.log;
  const lockfile = hasLockfile();

  if (lockfile !== null) {
    unstage(lockfile);
    remove(lockfile);

    log(logSymbols.success, chalk.green('Removed: ') + lockfile);
  } else {
    log(logSymbols.info, chalk.blue('No lockfile detected'));
  }
};
