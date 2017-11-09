const settings = require('../settings');
const resolvePresetName = require('./resolvePresetName');

const getPresetPkgUrl = (preset) => {
    if (settings.presetNameRegEx.test(preset)) {
        // TODO: Remove url wrap when 'ready'
        return `git+https://git@gitlab.ecentral.de/f.laukel/${resolvePresetName(preset)}.git`;
    }

    return preset;
};

module.exports = getPresetPkgUrl;
