'use strict';

const del = require('del');
const execa = require('execa');
const hasLockfile = require('has-lockfile');

module.exports = cwd => {
  cwd = cwd || process.cwd();

  const lockfiles = hasLockfile(cwd);

  if (lockfiles.length !== 0) {
    return execa('git', ['rm', '-f', lockfiles.join(' ')], {
      cwd,
      reject: false
    })
      .then(() => del(lockfiles, {cwd}))
      .then(() => lockfiles);
  }

  return Promise.resolve(lockfiles);
};
