import hasLockfile from 'has-lockfile';
import shell from 'shelljs';

import removeLockfiles from './';

describe('default `path = process.cwd()`', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(2);
    shell.touch('package-lock.json');

    const res = await removeLockfiles();

    expect(res).toEqual(['package-lock.json']);
    expect(hasLockfile()).toEqual([]);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(2);
    shell.touch('yarn.lock');

    const res = await removeLockfiles();

    expect(res).toEqual(['yarn.lock']);
    expect(hasLockfile()).toEqual([]);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(2);
    shell.touch(['package-lock.json', 'yarn.lock']);

    const res = await removeLockfiles();

    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
    expect(hasLockfile()).toEqual([]);
  });

  it('does nothing', async () => {
    expect.assertions(2);
    const res = await removeLockfiles();

    expect(res).toEqual([]);
    expect(hasLockfile()).toEqual([]);
  });
});

describe('user-defined `path`', () => {
  it('removes package-lock.json', async () => {
    expect.assertions(2);
    shell.touch('../package-lock.json');

    const res = await removeLockfiles('../');

    expect(res).toEqual(['package-lock.json']);
    expect(hasLockfile('../')).toEqual([]);
  });

  it('removes yarn.lock', async () => {
    expect.assertions(2);
    shell.touch('../yarn.lock');

    const res = await removeLockfiles('../');

    expect(res).toEqual(['yarn.lock']);
    expect(hasLockfile('../')).toEqual([]);
  });

  it('removes all lockfiles', async () => {
    expect.assertions(2);
    shell.touch(['../package-lock.json', '../yarn.lock']);

    const res = await removeLockfiles('../');

    expect(res).toEqual(['package-lock.json', 'yarn.lock']);
    expect(hasLockfile()).toEqual([]);
  });

  it('does nothing', async () => {
    expect.assertions(2);
    const res = await removeLockfiles('../');

    expect(res).toEqual([]);
    expect(hasLockfile('../')).toEqual([]);
  });
});
