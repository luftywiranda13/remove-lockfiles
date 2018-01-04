'use strict';

const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

const removeLockfiles = require('../');

describe('CWD', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(2);
    shell.cp(`${__dirname}/fixtures/_package-lock.json`, `package-lock.json`);

    const res = await removeLockfiles();

    expect(res).toEqual(['package-lock.json']);
    expect(hasLockfile()).toEqual([]);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(2);
    shell.cp(`${__dirname}/fixtures/_yarn.lock`, `yarn.lock`);

    const res = await removeLockfiles();

    expect(res).toEqual(['yarn.lock']);
    expect(hasLockfile()).toEqual([]);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(2);
    shell.cp(`${__dirname}/fixtures/_package-lock.json`, `package-lock.json`);
    shell.cp(`${__dirname}/fixtures/_yarn.lock`, `yarn.lock`);

    const res = await removeLockfiles();

    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
    expect(hasLockfile()).toEqual([]);
  });

  it('does nothing', async () => {
    expect.assertions(2);

    const res = await removeLockfiles();

    expect(res).toEqual([]);
    expect(hasLockfile()).toEqual([]);
  });
});

describe('outside CWD', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(2);
    shell.cp(
      `${__dirname}/fixtures/_package-lock.json`,
      `${__dirname}/fixtures/package-lock.json`
    );

    const res = await removeLockfiles(`${__dirname}/fixtures`);

    expect(res).toEqual(['package-lock.json']);
    expect(hasLockfile(`${__dirname}/fixtures`)).toEqual([]);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(2);
    shell.cp(
      `${__dirname}/fixtures/_yarn.lock`,
      `${__dirname}/fixtures/yarn.lock`
    );

    const res = await removeLockfiles(`${__dirname}/fixtures`);

    expect(res).toEqual(['yarn.lock']);
    expect(hasLockfile(`${__dirname}/fixtures`)).toEqual([]);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(2);
    shell.cp(
      `${__dirname}/fixtures/_package-lock.json`,
      `${__dirname}/fixtures/package-lock.json`
    );
    shell.cp(
      `${__dirname}/fixtures/_yarn.lock`,
      `${__dirname}/fixtures/yarn.lock`
    );

    const res = await removeLockfiles(`${__dirname}/fixtures`);

    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
    expect(hasLockfile(`${__dirname}/fixtures`)).toEqual([]);
  });

  it('does nothing', async () => {
    expect.assertions(2);

    const res = await removeLockfiles(`${__dirname}/fixtures`);

    expect(res).toEqual([]);
    expect(hasLockfile(`${__dirname}/fixtures`)).toEqual([]);
  });
});
