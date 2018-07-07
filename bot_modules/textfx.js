const Discord = require("discord.js");
const Figlet = require("figlet");
const Lunicode = require("./lunicode");
const Command = require("./framework");

const luni = new Lunicode.Lunicode();

const Textfx = new Command();

Textfx.AddCommand("big", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	Figlet(words, (err, big) => {
		if (err) return message.reply(err);

		message.channel.send("```" + big + "```");
	});
});

Textfx.AddCommand("glitch", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	message.channel.send(luni.tools.creepify.encode(words));
});

module.exports = exports = Textfx;
