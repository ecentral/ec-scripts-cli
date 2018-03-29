const path = require('path');
const fs = require('fs-extra');
const settings = require('../settings');
const resolvePresetName = require('./resolvePresetName');

const createEcconf = (presets = []) => {
    console.log('Creating .ecconf.js');

    const filename = path.join(settings.appPath, '.ecconf.js');
    const presetNames = presets
        // resolve possible git urls
        .map(resolvePresetName)
        // remove prefix; so instead of `ec-scripts-preset-foo` we only use `foo` in ecconf
        .map(preset => preset.replace(settings.presetNamePrefix, ''));
    const formattedPresets = `[${presetNames.map(preset => `'${preset}'`).join(', ')}]`;
    const content = (
        `
module.exports = {
    presets: ${formattedPresets},
};
        `
    ).trim().concat('\n');

    return fs.writeFile(filename, content);
};

module.exports = createEcconf;
