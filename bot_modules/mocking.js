const Discord = require("discord.js");
const _util = require("./util");
const Command = require("./framework");

const util = new _util(null);

const Mocking = new Command();

Mocking.AddCommand("chkn,chicken,mock", (message, args, bot) => {
	args.shift();
	let words = args.join(" ").toLowerCase();

	let result = "";

	for (let i = 0; i < words.length; i++) {
		let letter = words[i]; result += i % 2 == 0 ? letter.toUpperCase() : letter;
	}

	message.channel.send(result, { file: "src/img/cock.png" }).catch(console.error);
});

Mocking.AddCommand("toxic,insult", (message, args, bot) => {
	let r = [
		"slob on me nobe",
		"suck me",
		"lol gay",
		"kiss your sister",
		"u have the big gay",
		"\\*inhale\\* young male",
		"consider death",
		"man fuck you",
		"suck my dick",
		"inhale my dong",
		"y-y-your mum :sunglasses:",
		"no suck, suck is dead",
		"no despacito for you",
		"how does this homo make gay sex time"
	];

	message.channel.send(r[util.rand(0, r.length)]).catch(console.error);
});

module.exports = exports = Mocking;
