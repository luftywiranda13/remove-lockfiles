'use strict';

const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

shell.config.silent = true;

module.exports = () => {
  const lockfile = hasLockfile();

  if (lockfile !== null) {
    shell.exec(`git rm --cached ${lockfile}`);
    shell.rm('-f', lockfile);

    return lockfile;
  }

  return lockfile;
};
