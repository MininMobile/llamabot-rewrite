const discord = require("discord.js");
const _util = require("./util");
const Command = require("./framework");

const util = new _util();

const Gambling = new Command();

Gambling.AddCommand("8ball,truth", (message, args, bot) => {
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

	answer = util.rand(0, answers.length);
	message.channel.send(answers[answer]).catch(console.error);
});

Gambling.AddCommand("roll", (message, args, bot) => {
	let sides = 6;

	if (args[1] != undefined) {
		if (!isNaN(parseInt(args[1]))) {
			sides = parseInt(args[1]);
		}
	}

	let roll = util.rand(1, sides);
	message.channel.send(`You rolled a ${roll}!`).catch(console.error);
});

Gambling.AddCommand("flip", (message, args, bot) => {
	let sides = [
		"src/img/heads.png",
		"src/img/tails.png"
	];

	let sideNames = [
		"heads",
		"tails"
	];

	let side = util.rand(1, 2);

	let embed = new discord.RichEmbed()
		.attachFile(new discord.Attachment(sides[side-1], "coin.png"))
		.setDescription(`You've flipped a **${sideNames[side-1]}**!`)
		.setImage("attachment://coin.png");

	message.channel.send(embed).catch(console.error);
});

module.exports = exports = Gambling;
