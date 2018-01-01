import del from 'del';
import execa from 'execa';
import hasLockfile from 'has-lockfile';

const forceUnstage = async (files, path) => {
  return execa('git', ['rm', '-f', files.join(' ')], {
    cwd: path,
    reject: false,
  });
};

const removeLockfiles = async (path = process.cwd()) => {
  const lockfiles = hasLockfile(path);

  if (lockfiles.length !== 0) {
    await forceUnstage(lockfiles, path);
    await del(lockfiles, { cwd: path });
  }

  return lockfiles;
};

export default removeLockfiles;
