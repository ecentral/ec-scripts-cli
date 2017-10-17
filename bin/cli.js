#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn-promise');

const getBanner = (v) => (`
       ____ 
  ___ / ___|
 / _ \\ |    
|  __/ |___ 
 \\___|\\____| CLI v${v}
`);

const appPath = process.cwd();
const cliPkg = require('../package.json');
const pkgPath = path.resolve(appPath, 'package.json');
const appNodeModulesPath = path.resolve(appPath, 'node_modules');
const ecScriptsPath = path.resolve(appNodeModulesPath, 'ec-scripts');
// TODO: Remove feature branch when 'ready'
const ecScriptsPkgUrl = 'git+https://git@gitlab.ecentral.de/f.laukel/ec-scripts.git#feature/ec-cli-templates';

const run = async () => {
    console.log(chalk.cyan(getBanner(cliPkg.version)));
    console.log();

    console.log('Creating package.json');
    await spawn('npm', ['init', '--yes']);

    console.log('Installing dependencies.', chalk.gray('Hang on ...'));
    console.log();
    await spawn('npm', ['i', '--save-dev', ecScriptsPkgUrl], { stdio: 'inherit' });
    console.log();

    console.log('Updating package.json scripts');
    const pkg = require(pkgPath);
    const ecScriptsPkg = require(path.join(ecScriptsPath, 'resources/package.json'));
    const updatedPkg = {
        ...pkg,
        ...ecScriptsPkg,
    };

    fs.writeFileSync(pkgPath, JSON.stringify(updatedPkg, null, 2));

    console.log('Preparing project structure');
    // TODO: Find out why .gitignore is not copied
    await fs.copy(
        path.join(ecScriptsPath, 'boilerplate'),
        appPath
    );

    console.log('Initialize ec-scripts');
    await spawn('npm', ['run', 'init']);

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
