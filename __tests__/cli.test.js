'use strict';

const execa = require('execa');
const fs = require('fs-extra');

describe('CWD', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(1);
    await fs.copy(
      `${__dirname}/fixtures/_package-lock.json`,
      `package-lock.json`
    );

    const res = await execa.stdout('./cli.js');

    expect(res).toMatch(/package-lock.json/);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(1);
    await fs.copy(`${__dirname}/fixtures/_yarn.lock`, `yarn.lock`);

    const res = await execa.stdout('./cli.js');

    expect(res).toMatch(/yarn.lock/);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(1);
    await fs.copy(
      `${__dirname}/fixtures/_package-lock.json`,
      `package-lock.json`
    );
    await fs.copy(`${__dirname}/fixtures/_yarn.lock`, `yarn.lock`);

    const res = await execa.stdout('./cli.js');

    expect(res).toMatch(/package-lock.json & yarn.lock/);
  });

  it('does nothing', async () => {
    expect.assertions(1);

    const res = await execa.stdout('./cli.js');

    expect(res).toMatch(/No lockfile found/);
  });
});

describe('outside CWD', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(1);
    await fs.copy(
      `${__dirname}/fixtures/_package-lock.json`,
      `${__dirname}/fixtures/package-lock.json`
    );

    const res = await execa.stdout('./cli.js', [`${__dirname}/fixtures`]);

    expect(res).toMatch(/package-lock.json/);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(1);
    await fs.copy(
      `${__dirname}/fixtures/_yarn.lock`,
      `${__dirname}/fixtures/yarn.lock`
    );

    const res = await execa.stdout('./cli.js', [`${__dirname}/fixtures`]);

    expect(res).toMatch(/yarn.lock/);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(1);
    await fs.copy(
      `${__dirname}/fixtures/_package-lock.json`,
      `${__dirname}/fixtures/package-lock.json`
    );
    await fs.copy(
      `${__dirname}/fixtures/_yarn.lock`,
      `${__dirname}/fixtures/yarn.lock`
    );

    const res = await execa.stdout('./cli.js', [`${__dirname}/fixtures`]);

    expect(res).toMatch(/package-lock.json & yarn.lock/);
  });

  it('does nothing', async () => {
    expect.assertions(1);

    const res = await execa.stdout('./cli.js', [`${__dirname}/fixtures`]);

    expect(res).toMatch(/No lockfile found/);
  });
});
