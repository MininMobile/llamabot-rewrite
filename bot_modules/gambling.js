const af = require("minin-api-additionalfunctions");
const Discord = require("discord.js");
const Command = require("./framework");

const Gambling = new Command();

Gambling.AddCommand("8ball", (message, args, bot) => {
	let answers = [
		"Yes.",
		"No.",
		"Yes!",
		"No!",
		"Yes?",
		"No?",
		"Definitely",
		"Certainly",
		"Never!",
		"Never...",
		"Probably...",
		"Maybe..."
	];

	answer = af.randomInt(0, answers.length);
	message.channel.send(answers[answer]);
});

module.exports = exports = Gambling;
