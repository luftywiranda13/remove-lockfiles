const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

const removeLockfiles = require('./');

test('removes package-lock.json', () => {
  shell.touch('package-lock.json');
  removeLockfiles();

  expect(hasLockfile()).toBe(null);
});

test('removes yarn.lock', () => {
  shell.touch('yarn.lock');
  removeLockfiles();

  expect(hasLockfile()).toBe(null);
});

test('null', () => {
  removeLockfiles();
  expect(hasLockfile()).toBe(null);
});
