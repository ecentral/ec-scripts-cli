#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn-promise');

// TODO: This should be provided by ec-scripts
const pkgScripts = {
    'init': 'cross-env NODE_ENV=development ec-scripts --init',
    'start': 'cross-env NODE_ENV=development ec-scripts --start',
    'build': 'cross-env NODE_ENV=production ec-scripts --build',
    'build-watch': 'cross-env NODE_ENV=production ec-scripts --build --watch',
    'test': 'cross-env NODE_ENV=test ec-scripts --test',
    'config': 'cross-env NODE_ENV=development ec-scripts --show-config',
};

const appPath = process.cwd();
const pkgPath = path.resolve(appPath, 'package.json');
const ecScriptsPkg = 'git+https://git@gitlab.ecentral.de/f.laukel/ec-scripts.git';

const run = async () => {
    console.log('Creating package.json ...');
    await spawn('npm', ['init', '--yes']);

    console.log('Installing dependencies. Hang on ...');
    await spawn('npm', ['i', '--save', ecScriptsPkg]);

    console.log('Updating package.json scripts ...');
    const pkg = require(pkgPath);
    const updatedPkg = {
        ...pkg,
        scripts: {
            ...pkgScripts,
        },
    };

    fs.writeFileSync(pkgPath, JSON.stringify(updatedPkg, null, 2));

    // TODO: Add .gitignore (defaults provided by ec-scripts)
    // TODO: Add src/ files (defaults provided by ec-scripts)

    console.log('Initialize ec-scripts ...');
    await spawn('npm', ['run', 'init']);

    console.log('ALL DONE!');
    process.exit();
};

// TODO: Accept some args and make ec-cli little more 'interactive'
// Don't just do this:
run();
