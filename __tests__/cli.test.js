'use strict';

const execa = require('execa');
const fs = require('fs-extra');
const tempy = require('tempy');

describe('no lockfile', () => {
  test('output', async () => {
    expect.assertions(1);
    const stdout = await execa.stdout('./cli.js');

    expect(stdout).toMatch(/No lockfile found/);
  });
});

describe('with lockfiles', () => {
  test('output', async () => {
    expect.assertions(1);
    const tempDir = tempy.directory();
    await fs.copy(`${__dirname}/fixtures`, tempDir);

    const stdout = await execa.stdout('./cli.js', [tempDir]);

    expect(stdout).not.toMatch(/npm-shrinkwrap.json/);
  });

  test('--shrinkwrap option', async () => {
    expect.assertions(1);
    const tempDir = tempy.directory();
    await fs.copy(`${__dirname}/fixtures`, tempDir);

    const stdout = await execa.stdout('./cli.js', [tempDir, '--shrinkwrap']);

    expect(stdout).toMatch(/npm-shrinkwrap.json/);
  });
});
