const shutdown = require('./functions.js').shutdown;
const diceroll = require('./functions.js').diceroll;
const commandList = ['shutdown', 'diceroll'];
const functionList = [shutdown, diceroll];

module.exports = function commandhandler(message) {
    const args = [];
    let msg = message.content;

    // Gets prefix and seperates it.
    args.push(msg.at(0));
    msg = msg.replace(args.at(-1), '');

    // Seperates the commands and removes the whitespaces.
    while (msg.length != 0) {
        while (msg.at(0) == ' ') {
            msg = msg.replace(' ', '');
        }
        if (msg.search(' ') != -1) {
            args.push(msg.substr(0, msg.search(' ')));
            msg = msg.replace(args.at(-1), '');
        }
        else {
            args.push(msg);
            msg = msg.replace(args.at(-1), '');
        }
    }

    // TEST: message.channel.send(`Command Handler successfully ran through with arg list of... \n${args}`);

    // Now that is seperated, check for function validity...
    if (commandList.includes(args.at(1))) {
        functionList[commandList.indexOf(args.at(1))](message, args);
        return;
    }
    else {
        message.channel.send('Invalid command. Please use one of the following: ' + commandList);
        return;
    }
};