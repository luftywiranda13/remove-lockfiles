'use strict';

const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

const removeLockfiles = require('./');

describe('CWD', () => {
  it('removes package-lock.json', async () => {
    shell.touch('package-lock.json');

    const res = await removeLockfiles();

    expect(res).toEqual(['package-lock.json']);
    expect(hasLockfile()).toEqual([]);
  });

  it('removes yarn.lock', async () => {
    shell.touch('yarn.lock');

    const res = await removeLockfiles();

    expect(res).toEqual(['yarn.lock']);
    expect(hasLockfile()).toEqual([]);
  });

  it('removes all lockfiles', async () => {
    shell.touch(['package-lock.json', 'yarn.lock']);

    const res = await removeLockfiles();

    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
    expect(hasLockfile()).toEqual([]);
  });

  it('does nothing', async () => {
    const res = await removeLockfiles();

    expect(res).toEqual([]);
    expect(hasLockfile()).toEqual([]);
  });
});

describe('outside CWD', () => {
  it('removes package-lock.json', async () => {
    shell.touch('../package-lock.json');

    const res = await removeLockfiles('../');

    expect(res).toEqual(['package-lock.json']);
    expect(hasLockfile('../')).toEqual([]);
  });

  it('removes yarn.lock', async () => {
    shell.touch('../yarn.lock');

    const res = await removeLockfiles('../');

    expect(res).toEqual(['yarn.lock']);
    expect(hasLockfile('../')).toEqual([]);
  });

  it('removes all lockfiles', async () => {
    shell.touch(['../package-lock.json', '../yarn.lock']);

    const res = await removeLockfiles('../');

    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
    expect(hasLockfile()).toEqual([]);
  });

  it('does nothing', async () => {
    const res = await removeLockfiles('../');

    expect(res).toEqual([]);
    expect(hasLockfile('../')).toEqual([]);
  });
});
