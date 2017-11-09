const path = require('path');

const appPath = process.cwd();
const appNodeModulesPath = path.resolve(appPath, 'node_modules');
// Extract repository name if git url is passed (use last match)
const gitRepoNameRegEx = /\/([a-z0-9-]*)\.git*/i;
// Check if preset contains only characters, numbers and -
const presetNameRegEx = /^[a-z0-9-]+$/i;

module.exports = {
    appPath,
    appNodeModulesPath,
    gitRepoNameRegEx,
    presetNameRegEx,
};
