'use strict';

const path = require('path');
const del = require('del');
const execa = require('execa');
const hasLockfile = require('has-lockfile');

module.exports = cwd => {
  cwd = cwd || process.cwd();

  const lockfile = hasLockfile(cwd);

  if (lockfile !== null) {
    const target = path.join(cwd, lockfile);

    try {
      execa.sync('git', ['rm', '--cached', target]);
    } catch (err) {
      execa('git', ['reset', 'HEAD', target]);
    } finally {
      del.sync(target, {force: true, cwd});
    }
  }

  return lockfile;
};
