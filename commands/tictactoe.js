const { MessageEmbed } = require('discord.js');

module.exports.tictactoe = function tictactoe(message, arg) {
    const embed = new MessageEmbed()
        .setTitle('Tic Tac Toe')
        .setColor(0x00AE86)
        .setDescription('This is a tic tac toe game.\n\n' +
            'To play, type the number of the square you want to play.\n' +
            'The first player to get three in a row wins.')
        .setFooter('Made by: FastBot', 'https://i.imgur.com/wSTFkRM.png');

    message.channel.send({ embeds: [embed] });
};
