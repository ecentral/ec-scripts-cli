const chalk = require('chalk');
const spawn = require('cross-spawn-promise');
const getPresetPkgUrl = require('./getPresetPkgUrl');

// TODO: Remove git url when 'ready'
const ecScriptsPkgUrl = 'git+https://git@gitlab.ecentral.de/f.laukel/ec-scripts.git#feature/latest-feedback';

const installDeps = (presets = []) => {
    console.log('Installing dependencies.', chalk.gray('Hang on ...'));

    const deps = [ecScriptsPkgUrl].concat(presets.map(getPresetPkgUrl));

    return spawn('npm', ['install', '--save-dev', ...deps]);
};

module.exports = installDeps;
