const discord = require("discord.js");
const fs = require("fs");
const _util = require("./util");
const Command = require("./framework");
const config = require("../src/config.json");

const util = new _util(null);

const Adblock = new Command();

Adblock.On("init", (scope) => {
	scope.adblock = {};
	scope.adblock.guilds = require("../data/adblock.json");
	scope.adblock.call = (name, s) => {
		switch (name) {
			case "message":
				if (s.scope.adblock.guilds.includes(s.message.guild.id)) {
					if ((s.message.content.includes("http://") ||
						s.message.content.includes("https://") ||
						s.message.content.includes("discord.gg") ||
						s.message.content.includes("discord.io")) &&
						s.message.author.id != s.bot.user.id) {

						if (s.message.deletable && s.message.guild.me.hasPermission("MANAGE_MESSAGES")) {
							s.message.delete().catch((e) => s.message.channel.send(`ADBLOCK DELETION ERROR: ${e}`));
							console.log(`:: BLOCKED ${s.message.content}`);
						} else {
							s.message.channel.send(`I am missing \`MANAGE_MESSAGES\` permissions for adblock;\nIf you did not intend to enable adblock, type \`${config.prefix}adblock\`.`).catch(console.error);
							console.log(`:: FAILED BLOCK ${s.message.content}`);
						}
					}
				}
				break;

			case "save":
				console.log(":: SAVING ADBLOCK LIST");
				fs.writeFileSync("data/adblock.json", JSON.stringify(s.adblock.guilds));
				break;

			case "guildDelete":
				for (let i = 0; i < s.scope.adblock.guilds.length; i++) {
					if (s.scope.adblock.guilds[i] == s.guild.id) {
						s.scope.adblock.guilds.splice(i, 1);
						break;
					}
				}
				break;

			default:
				throw new Error("Invalid event");
		}
	}
});

Adblock.AddCommand("adblock", (message, args, bot, scope) => {
	if (message.author.id != "176048981615312897") {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you do not have the permission `MANAGE_MESSAGES`").catch(console.error);
		if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I do not have the permission `MANAGE_MESSAGES`").catch(console.error);
	}

	if (message.author.id == "176048981615312897" && args[1] == "-s") {
		scope.adblock.call("save", scope);
		message.reply("saved JSON list for adblock.").catch(console.error);
	} else {
		if (scope.adblock.guilds.includes(message.guild.id)) {
			util.removeArrayItem(scope.adblock.guilds, message.guild.id);
			
			message.channel.send(`Adblock disabled, type \`${config.prefix}${args[0]}\` to enable it.`).catch(console.error);
			scope.adblock.call("save", scope);
		} else {
			scope.adblock.guilds.push(message.guild.id);
			
			message.channel.send(`Adblock enabled, type \`${config.prefix}${args[0]}\` to disable it.`).catch(console.error);
			scope.adblock.call("save", scope);
		}
	}
});

module.exports = exports = Adblock;
