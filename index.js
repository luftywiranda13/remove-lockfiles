'use strict';

const findUp = require('find-up');
const shell = require('shelljs');

shell.config.silent = true;

const remove = filepath => shell.rm('-f', filepath);
const unstage = filepath => shell.exec(`git reset HEAD ${filepath}`);

module.exports = () => {
  const lockfile = findUp.sync(['package-lock.json', 'yarn.lock']);

  unstage(lockfile);
  remove(lockfile);
};
