'use strict';

const forceDel = require('force-del');
const hasLockfile = require('has-lockfile');

const removeLockfiles = ({ cwd = process.cwd(), shrinkwrap = false } = {}) => {
  const lockfiles = shrinkwrap
    ? hasLockfile(cwd)
    : hasLockfile(cwd).filter(x => x !== 'npm-shrinkwrap.json');

  return forceDel(lockfiles, { cwd });
};

module.exports = removeLockfiles;
