const Discord = require("discord.js");
const Command = require("./framework");
const config = require("../config.json");

const Mathc = new Command();

Mathc.AddCommand("add", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``);

	args.shift();

	let r = 0;

	args.forEach((num) => { r += parseInt(num); });

	message.channel.send(r);
});

function va(a) {
	let args = a.slice(1, a.length);

	r = true;

	if (args.length < 2) r = false;
	args.forEach((num) => { if (isNaN(parseInt(num))) r = false; });

	return r;
}

module.exports = exports = Mathc;
