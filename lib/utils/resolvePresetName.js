const settings = require('../settings');

const resolvePresetName = (preset) => {
    // Extract repository name if git url was passed
    const matches = preset.match(settings.gitRepoNameRegEx);
    if (matches && matches.length) {
        return matches.pop();
    }

    // Test if simple preset name was passed
    if (settings.presetNameRegEx.test(preset)) {
        // Then prefix with 'ec-scripts-'
        return `ec-scripts-${preset}`;
    }

    return preset;
};

module.exports = resolvePresetName;
