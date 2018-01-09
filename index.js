'use strict';

const path = require('path');
const del = require('del');
const execa = require('execa');
const hasLockfile = require('has-lockfile');

const forceGitRemove = (lockfiles, cwd) => {
  return execa('git', ['rm', '-f', lockfiles.join(' ')], {
    cwd,
    reject: false,
  });
};

const removeLockfiles = (cwd = process.cwd()) => {
  const lockfiles = hasLockfile(cwd);

  return lockfiles.length > 0
    ? forceGitRemove(lockfiles, cwd)
        .then(() => del(lockfiles, { cwd }))
        .then(deletedPaths => {
          return deletedPaths.map(deletedPath => path.basename(deletedPath));
        })
    : Promise.resolve(lockfiles);
};

module.exports = removeLockfiles;
