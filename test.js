const findUp = require('find-up');
const shell = require('shelljs');

const removeLockfiles = require('./');

it('removes package-lock.json', () => {
  shell.touch('package-lock.json');
  removeLockfiles();

  expect(findUp.sync('package-lock.json')).toBe(null);
});

it('removes yarn.lock', () => {
  shell.touch('yarn.lock');
  removeLockfiles();

  expect(findUp.sync('yarn.lock')).toBe(null);
});
