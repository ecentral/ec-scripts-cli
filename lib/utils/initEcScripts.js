const spawn = require('cross-spawn-promise');

const initEcScripts = () => {
    console.log('Initialize ec-scripts');

    return spawn('npm', ['run', 'init']);
};

module.exports = initEcScripts;
