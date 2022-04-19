module.exports.User = class User {

// Constructor w/ Data Variables
    constructor(id, cash) {
        if (cash === undefined) {
        this.id = id;
        this.fastbux = 0;
        }
        else {
            this.id = id;
            this.fastbux = cash;
        }
    }

// Setter Functions
    setFastBux(number) {
        this.fastbux = number;
    }

// Getter Functions
    getuserId() {
        return this.id;
    }
    getFastBux() {
        return this.fastbux;
    }

// Other Functions
    toData(message) {
        message.channel.send(`Registered ${this.id} with ${this.fastbux} **F$**.`);
        return this.id + ' , M:' + this.fastbux + '\n';
    }
};