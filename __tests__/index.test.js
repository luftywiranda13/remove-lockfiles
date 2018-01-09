'use strict';

const fs = require('fs-extra');
const tempy = require('tempy');

const removeLockfiles = require('../');

it('returns [] when no lockfiles found', async () => {
  expect.assertions(1);
  const res = await removeLockfiles();

  expect(res).toEqual([]);
});

it('defaults to ignore `npm-shrinkwrap.json`', async () => {
  expect.assertions(1);

  const tempDir = tempy.directory();
  await fs.copy(`${__dirname}/fixtures`, tempDir);

  const res = await removeLockfiles({ cwd: tempDir });

  expect(res).not.toEqual(expect.arrayContaining(['npm-shrinkwrap.json']));
});

it('can remove `npm-shrinkwrap.json`', async () => {
  expect.assertions(1);

  const tempDir = tempy.directory();
  await fs.copy(`${__dirname}/fixtures`, tempDir);

  const res = await removeLockfiles({ cwd: tempDir, shrinkwrap: true });

  expect(res).toEqual(expect.arrayContaining(['npm-shrinkwrap.json']));
});
