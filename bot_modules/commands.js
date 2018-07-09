const Discord = require("discord.js");
const fs = require("fs");
const Command = require("./framework");

const Commands = new Command();

Commands.On("init", (scope) => {
	let bot = scope.bot;

	scope.usrcmd = {};
	scope.usrcmd.commands = require("../data/commands.json");
	scope.usrcmd.call = (name, s) => {
		switch (name) {
			case "save":
				console.log(":: SAVING CUSTOM COMMANDS");
				fs.writeFileSync("data/commands.json", JSON.stringify(s.usrcmd.commands));
				break;

			default:
				throw new Error("invalid event");
		}
	}
	
	bot.guilds.array().forEach((guild) => {
		if (!Object.keys(scope.usrcmd.commands).includes(guild.id))
			scope.usrcmd.commands[guild.id] = {};
	});
});

Commands.AddCommand("command", (message, args, bot, scope) => {
	if (message.author.id != "176048981615312897") {
		if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("you do not have the permission `MANAGE_SERVER`");
	}

	args.shift();

	if (message.author.id == "176048981615312897" && args[0] == "-s") {
		scope.usrcmd.call("save", scope);
		message.reply("saved JSON list for user commands.");
	} else {
		if (args.length == 1 && scope.usrcmd.commands[message.guild.id][args[0]]) {
			delete scope.usrcmd.commands[message.guild.id][args[0]];
			
			message.channel.send(`Command removed, you can still add it back again!`);
			scope.usrcmd.call("save", scope);
		} else if (args.length > 1) {
			scope.usrcmd.commands[message.guild.id][args[0]] = words;

			message.channel.send(`Command added/updated, type \`${config.prefix}command ${args[1]}\` to delete it.`);
			scope.usrcmd.call("save", scope);
		} else {
			message.reply("not enough arguments.");
		}
	}
});

module.exports = exports = Commands;
