const Discord = require("discord.js");
const af = require("minin-api-additionalfunctions");
const Command = require("./framework");

const Mocking = new Command();

Mocking.AddCommand("chkn", (message, args, bot) => {
	args.shift();
	let words = args.join(" ").toLowerCase();

	let result = "";

	for (let i = 0; i < words.length; i++) {
		let letter = words[i]; result += i % 2 == 0 ? letter.toUpperCase() : letter;
	}

	message.channel.send(result, { file: "src/img/cock.png" });
});

Mocking.AddCommand("toxic", (message, args, bot) => {
	let r = [
		"slob on me nobe",
		"suck me",
		"lol gay",
		"kiss your sister",
		"u have the big gay",
		"no u",
		"consider death",
		"man fuck you",
		"suck my dick",
		"inhale my dong",
		"y-y-your mum :sunglasses:",
		"no suck, suck is dead"
	];

	message.channel.send(r[af.randomInt(0, r.length)]);
});

module.exports = exports = Mocking;
