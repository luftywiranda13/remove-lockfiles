'use strict';

const forceDel = require('force-del');
const hasLockfile = require('has-lockfile');

module.exports = ({ cwd = process.cwd(), shrinkwrap = false } = {}) => {
  const lockfiles = shrinkwrap
    ? hasLockfile.lockfiles(cwd)
    : hasLockfile.lockfiles(cwd).filter(x => x !== 'npm-shrinkwrap.json');

  return forceDel(lockfiles, { cwd });
};
