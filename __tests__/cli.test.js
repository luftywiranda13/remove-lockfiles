'use strict';

const { existsSync, copySync } = require('fs-extra');
const { stdout } = require('execa');
const tempy = require('tempy');

describe('CLI', async () => {
  test('lockfiles found', async () => {
    expect.assertions(3);
    const fixtures = `${__dirname}/fixtures`;
    const tempDir = tempy.directory();
    copySync(`${fixtures}/_package-lock.json`, `${tempDir}/package-lock.json`);
    copySync(`${fixtures}/_yarn.lock`, `${tempDir}/yarn.lock`);

    const res = await stdout('./cli.js', [tempDir]);

    expect(res).toMatchSnapshot();
    expect(existsSync(`${tempDir}/package-lock.json`)).toBe(false);
    expect(existsSync(`${tempDir}/yarn.lock`)).toBe(false);
  });

  test('no lockfile', async () => {
    expect.assertions(3);
    const res = await stdout('./cli.js');

    expect(res).toMatchSnapshot();
    expect(existsSync('package-lock.json')).toBe(false);
    expect(existsSync('yarn.lock')).toBe(false);
  });
});
