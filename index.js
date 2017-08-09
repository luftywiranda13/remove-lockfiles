'use strict';

const findUp = require('find-up');
const shell = require('shelljs');

shell.config.silent = true;

function remove(filepath) {
  shell.rm('-f', filepath);
}

function unstage(filepath) {
  shell.exec(`git reset HEAD ${filepath}`, { silent: true });
}

module.exports = () => {
  const lockfile = findUp.sync(['package-lock.json', 'yarn.lock']);

  unstage(lockfile);
  remove(lockfile);
};
