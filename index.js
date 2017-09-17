'use strict';

const del = require('del');
const execa = require('execa');
const hasLockfile = require('has-lockfile');

module.exports = cwd => {
  cwd = cwd || process.cwd();

  const lockfile = hasLockfile(cwd);

  if (lockfile !== null) {
    return execa('git', ['rm', '-f', lockfile], {cwd, reject: false})
      .then(() => del(lockfile, {cwd}))
      .then(() => lockfile);
  }

  return Promise.resolve(lockfile);
};
