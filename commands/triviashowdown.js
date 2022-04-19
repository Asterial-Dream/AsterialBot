// Credit goes to: @SupahSmore for the idea.

const { embed, MessageEmbed, MessageButton, MessageActionRow, Interaction, InteractionCollector } = require("discord.js")

async function promptQuestion(message, args) {
    const buttonA = new MessageButton()
        .setCustomId('AnswerA')
        .setLabel('A')
        .setStyle(1);
    const buttonB = new MessageButton()
        .setCustomId('AnswerB')
        .setLabel('B')
        .setStyle(1);
    const buttonC = new MessageButton()
        .setCustomId('AnswerC')
        .setLabel('C')
        .setStyle(1);
    const buttonD = new MessageButton()
        .setCustomId('AnswerD')
        .setLabel('D')
        .setStyle(1);


    const buttonOutputs = new MessageActionRow({ components: [buttonA, buttonB, buttonC, buttonD], type: 2 });

    const questionPrompt = new MessageEmbed()
        .addField('Answer A:', '**0** - 0%')
        .addField('Answer B:', '**0** - 0%')
        .addField('Answer C:', '**0** - 0%')
        .addField('Answer D:', '**0** - 0%')
        .setTitle('Prompt Test')
        .setColor(0x00AE86);

    message.channel.send({ embeds: [questionPrompt], components: [buttonOutputs] });

    return; 
}

function answerReciever(message, args, client) {
    const answerCollection = new InteractionCollector(client, { channel: message.channel, message: message, guild: message.guild, interactionType: 3, componentType: 2, time: 10000 });
    console.log(answerCollection.options.interactionType);
    const endCollection = function(collector) {
        collector.stop('Time Limit Exceeded');
        console.log('Time Limit Exceeded');
    };
    // message.channel.send(`Listening on ${answerCollection.options.channel.id} on ${answerCollection.options.guild.id} for message ${answerCollection.options.message.id}.`);
    console.log('Collection Started.');

    answerCollection.on('collect', (interaction) => {
        /*if (answerCollection.users.get(interaction.user.id)) {
            answerCollection.dispose(answerCollection.users.get(interaction.user.id));
            answerCollection.users.delete(interaction.user);
        } */
        interaction.reply(`User ${interaction.user.id} has interacted with an answer.`);
        answerCollection.handleCollect(interaction);
        console.log('Collection Detected');
    });

    return;
}

module.exports.triviaShowdown = function triviaShowdown(message, args, client) {
    client.once('messageCreate', (sentMessage) => {
        if (sentMessage.author.id === client.user.id) {
            client.off('messageCreate', () => { return; });
            console.log('Message Detected.');
            // message.channel.send(`Listening on ${sentMessage.channel.id} on ${sentMessage.guild.id} for message ${sentMessage.id}.`)
             answerReciever(sentMessage, args, client);
        }
        return;
    });

    promptQuestion(message, args);
    return;
};