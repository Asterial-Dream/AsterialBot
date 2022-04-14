module.exports = function shutdown(message) {
    console.log('Shutting down...');
    process.exit();
};

module.exports = function diceroll(message) {
    const dice = Math.floor(Math.random() * 6 + 1);
    message.channel.send(`You rolled a ${dice}`);
};