#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn-promise');
const yargs = require('yargs');

const cliPkg = require('../package.json');
const appPath = process.cwd();
const appPkgPath = path.resolve(appPath, 'package.json');
const appNodeModulesPath = path.resolve(appPath, 'node_modules');
// TODO: Remove feature branch when 'ready'
const ecScriptsPkgUrl = 'git+https://git@gitlab.ecentral.de/f.laukel/ec-scripts.git#feature/latest-feedback';
// Extract repository name if git url is passed (use last match)
const gitRepoNameRegEx = /\/([a-z0-9\-]*)\.git*/i;
// Check if preset contains only characters, numbers and -
const presetNameRegEx = /^[a-z0-9\-]+$/i;

const getModulePath = (pkgName) => path.resolve(appNodeModulesPath, pkgName);
const resolvePresetName = (preset) => {
    // Extract repository name if git url was passed
    const matches = preset.match(gitRepoNameRegEx);
    if (matches && matches.length) {
        console.log('resolvePresetName:', preset, '->', matches.slice(-1)[0]);
        return matches.pop();
    }

    // Test if simple preset name was passed
    if (presetNameRegEx.test(preset)) {
        // Then prefix with 'ec-scripts-'
        return `ec-scripts-${preset}`;
    }

    return preset;
};
const getPresetPkgUrl = (preset) => {
    if (presetNameRegEx.test(preset)) {
        // TODO: Remove url wrap when 'ready'
        return `git+https://git@gitlab.ecentral.de/f.laukel/${resolvePresetName(preset)}.git`;
    }

    return preset
};

const getBanner = (v) => chalk.cyan(`
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

const installDeps = (presets = []) => {
    console.log('Installing dependencies.', chalk.gray('Hang on ...'));

    const deps = [ecScriptsPkgUrl].concat(presets.map(getPresetPkgUrl));

    return spawn('npm', ['install', '--save-dev', ...deps]/*, { stdio: 'inherit' } */);
};

const updateAppPkg = () => {
    console.log('Updating package.json scripts');

    const pkg = require(appPkgPath);
    const ecScriptsPkg = require(path.join(getModulePath('ec-scripts'), 'resources/package.json'));
    const updatedPkg = Object.assign({}, pkg, ecScriptsPkg);

    return fs.writeFile(appPkgPath, JSON.stringify(updatedPkg, null, 2));
};

const createEcconf = (presets = []) => {
    console.log('Creating .ecconf.js');

    const filename = path.join(appPath, '.ecconf.js');
    const formattedPresets = `[${presets.map(preset => `'${preset}'`).join(', ')}]`;
    const content = (
        `
module.exports = {
    presets: ${formattedPresets},
};
        `
    ).trim().concat('\n');

    return fs.writeFile(filename, content);
};

const initEcScripts = () => {
    console.log('Initialize ec-scripts');

    return spawn('npm', ['run', 'init']);
};

const prepareBoilerplate = async (presets = []) => {
    console.log('Preparing project structure');

    // Look for boilerplate/ folder in preset package and copy contents to project folder.
    await [
        'ec-scripts',
        ...presets.map(resolvePresetName)
    ]
        .map(module => path.join(getModulePath(module), 'boilerplate'))
        .filter(boilerplatePath => fs.existsSync(boilerplatePath))
        // These operations need to run sequentially.
        .reduce((current, boilerplatePath) => (
            current.then(() => fs.copy(
                boilerplatePath,
                appPath
            ))
        ), Promise.resolve());

    // Create .gitignore file from template if not existing.
    await fs.copy(
        path.join(getModulePath('ec-scripts'), 'resources/gitignore.tmpl'),
        path.join(appPath, '.gitignore'),
        { overwrite: false }
    );

    return Promise.resolve();
};

const run = async (argv) => {
    console.log(getBanner(cliPkg.version));

    console.log('Using presets:', argv.presets.length ? argv.presets : chalk.gray('none'));
    console.log();

    await initAppPkg();
    await installDeps(argv.presets);
    await updateAppPkg();
    if (argv.presets.length) {
        await createEcconf(argv.presets);
    }

    await Promise.all([
        initEcScripts(),
        prepareBoilerplate(argv.presets),
    ]);

    console.log();
    console.log(chalk.green.bold('ALL DONE!'));
    console.log();
    console.log('Your project is now ready.');
    console.log('Run', chalk.yellow('npm start'), 'to start the dev server.');

    process.exit();
};

run(
    yargs
        .command('init [presets..]', 'Initialize ec-scripts app in current directory.')
        .option('presets', {
            type: 'array',
            default: [],
            describe: 'The optional presets you want to use.',
        })
        .help()
        .usage(getBanner(cliPkg.version))
        .alias('v', 'version')
        .alias('h', 'help')
        .demandCommand()
        .strict()
        .argv
);
