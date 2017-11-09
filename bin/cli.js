#!/usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');

const getBanner = require('../lib/utils/getBanner');
const initAppPkg = require('../lib/utils/initAppPkg');
const installDeps = require('../lib/utils/installDeps');
const updateAppPkg = require('../lib/utils/updateAppPkg');
const createEcconf = require('../lib/utils/createEcconf');
const initEcScripts = require('../lib/utils/initEcScripts');
const prepareBoilerplate = require('../lib/utils/prepareBoilerplate');
const { version } = require('../package.json');

const run = async (argv) => {
    console.log(getBanner(version));

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
        .command(
            'init [presets..]',
            'Initialize ec-scripts project in current directory.',
            (cmd) => {
                cmd.option('presets', {
                    type: 'array',
                    default: [],
                    describe: 'The optional presets you want to use.',
                });
            })
        .example(
            '$0 init react git://github.com/user/some-preset.git',
            'Initializes a new ec-scripts project with React preset and a custom preset from git.'
        )
        .help()
        .usage(getBanner(version))
        .alias('v', 'version')
        .alias('h', 'help')
        .demandCommand()
        .strict()
        .argv
);
