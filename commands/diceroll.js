module.exports.diceroll = function diceroll(message, args) {
    const dice = Math.floor(Math.random() * 6 + 1);
    message.channel.send(`You rolled a ${dice}`);
};