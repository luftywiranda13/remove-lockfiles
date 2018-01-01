import del from 'del';
import execa from 'execa';
import hasLockfile from 'has-lockfile';

const removeLockfiles = async (path = process.cwd()) => {
  const lockfiles = hasLockfile(path);

  if (lockfiles.length !== 0) {
    await execa('git', ['rm', '-f', lockfiles.join(' ')], {
      cwd: path,
      reject: false,
    });

    await del(lockfiles, { cwd: path });
  }

  return lockfiles;
};

export default removeLockfiles;
