const path = require('path');
const settings = require('../settings');

const getModulePath = (pkgName) => (
    path.resolve(settings.appNodeModulesPath, pkgName)
);

module.exports = getModulePath;
