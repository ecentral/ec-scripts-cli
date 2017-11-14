const chalk = require('chalk');
const spawn = require('cross-spawn-promise');
const getPresetPkgUrl = require('./getPresetPkgUrl');

const installDeps = (presets = []) => {
    console.log('Installing dependencies.', chalk.gray('Hang on ...'));

    const deps = ['ec-scripts'].concat(presets.map(getPresetPkgUrl));

    return spawn('npm', ['install', '--save-dev', ...deps]);
};

module.exports = installDeps;
