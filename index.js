'use strict';

const path = require('path');
const del = require('del');
const execa = require('execa');
const hasLockfile = require('has-lockfile');

const remove = (files, cwd) =>
  execa('git', ['rm', '-f'].concat(files), { cwd })
    .then(() => files)
    .catch(() => del(files, { cwd }))
    .then(deleted => deleted.map(x => path.basename(x)));

const removeLockfiles = ({ cwd = process.cwd(), shrinkwrap = false } = {}) => {
  const lockfiles = shrinkwrap
    ? hasLockfile(cwd)
    : hasLockfile(cwd).filter(x => x !== 'npm-shrinkwrap.json');

  return lockfiles.length > 0
    ? remove(lockfiles, cwd)
    : Promise.resolve(lockfiles);
};

module.exports = removeLockfiles;
