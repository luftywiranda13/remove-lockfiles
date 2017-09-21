'use strict';

const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

const removeLockfiles = require('./');

describe('CWD', () => {
  it('removes package-lock.json', async () => {
    shell.touch('package-lock.json');
    const res = await removeLockfiles();

    expect(hasLockfile()).toEqual([]);
    expect(res).toEqual(['package-lock.json']);
  });

  it('removes yarn.lock', async () => {
    shell.touch('yarn.lock');
    const res = await removeLockfiles();

    expect(hasLockfile()).toEqual([]);
    expect(res).toEqual(['yarn.lock']);
  });

  it('removes all lockfiles', async () => {
    shell.touch('package-lock.json');
    shell.touch('yarn.lock');
    const res = await removeLockfiles();

    expect(hasLockfile()).toEqual([]);
    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
  });

  it('does nothing', async () => {
    const res = await removeLockfiles();

    expect(hasLockfile()).toEqual([]);
    expect(res).toEqual([]);
  });
});

describe('outside CWD', () => {
  it('removes package-lock.json', async () => {
    shell.touch('../package-lock.json');
    const res = await removeLockfiles('../');

    expect(hasLockfile('../')).toEqual([]);
    expect(res).toEqual(['package-lock.json']);
  });

  it('removes yarn.lock', async () => {
    shell.touch('../yarn.lock');
    const res = await removeLockfiles('../');

    expect(hasLockfile('../')).toEqual([]);
    expect(res).toEqual(['yarn.lock']);
  });

  it('removes all lockfiles', async () => {
    shell.touch('../package-lock.json');
    shell.touch('../yarn.lock');
    const res = await removeLockfiles('../');

    expect(hasLockfile()).toEqual([]);
    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
  });

  it('does nothing', async () => {
    const res = await removeLockfiles('../');

    expect(hasLockfile('../')).toEqual([]);
    expect(res).toEqual([]);
  });
});
