'use strict';

const del = require('del');
const execa = require('execa');
const hasLockfile = require('has-lockfile');

const removeLockfiles = path => {
  path = path || process.cwd();

  const lockfiles = hasLockfile(path);

  if (lockfiles.length !== 0) {
    return execa('git', ['rm', '-f', lockfiles.join(' ')], {
      cwd: path,
      reject: false,
    })
      .then(() => del(lockfiles, { cwd: path }))
      .then(() => lockfiles);
  }

  return Promise.resolve(lockfiles);
};

module.exports = removeLockfiles;
