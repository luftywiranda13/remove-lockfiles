'use strict';

const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

const removeLockfiles = require('./');

test('removes package-lock.json', async () => {
  shell.touch('package-lock.json');
  await removeLockfiles();

  expect(hasLockfile()).toBe(null);
});

test('removes yarn.lock', async () => {
  shell.touch('yarn.lock');
  await removeLockfiles();

  expect(hasLockfile()).toBe(null);
});

test('do nothing', async () => {
  await removeLockfiles();

  expect(hasLockfile()).toBe(null);
});
