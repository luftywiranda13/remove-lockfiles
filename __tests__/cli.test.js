'use strict';

const { existsSync, copySync } = require('fs-extra');
const { stdout } = require('execa');
const tempy = require('tempy');

const fixtures = `${__dirname}/fixtures`;
const tempDir = tempy.directory();

describe('CLI', async () => {
  test('default', async () => {
    expect.assertions(3);

    const lockfiles = ['package-lock.json', 'yarn.lock', 'npm-shrinkwrap.json'];

    // Copy lockfiles to tempDir
    lockfiles.forEach(x => {
      copySync(`${fixtures}/_${x}`, `${tempDir}/${x}`);
    });

    await stdout('./cli.js', [tempDir]);

    expect(existsSync(`${tempDir}/package-lock.json`)).toBe(false);
    expect(existsSync(`${tempDir}/npm-shrinkwrap.json`)).toBe(true);
    expect(existsSync(`${tempDir}/yarn.lock`)).toBe(false);
  });

  test('`--shrinkwrap` flag', async () => {
    expect.assertions(1);

    copySync(
      `${fixtures}/_npm-shrinkwrap.json`,
      `${tempDir}/npm-shrinkwrap.json`
    );

    await stdout('./cli.js', [tempDir, '--shrinkwrap']);

    expect(existsSync(`${tempDir}/npm-shrinkwrap.json`)).toBe(false);
  });
});
