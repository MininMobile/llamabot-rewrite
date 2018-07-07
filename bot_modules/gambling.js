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

Gambling.AddCommand("roll", (message, args, bot) => {
	let sides = 6;

	if (args[1] != undefined) {
		if (!isNaN(parseInt(args[1]))) {
			sides = parseInt(args[1]);
		}
	}

	let roll = af.randomInt(1, sides);
	message.channel.send(`You rolled a ${roll}!`)
});

module.exports = exports = Gambling;
