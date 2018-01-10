'use strict';

const { existsSync, copySync } = require('fs-extra');
const { stdout } = require('execa');
const tempy = require('tempy');

describe('CLI', async () => {
  test('lockfiles found', async () => {
    expect.assertions(4);

    const fixtures = `${__dirname}/fixtures`;
    const tempDir = tempy.directory();

    // Copy lockfiles to tempDir
    const lockfiles = ['package-lock.json', 'yarn.lock', 'npm-shrinkwrap.json'];
    lockfiles.forEach(lockfile => {
      copySync(`${fixtures}/_${lockfile}`, `${tempDir}/${lockfile}`);
    });

    const res = await stdout('./cli.js', [tempDir]);

    expect(res).toMatchSnapshot();
    expect(existsSync(`${tempDir}/package-lock.json`)).toBe(false);
    expect(existsSync(`${tempDir}/npm-shrinkwrap.json`)).toBe(true);
    expect(existsSync(`${tempDir}/yarn.lock`)).toBe(false);
  });

  test('`--shrinkwrap` flag', async () => {
    expect.assertions(2);

    const fixtures = `${__dirname}/fixtures`;
    const tempDir = tempy.directory();

    copySync(
      `${fixtures}/_npm-shrinkwrap.json`,
      `${tempDir}/npm-shrinkwrap.json`
    );

    const res = await stdout('./cli.js', [tempDir, '--shrinkwrap']);

    expect(res).toMatchSnapshot();
    expect(existsSync(`${tempDir}/npm-shrinkwrap.json`)).toBe(false);
  });

  test('no lockfile', async () => {
    expect.assertions(3);

    const res = await stdout('./cli.js');

    expect(res).toMatchSnapshot();
    expect(existsSync('package-lock.json')).toBe(false);
    expect(existsSync('yarn.lock')).toBe(false);
  });
});
