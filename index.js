'use strict';

const shell = require('shelljs');

const exec = shell.exec;
const rm = shell.rm;

function remove(files) {
  rm('-f', files);
}

function unstage(files) {
  for (let i = 0; i < files.length; i++) {
    exec(`git reset HEAD ${files[i]}`, { silent: true });
  }
}

module.exports = () => {
  const lockfiles = ['package-lock.json', 'yarn.lock'];

  unstage(lockfiles);
  remove(lockfiles);
};
