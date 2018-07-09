const Discord = require("discord.js");
const Command = require("./framework");

const Commands = new Command();

Commands.On("init", (scope) => {
	let bot = scope.bot;

	scope.usrcmd = {};
	scope.usrcmd.commands = require("../data/commands.json");
	scope.usrcmd.call = (name, s) => {

	}
	
	bot.guilds.array().forEach((guild) => {
		if (!Object.keys(scope.usrcmd.commands).includes(guild.id))
			scope.usrcmd.commands[guild.id] = {};
	});
});

Commands.AddCommand("command", (message, args, bot) => {
	message.channel.send("Hello, World!");
});

module.exports = exports = Commands;
