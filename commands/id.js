module.exports.myid = function myid(message, args) {
    message.channel.send(`Your ID is ${message.author.id}`);
    return;
};