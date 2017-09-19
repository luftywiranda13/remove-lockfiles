'use strict';

const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

const removeLockfiles = require('./');

describe('CWD', () => {
  test('removes package-lock.json', async () => {
    shell.touch('package-lock.json');
    const res = await removeLockfiles();

    expect(hasLockfile()).toEqual([]);
    expect(res).toEqual(['package-lock.json']);
  });

  test('removes yarn.lock', async () => {
    shell.touch('yarn.lock');
    const res = await removeLockfiles();

    expect(hasLockfile()).toEqual([]);
    expect(res).toEqual(['yarn.lock']);
  });

  test('do nothing', async () => {
    const res = await removeLockfiles();

    expect(hasLockfile()).toEqual([]);
    expect(res).toEqual([]);
  });
});

describe('outside CWD', () => {
  test('removes package-lock.json', async () => {
    shell.touch('../package-lock.json');
    const res = await removeLockfiles('../');

    expect(hasLockfile('../')).toEqual([]);
    expect(res).toEqual(['package-lock.json']);
  });

  test('removes yarn.lock', async () => {
    shell.touch('../yarn.lock');
    const res = await removeLockfiles('../');

    expect(hasLockfile('../')).toEqual([]);
    expect(res).toEqual(['yarn.lock']);
  });

  test('do nothing', async () => {
    const res = await removeLockfiles('../');

    expect(hasLockfile('../')).toEqual([]);
    expect(res).toEqual([]);
  });
});
