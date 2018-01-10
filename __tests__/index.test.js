'use strict';

const { copySync, existsSync } = require('fs-extra');
const execa = require('execa');

const removeLockfiles = require('../');

it('forces remove lockfiles', async () => {
  expect.assertions(3);
  const fixtures = `${__dirname}/fixtures`;
  copySync(`${fixtures}/_package-lock.json`, `${fixtures}/package-lock.json`);
  copySync(`${fixtures}/_yarn.lock`, `${fixtures}/yarn.lock`);
  await execa('git', [
    'add',
    `${fixtures}/package-lock.json`,
    `${fixtures}/yarn.lock`,
  ]);

  const res = await removeLockfiles(fixtures);

  const expected = expect.arrayContaining(['yarn.lock', 'package-lock.json']);
  expect(res).toEqual(expected);
  expect(existsSync(`${fixtures}/package-lock.json`)).toBe(false);
  expect(existsSync(`${fixtures}/yarn.lock`)).toBe(false);
});

it('returns empty array when no lockfile found', async () => {
  expect.assertions(3);
  const res = await removeLockfiles();

  expect(res).toEqual([]);
  expect(existsSync('package-lock.json')).toBe(false);
  expect(existsSync('yarn.lock')).toBe(false);
});
