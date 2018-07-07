const Discord = require("discord.js");
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

module.exports = exports = Mocking;
