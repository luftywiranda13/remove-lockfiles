'use strict';

const execa = require('execa');
const hasLockfile = require('has-lockfile');
const shell = require('shelljs');

describe('CWD', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(2);
    shell.cp(`${__dirname}/fixtures/_package-lock.json`, `package-lock.json`);

    const res = await execa.stdout('./cli.js');

    expect(res).toMatch(/package-lock.json/);
    expect(hasLockfile()).toEqual([]);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(2);
    shell.cp(`${__dirname}/fixtures/_yarn.lock`, `yarn.lock`);

    const res = await execa.stdout('./cli.js');

    expect(res).toMatch(/yarn.lock/);
    expect(hasLockfile()).toEqual([]);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(2);
    shell.cp(`${__dirname}/fixtures/_package-lock.json`, `package-lock.json`);
    shell.cp(`${__dirname}/fixtures/_yarn.lock`, `yarn.lock`);

    const res = await execa.stdout('./cli.js');

    expect(res).toMatch(/package-lock.json & yarn.lock/);
    expect(hasLockfile()).toEqual([]);
  });

  it('does nothing', async () => {
    expect.assertions(2);

    const res = await execa.stdout('./cli.js');

    expect(res).toMatch(/No lockfile found/);
    expect(hasLockfile()).toEqual([]);
  });
});

describe('outside CWD', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(2);
    shell.cp(
      `${__dirname}/fixtures/_package-lock.json`,
      `${__dirname}/fixtures/package-lock.json`
    );

    const res = await execa.stdout('./cli.js', [`${__dirname}/fixtures`]);

    expect(res).toMatch(/package-lock.json/);
    expect(hasLockfile(`${__dirname}/fixtures`)).toEqual([]);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(2);
    shell.cp(
      `${__dirname}/fixtures/_yarn.lock`,
      `${__dirname}/fixtures/yarn.lock`
    );

    const res = await execa.stdout('./cli.js', [`${__dirname}/fixtures`]);

    expect(res).toMatch(/yarn.lock/);
    expect(hasLockfile(`${__dirname}/fixtures`)).toEqual([]);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(2);
    shell.cp(
      `${__dirname}/fixtures/_package-lock.json`,
      `${__dirname}/fixtures/package-lock.json`
    );
    shell.cp(
      `${__dirname}/fixtures/_yarn.lock`,
      `${__dirname}/fixtures/yarn.lock`
    );

    const res = await execa.stdout('./cli.js', [`${__dirname}/fixtures`]);

    expect(res).toMatch(/package-lock.json & yarn.lock/);
    expect(hasLockfile(`${__dirname}/fixtures`)).toEqual([]);
  });

  it('does nothing', async () => {
    expect.assertions(2);

    const res = await execa.stdout('./cli.js', [`${__dirname}/fixtures`]);

    expect(res).toMatch(/No lockfile found/);
    expect(hasLockfile(`${__dirname}/fixtures`)).toEqual([]);
  });
});
