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

const removeLockfiles = (cwd = process.cwd()) => {
  const lockfiles = hasLockfile(cwd);

  return lockfiles.length === 0
    ? Promise.resolve(lockfiles)
    : remove(lockfiles, cwd);
};

module.exports = removeLockfiles;
