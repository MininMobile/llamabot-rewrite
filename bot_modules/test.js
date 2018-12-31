const discord = require("discord.js");
const Command = require("./framework");

const Test = new Command();

Test.AddCommand("test", (message, args, bot) => {
	message.channel.send("Hello, World!").catch(console.error);
});

module.exports = exports = Test;
