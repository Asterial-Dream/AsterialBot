const shutdown = require('./functions.js');
const diceroll = require('./functions.js');
const commandList = ['shutdown', 'diceroll'];
const functionList = [shutdown, diceroll];

module.exports = function commandhandler(message) {
    if (commandList.includes(message.content.substring(1))) {
        functionList[commandList.indexOf(message.content.substring(1))](message);
        return;
    }
    else {
        message.channel.send('Invalid command. Please use one of the following: ' + commandList);
    }
};
