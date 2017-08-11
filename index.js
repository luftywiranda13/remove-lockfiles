'use strict';

const chalk = require('chalk');
const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

shell.config.silent = true;

const remove = lockfile => shell.rm('-f', lockfile);
const unstage = lockfile => shell.exec(`git reset HEAD ${lockfile}`);

module.exports = () => {
  const log = console.log;
  const lockfile = hasLockfile();

  if (lockfile !== null) {
    try {
      unstage(lockfile);
      remove(lockfile);
    } catch (e) {
      log(chalk.red(e));
      process.exit(1);
    }
    log(chalk.green('Unstaged + removed: ') + lockfile);
  } else {
    log(chalk.blue('No lockfile detected'));
  }
};
