'use strict';

const execa = require('execa');
const fixtures = require('fixturez');

const f = fixtures(__dirname);

describe('CLI', () => {
  it('logs removed lockfiles', async () => {
    expect.assertions(1);

    const tempDir = f.copy('lockfiles');
    const stdout = await execa.stdout('./cli.js', [tempDir]);

    expect(stdout).toMatch(/Removed/);
  });

  it('logs info when no lockfile found', async () => {
    expect.assertions(1);

    const tempDir = f.temp();
    const stdout = await execa.stdout('./cli.js', [tempDir]);

    expect(stdout).toMatch(/No lockfile found/);
  });

  it('passes `--shrinkwrap` flag to API', async () => {
    expect.assertions(1);

    const tempDir = f.copy('lockfiles');
    const stdout = await execa.stdout('./cli.js', [tempDir, '--shrinkwrap']);

    expect(stdout).toMatch(/npm-shrinkwrap.json$/);
  });
});
