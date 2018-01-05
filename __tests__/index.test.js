'use strict';

const fs = require('fs-extra');

const removeLockfiles = require('../');

describe('CWD', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(2);
    await fs.copy(
      `${__dirname}/fixtures/_package-lock.json`,
      `package-lock.json`
    );

    const res = await removeLockfiles();

    expect(res).toEqual(['package-lock.json']);
    expect(fs.pathExistsSync('package-lock.json')).toBe(false);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(2);
    await fs.copy(`${__dirname}/fixtures/_yarn.lock`, `yarn.lock`);

    const res = await removeLockfiles();

    expect(res).toEqual(['yarn.lock']);
    expect(fs.pathExistsSync('yarn.lock')).toBe(false);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(3);
    await fs.copy(
      `${__dirname}/fixtures/_package-lock.json`,
      `package-lock.json`
    );
    await fs.copy(`${__dirname}/fixtures/_yarn.lock`, `yarn.lock`);

    const res = await removeLockfiles();

    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
    expect(fs.pathExistsSync('package-lock.json')).toBe(false);
    expect(fs.pathExistsSync('yarn.lock')).toBe(false);
  });

  it('does nothing', async () => {
    expect.assertions(1);

    const res = await removeLockfiles();

    expect(res).toEqual([]);
  });
});

describe('outside CWD', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(2);
    await fs.copy(
      `${__dirname}/fixtures/_package-lock.json`,
      `${__dirname}/fixtures/package-lock.json`
    );

    const res = await removeLockfiles(`${__dirname}/fixtures`);

    expect(res).toEqual(['package-lock.json']);
    expect(fs.pathExistsSync(`${__dirname}/fixtures/package-lock.json`)).toBe(
      false
    );
  });

  it('removes yarn.lock', async () => {
    expect.assertions(2);
    await fs.copy(
      `${__dirname}/fixtures/_yarn.lock`,
      `${__dirname}/fixtures/yarn.lock`
    );

    const res = await removeLockfiles(`${__dirname}/fixtures`);

    expect(res).toEqual(['yarn.lock']);
    expect(fs.pathExistsSync(`${__dirname}/fixtures/yarn.lock`)).toBe(false);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(3);
    await fs.copy(
      `${__dirname}/fixtures/_package-lock.json`,
      `${__dirname}/fixtures/package-lock.json`
    );
    await fs.copy(
      `${__dirname}/fixtures/_yarn.lock`,
      `${__dirname}/fixtures/yarn.lock`
    );

    const res = await removeLockfiles(`${__dirname}/fixtures`);

    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
    expect(fs.pathExistsSync(`${__dirname}/fixtures/package-lock.json`)).toBe(
      false
    );
    expect(fs.pathExistsSync(`${__dirname}/fixtures/yarn.lock`)).toBe(false);
  });

  it('does nothing', async () => {
    expect.assertions(1);

    const res = await removeLockfiles(`${__dirname}/fixtures`);

    expect(res).toEqual([]);
  });
});
