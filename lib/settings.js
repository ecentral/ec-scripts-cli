const path = require('path');

const appPath = process.cwd();
const appNodeModulesPath = path.resolve(appPath, 'node_modules');
// Check if preset contains only characters, numbers and -
const presetNameRegEx = /^[a-z0-9-]+$/i;
const presetNamePrefix = 'ec-scripts-preset-';

module.exports = {
    appPath,
    appNodeModulesPath,
    presetNameRegEx,
    presetNamePrefix,
};
