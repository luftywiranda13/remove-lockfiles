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

const removeLockfiles = ({ cwd = process.cwd(), shrinkwrap = false } = {}) => {
  const tobeRemoved = hasLockfile(cwd).filter(
    lockfile => (shrinkwrap ? lockfile : lockfile !== 'npm-shrinkwrap.json')
  );

  return tobeRemoved.length === 0
    ? Promise.resolve(tobeRemoved)
    : forceGitRemove(tobeRemoved, cwd)
        .then(() => del(tobeRemoved, { cwd }))
        .then(deletedPaths => {
          return deletedPaths.map(deletedPath => path.basename(deletedPath));
        });
};

module.exports = removeLockfiles;
