'use strict';

const { basename } = require('path');
const forceDel = require('force-del');
const hasLockfile = require('has-lockfile');

const removeLockfiles = ({ cwd = process.cwd(), shrinkwrap = false } = {}) => {
  const lockfiles = shrinkwrap
    ? hasLockfile(cwd)
    : hasLockfile(cwd).filter(x => x !== 'npm-shrinkwrap.json');

  return forceDel(lockfiles, { cwd }).then(path => path.map(x => basename(x)));
};

module.exports = removeLockfiles;
