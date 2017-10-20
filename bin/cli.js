#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn-promise');

const cliPkg = require('../package.json');
const appPath = process.cwd();
const appPkgPath = path.resolve(appPath, 'package.json');
const appNodeModulesPath = path.resolve(appPath, 'node_modules');
const ecScriptsPath = path.resolve(appNodeModulesPath, 'ec-scripts');
// TODO: Remove feature branch when 'ready'
const ecScriptsPkgUrl = 'git+https://git@gitlab.ecentral.de/f.laukel/ec-scripts.git#feature/ec-cli-templates';

const getBanner = (v) => (`
       ____ 
  ___ / ___|
 / _ \\ |    
|  __/ |___ 
 \\___|\\____| CLI v${v}
`);

const initAppPkg = () => {
    console.log('Creating package.json');

    return spawn('npm', ['init', '--yes']);
};

const installDeps = () => {
    console.log('Installing dependencies.', chalk.gray('Hang on ...'));

    return spawn('npm', ['i', '--save-dev', ecScriptsPkgUrl]/*, { stdio: 'inherit' } */);
};

const updateAppPkg = () => {
    console.log('Updating package.json scripts');

    const pkg = require(appPkgPath);
    const ecScriptsPkg = require(path.join(ecScriptsPath, 'resources/package.json'));
    const updatedPkg = Object.assign({}, pkg, ecScriptsPkg);

    return fs.writeFile(appPkgPath, JSON.stringify(updatedPkg, null, 2));
};

const initEcScripts = () => {
    console.log('Initialize ec-scripts');

    return spawn('npm', ['run', 'init']);
};

const prepareBoilerplate = () => {
    console.log('Preparing project structure');

    return Promise.all([
        // Copy project boilerplate files.
        fs.copy(
            path.join(ecScriptsPath, 'boilerplate'),
            appPath
        ),
        // Create .gitignore file from template if not existing.
        fs.copy(
            path.join(ecScriptsPath, 'resources/gitignore.tmpl'),
            path.join(appPath, '.gitignore'),
            { overwrite: false }
        )
    ]);
};

const run = async () => {
    console.log(chalk.cyan(getBanner(cliPkg.version)));
    console.log();

    await initAppPkg();
    await installDeps();
    await updateAppPkg();

    await Promise.all([
        initEcScripts(),
        prepareBoilerplate(),
    ]);

    console.log();
    console.log(chalk.green.bold('ALL DONE!'));
    console.log();
    console.log('Your project is now ready.');
    console.log('Run', chalk.yellow('npm start'), 'to start the dev server.');

    process.exit();
};

// TODO: Accept some args and make ec-cli little more 'interactive'
// Don't just do this:
run();
