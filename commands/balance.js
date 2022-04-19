const userDataSearch = require('../user/data_interpreter/data.js').userDataSearch;
const { MessageEmbed } = require('discord.js');

module.exports.balance = function(message, args) {
    const userData = userDataSearch(message, args);
    const embed = new MessageEmbed()
        .setImage(message.author.avatarURL())
        .setColor(0x00AE86)
        .setDescription(`${message.author.username}'s Balance. \n${userData.getFastBux()} **F$**`);

    message.channel.send({ embeds: [embed] });
    message.channel.send(`User ${userData.getuserId()}, Balance: ${userData.getFastBux()}`);
};