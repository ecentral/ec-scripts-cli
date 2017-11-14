const path = require('path');
const fs = require('fs-extra');
const settings = require('../settings');

const createEcconf = (presets = []) => {
    console.log('Creating .ecconf.js');

    const filename = path.join(settings.appPath, '.ecconf.js');
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

module.exports = createEcconf;
