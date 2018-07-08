const Discord = require("discord.js");
const af = require("minin-api-additionalfunctions");
const Command = require("./framework");

const rps = new Command();

rps.AddCommand("rps,rockpaperscissors", (message, args, bot) => {
	if (args[1] == null || undefined) return message.reply("enter `rock`, `paper`, or `scissors`, BUSTER!");

	const o = ["Rock", "Paper", "Scissors"];
	let bC = af.randomInt(1, 3) - 1;
	let uC;

	// get user input
	if (args[1].toLowerCase() == "gun")
		return message.channel.send("*dies lol*");
	else if (args[1].toLowerCase() == "rock")
		uC = 0;
	else if (args[1].toLowerCase() == "paper")
		uC = 1;
	else if (args[1].toLowerCase() == "scissors")
		uC = 2;
	else
		uC = -1;

	// get victor
	if (uC == bC)
		message.channel.send(`${o[bC]}, draw...`);
	else if (uC < 0)
		message.channel.send("Hacker! You can't choose that!");
	else if (uC == 2 && bC == 0)
		message.channel.send(`${o[bC]}, I win!`);
	else if (uC == 2 && bC == 1)
		message.channel.send(`${o[bC]}, you win!`);
	else if (uC == 1 && bC == 0)
		message.channel.send(`${o[bC]}, you win!`);
	else if (uC == 1 && bC == 2)
		message.channel.send(`${o[bC]}, I win!`);
	else if (uC == 0 && bC == 1)
		message.channel.send(`${o[bC]}, I win!`);
	else if (uC == 0 && bC == 2)
		message.channel.send(`${o[bC]}, you win!`);
	else
		message.channel.send("Something bad happened! Maybe you cheated? Anyway it's a draw...");
});

module.exports = exports = rps;
