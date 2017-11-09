const path = require('path');
const fs = require('fs-extra');
const settings = require('../settings');
const getModulePath = require('./getModulePath');

const appPkgPath = path.resolve(settings.appPath, 'package.json');

const updateAppPkg = () => {
    console.log('Updating package.json scripts');

    const pkg = require(appPkgPath);
    const ecScriptsPkg = require(path.join(getModulePath('ec-scripts'), 'resources/package.json'));
    const updatedPkg = Object.assign({}, pkg, ecScriptsPkg);

    return fs.writeFile(appPkgPath, JSON.stringify(updatedPkg, null, 2));
};

module.exports = updateAppPkg;
