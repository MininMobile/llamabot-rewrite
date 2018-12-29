const Discord = require("discord.js");
const _util = require("./util");
const util = new _util();
const Command = require("./framework");

const rps = new Command();

rps.AddCommand("rps,rockpaperscissors", (message, args, bot) => {
	if (args[1] == null || undefined) return message.reply("enter `rock`, `paper`, or `scissors`, BUSTER!");

	const o = ["Rock", "Paper", "Scissors"];
	let bC = util.rand(1, 3) - 1;
	let uC;

	// get user input
	if (args[1].toLowerCase() == "gun")
		return message.channel.send("*dies lol*").catch(console.error);
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
		message.channel.send(`${o[bC]}, draw...`).catch(console.error);
	else if (uC < 0)
		message.channel.send("Hacker! You can't choose that!").catch(console.error);
	else if (uC == 2 && bC == 0)
		message.channel.send(`${o[bC]}, I win!`).catch(console.error);
	else if (uC == 2 && bC == 1)
		message.channel.send(`${o[bC]}, you win!`).catch(console.error);
	else if (uC == 1 && bC == 0)
		message.channel.send(`${o[bC]}, you win!`).catch(console.error);
	else if (uC == 1 && bC == 2)
		message.channel.send(`${o[bC]}, I win!`).catch(console.error);
	else if (uC == 0 && bC == 1)
		message.channel.send(`${o[bC]}, I win!`).catch(console.error);
	else if (uC == 0 && bC == 2)
		message.channel.send(`${o[bC]}, you win!`).catch(console.error);
	else
		message.channel.send("Something bad happened! Maybe you cheated? Anyway it's a draw...").catch(console.error);
});

module.exports = exports = rps;
