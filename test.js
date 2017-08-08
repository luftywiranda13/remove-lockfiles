const pathExists = require('path-exists');
const shell = require('shelljs');

const removeLockfiles = require('./');

test('removes lockfiles', () => {
  const lockfiles = ['package-lock.json', 'yarn.lock'];

  shell.touch(lockfiles);
  removeLockfiles();

  expect(pathExists.sync(lockfiles)).toBe(false);
});
