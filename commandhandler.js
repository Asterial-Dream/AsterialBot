const { triviaShowdown } = require('./commands/triviashowdown');

const tictactoe = require('./commands/tictactoe.js').tictactoe;
const shutdown = require('./commands/shutdown.js').shutdown;
const diceroll = require('./commands/diceroll.js').diceroll;
const myid = require('./commands/id.js').myid;
const balance = require('./commands/balance.js').balance;
const triviashowdown = require('./commands/triviashowdown').triviaShowdown;
const commandList = ['shutdown', 'diceroll', 'tictactoe', 'myid', 'balance', 'triviashowdown'];
const functionList = [shutdown, diceroll, tictactoe, myid, balance, triviaShowdown];

module.exports = async function commandhandler(message, client) {
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
        functionList[commandList.indexOf(args.at(1))](message, args, client);
        return;
    }
    else {
        message.channel.send('Invalid command. Please use one of the following: ' + commandList);
        return;
    }
};