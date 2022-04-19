const fs = require('fs');
const User = require('../user.js').User;

module.exports.userDataSearch = function search(message, args) {
    const userData = new User(message.author.id);
    let data = undefined;

    try {
        data = fs.readFileSync('./user/' + message.guildId + 'userCache', 'utf-8');
    }
    catch (err) {
        console.log('An error has occured, please contact an Administraitor.');
        return;
    }

    if (data.indexOf(message.author.id) >= 0) {
        const userIDIndex = data.indexOf(message.author.id);
        // TEST (User Check) - message.channel.send(`User ${message.author.id}, found.`);
        // TEST (Value Check) - message.channel.send(`Returning user data...\n [1] ${message.author.id} \n [2] ${data.substring(data.indexOf('M:', userIDIndex) + 2, data.indexOf('\n', userIDIndex))}`);
        // return [message.author.id, parseInt(data.substring(data.indexOf('M:', userIDIndex) + 2, data.indexOf('\n', userIDIndex)))];
        userData.setFastBux(parseInt(data.substring(data.indexOf('M:', userIDIndex) + 2, data.indexOf('\n', userIDIndex))));
        return userData;
    }
    else {
        fs.appendFile('./user/' + message.guildId + 'userCache', userData.toData(message), err => {
            if (err) {
                console.log(err);
            }
        });
    }

    console.log(userData.getuserId());
    console.log(userData.getFastBux());
    return userData;
};