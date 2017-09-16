'use strict';

const path = require('path');
const del = require('del');
const execa = require('execa');
const hasLockfile = require('has-lockfile');

const rm = file => execa('git', ['rm', '--cached', file]);
const unstage = file => execa('git', ['reset', 'HEAD', file]);

module.exports = cwd => {
  cwd = path.resolve(cwd || process.cwd());

  const lockfile = hasLockfile(cwd);

  if (lockfile !== null) {
    const target = path.join(cwd, lockfile);

    rm(target).catch(() => {
      unstage(target);
    });

    return del(lockfile, {cwd});
  }
};
