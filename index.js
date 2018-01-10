'use strict';

const del = require('del');
const execa = require('execa');
const hasLockfile = require('has-lockfile');

const remove = (files, cwd) => {
  return execa('git', ['rm', '-f'].concat(files), {
    cwd,
    reject: false,
  })
    .then(() => del(files, { cwd }))
    .then(() => files);
};

const removeLockfiles = ({ cwd = process.cwd(), shrinkwrap = false } = {}) => {
  const lockfiles = shrinkwrap
    ? hasLockfile(cwd)
    : hasLockfile(cwd).filter(lockfile => lockfile !== 'npm-shrinkwrap.json');

  return lockfiles.length === 0
    ? Promise.resolve(lockfiles)
    : remove(lockfiles, cwd);
};

module.exports = removeLockfiles;
