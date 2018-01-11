'use strict';

const { copySync, existsSync } = require('fs-extra');

const removeLockfiles = require('../');

const fixtures = `${__dirname}/fixtures`;

describe('API', () => {
  it('forces remove lockfiles', async () => {
    expect.assertions(4);

    const lockfiles = ['package-lock.json', 'yarn.lock', 'npm-shrinkwrap.json'];

    // Rename lockfiles,
    // E.g: `_yarn.lock` => `yarn.lock`
    lockfiles.forEach(x => {
      copySync(`${fixtures}/_${x}`, `${fixtures}/${x}`);
    });

    const res = await removeLockfiles({ cwd: fixtures });

    // Should not remove `npm-shrinkwrap.json` by default
    const expected = expect.arrayContaining(['package-lock.json', 'yarn.lock']);

    expect(res).toEqual(expected);
    expect(existsSync(`${fixtures}/npm-shrinkwrap.json`)).toBe(true);
    expect(existsSync(`${fixtures}/package-lock.json`)).toBe(false);
    expect(existsSync(`${fixtures}/yarn.lock`)).toBe(false);
  });

  it('can remove `npm-shrinkwrap.json`', async () => {
    expect.assertions(2);

    copySync(
      `${fixtures}/_npm-shrinkwrap.json`,
      `${fixtures}/npm-shrinkwrap.json`
    );

    const res = await removeLockfiles({ cwd: fixtures, shrinkwrap: true });

    expect(res).toEqual(['npm-shrinkwrap.json']);
    expect(existsSync(`${fixtures}/npm-shrinkwrap.json`)).toBe(false);
  });

  it('returns empty array when no lockfile found', async () => {
    expect.assertions(3);

    const res = await removeLockfiles();

    expect(res).toEqual([]);
    expect(existsSync('package-lock.json')).toBe(false);
    expect(existsSync('yarn.lock')).toBe(false);
  });
});
