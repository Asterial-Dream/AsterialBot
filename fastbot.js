import commandhandler from './commandhandler.js'; 
// Require the necessary discord.js classes //
const { Client, Intents, ClientUser } = require('discord.js');
const { token } = require('./config.json');

// Creates a new client instance //
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (ONLY ONCE) //
client.once('ready', () => {
	console.log('Ready!');
});


// Login to Discord with your client's token //
client.login(token);


// When the client receives a message from a certain user, run this code //
client.on('messageCreate', async message => {
	if (message.author.id != client.user.id) {
		await (message.channel.send(`${message.author.username} typed in ${message.content}`));
		message.channel.send(`Prefix: ${message.content.charAt(0)} \nContent: ${message.content.substring(1)}`);
		const prefix = message.content.charAt(0);
		const content = message.content.substring(1);
		return;
	}
	else {
		return;
	}
});
