const discord = require("discord.js");
const Figlet = require("figlet");
const Lunicode = require("./lunicode");
const Command = require("./framework");

const luni = new Lunicode.Lunicode();

const Textfx = new Command();

Textfx.AddCommand("big", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	Figlet(words, (err, big) => {
		if (err) return message.reply(err).catch(console.error);

		message.channel.send("```" + big + "```").catch(console.error);
	});
});

Textfx.AddCommand("glitch", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	message.channel.send(luni.tools.creepify.encode(words)).catch(console.error);
});

Textfx.AddCommand("tiny", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	message.channel.send(luni.tools.tiny.encode(words)).catch(console.error);
});

Textfx.AddCommand("bubble", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	message.channel.send(luni.tools.bubbles.encode(words)).catch(console.error);
});

Textfx.AddCommand("square", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	message.channel.send(luni.tools.roundsquares.encode(words)).catch(console.error);
});

Textfx.AddCommand("creepify", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	message.channel.send(luni.tools.bent.encode(words)).catch(console.error);
});

module.exports = exports = Textfx;
