'use strict';

const { join } = require('path');
const execa = require('execa');
const fixtures = require('fixturez');

const removeLockfiles = require('..');

const cwd = process.cwd();
const f = fixtures(__dirname);

afterEach(() => {
  process.chdir(cwd);
});

it('defaults to not remove `npm-shrinkwrap.json`', async () => {
  expect.assertions(1);

  const tempDir = f.copy('lockfiles');
  process.chdir(tempDir);

  await execa('git', ['init'], { cwd: tempDir });

  await expect(removeLockfiles()).resolves.not.toEqual([
    join(tempDir, 'npm-shrinkwrap.json'),
  ]);
});

it('can be set to remove `npm-shrinkwrap.json`', async () => {
  expect.assertions(1);

  const tempDir = f.copy('lockfiles');
  process.chdir(tempDir);

  await execa('git', ['init'], { cwd: tempDir });

  await expect(removeLockfiles({ shrinkwrap: true })).resolves.toEqual([
    join(tempDir, 'package-lock.json'),
    join(tempDir, 'yarn.lock'),
    join(tempDir, 'npm-shrinkwrap.json'),
  ]);
});
