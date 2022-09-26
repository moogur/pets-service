const childProcess = require('node:child_process');

function exec(command, returnedWhenError = '') {
  try {
    return childProcess.execSync(command).toString().trim();
  } catch (error) {
    console.log(error);
    return returnedWhenError;
  }
}
exports.exec = exec;

exports.branch = exec('git rev-parse --abbrev-ref HEAD');
exports.shaLatestCommit = exec('git rev-parse --short HEAD');
exports.latestTag = exec('git describe --abbrev=0 --tags', '0.0.0').replace(/^v?/, '');
