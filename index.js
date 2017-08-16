'use strict';

const chalk = require('chalk');
const hasLockfile = require('has-lockfile');
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

    log(chalk.green('Unstaged + removed: ') + lockfile);
  } else {
    log(chalk.blue('No lockfile detected'));
  }
};
