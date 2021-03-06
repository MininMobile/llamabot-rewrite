const discord = require("discord.js");
const fs = require("fs");
const Command = require("./framework");
const config = require("../src/config.json");

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
		if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("you do not have the permission `MANAGE_SERVER`").catch(console.error);
	}

	args.shift();

	if (message.author.id == "176048981615312897" && args[0] == "-s") {
		scope.usrcmd.call("save", scope);
		message.reply("saved JSON list for user commands.").catch(console.error);
	} else {
		if (args.length == 1 && scope.usrcmd.commands[message.guild.id][args[0]]) {
			delete scope.usrcmd.commands[message.guild.id][args[0]];

			message.channel.send(`Command removed, you can still add it back again!`).catch(console.error);
			scope.usrcmd.call("save", scope);
		} else if (args.length > 1) {
			scope.usrcmd.commands[message.guild.id][args[0]] = args.slice(1, args.length).join(" ");

			message.channel.send(`Command added/updated, you can use it with \`${config.prefix}${args[0]}\` and use \`${config.prefix}command ${args[0]}\` to delete it.`)
				.then((m) => { setTimeout(() => { m.delete(); }, 5000) });
			scope.usrcmd.call("save", scope);
		} else {
			message.reply("not enough arguments.").catch(console.error);
		}
	}
});

module.exports = exports = Commands;
