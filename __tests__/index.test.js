'use strict';

const fixtures = require('fixturez');

const removeLockfiles = require('../');

const f = fixtures(__dirname);

describe('API', () => {
  it('defaults to run in cwd', async () => {
    expect.assertions(1);

    const tempDir = f.copy('lockfiles');
    const cwd = process.cwd();
    process.chdir(tempDir);

    const expected = expect.arrayContaining([
      expect.stringMatching(/yarn.lock$/),
      expect.stringMatching(/package-lock.json$/),
    ]);

    const res = await removeLockfiles();

    expect(res).toEqual(expected);
    process.chdir(cwd);
  });

  it('defaults to not remove `npm-shrinkwrap.json`', async () => {
    expect.assertions(1);

    const tempDir = f.copy('lockfiles');
    const expected = expect.arrayContaining([
      expect.stringMatching(/npm-shrinkwrap.json$/),
    ]);

    const res = await removeLockfiles({ cwd: tempDir });

    expect(res).not.toEqual(expected);
  });

  it('can be set to remove `npm-shrinkwrap.json`', async () => {
    expect.assertions(1);

    const tempDir = f.copy('lockfiles');
    const expected = expect.arrayContaining([
      expect.stringMatching(/yarn.lock$/),
      expect.stringMatching(/package-lock.json$/),
      expect.stringMatching(/npm-shrinkwrap.json$/),
    ]);

    const res = await removeLockfiles({
      cwd: tempDir,
      shrinkwrap: true,
    });

    expect(res).toEqual(expected);
  });
});
