const Discord = require("discord.js");
const Figlet = require("figlet");
const Command = require("./framework");

const Textfx = new Command();

Textfx.AddCommand("big", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	Figlet(words, (err, big) => {
		if (err) return message.reply(err);

		message.channel.send("```" + big + "```");
	});
});

module.exports = exports = Textfx;
