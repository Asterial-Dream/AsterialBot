// Credit goes to: @SupahSmore for the idea.

const { embed, MessageEmbed, MessageButton, MessageActionRow, Interaction, InteractionCollector } = require("discord.js")


class questionPrompt {
    constructor(question) {
        this.aSel = 0;
        this.bSel = 0;
        this.cSel = 0;
        this.dSel = 0;

        this.questionEmbed = new MessageEmbed()
            .setTitle(question)
            .setColor('#0099ff')
            .addField('Answer A', `**${this.aSel}**`)
            .addField('Answer B', `**${this.bSel}**`)
            .addField('Answer C', `**${this.cSel}**`)
            .addField('Answer D', `**${this.dSel}**`);
    }
    // Mutators
    updatePrompt() {
        this.questionEmbed.splice(0, 1, `Answer A', **${this.aSel}**`);
        this.questionEmbed.splice(1, 1, `Answer B', **${this.bSel}**`);
        this.questionEmbed.splice(2, 1, `Answer C', **${this.cSel}**`);
        this.questionEmbed.splice(3, 1, `Answer D', **${this.dSel}**`);
    }

    updateASum(sum) {
        this.aSel = sum;
    }

    updateBSum(sum) {
        this.bSel = sum;
    }

    updateCSum(sum) {
        this.cSel = sum;
    }

    updateDSum(sum) {
        this.dSel = sum;
    }

    // Accessors
    getASum() {
        return this.aSel;
    }

    getBSum() {
        return this.bSel;
    }

    getCSum() {
        return this.cSel;
    }

    getDSum() {
        return this.dSel;
    }

    getEmbed() {
        return this.questionEmbed;
    }
}


function questionPromptCreate(question) {
    const prompt = new questionPrompt(question);
    return prompt;
}


async function promptQuestion(message, args) {

    const prompt = questionPromptCreate('Test Prompt');

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

    message.channel.send({ embeds: [prompt.getEmbed()], components: [buttonOutputs] });

    return;
}

function answerReciever(message, args, client) {
    const answerCollection = new InteractionCollector(client, { channel: message.channel, message: message, guild: message.guild, interactionType: 3, componentType: 2 });
    console.log(answerCollection.options.interactionType);
    const endCollection = function(collector) {
        collector.stop('Time ran out.');
        console.log('Time Limit Exceeded');
        answerCollection.off('collect', () => { return; });
        return;
    };
    // message.channel.send(`Listening on ${answerCollection.options.channel.id} on ${answerCollection.options.guild.id} for message ${answerCollection.options.message.id}.`);
    console.log('Collection Started.');
    setTimeout(endCollection, 5000, answerCollection);


    answerCollection.on('collect', (interaction) => {
        console.log('Answer Collected.');
        interaction.reply()
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