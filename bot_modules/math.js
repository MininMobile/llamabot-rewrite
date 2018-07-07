const Discord = require("discord.js");
const Command = require("./framework");
const config = require("../config.json");

const Mathc = new Command();

Mathc.AddCommand("add", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``);

	let num1 = parseInt(args[1]);
	let num2 = parseInt(args[2]);

	message.channel.send(num1 + num2);
});

function va(args) {
	return false;
}

module.exports = exports = Mathc;
