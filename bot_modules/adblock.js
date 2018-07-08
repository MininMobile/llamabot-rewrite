const Discord = require("discord.js");
const fs = require("fs");
const Command = require("./framework");
const config = require("../config.json");

const Adblock = new Command();

Adblock.On("init", (scope) => {
	scope.adblock = {};
	scope.adblock.guilds = require("../json/adblock.json");
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
							s.message.delete();
						} else {
							s.message.channel.send(`I am missing \`MANAGE_MESSAGES\` permissions for adblock;\nIf you did not intend to enable adblock, type \`${config.prefix}adblock\`.`);
						}
					}
				}
				break;

			case "save":
				fs.writeFileSync("../json/adblock.json", JSON.stringify(s.adblock.guilds));
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

Adblock.AddCommand("adblock", (message, args, bot) => {
	if (message.author.id == "176048981615312897" && i.a[1] == "-s") {
		i.bf.adblock.on("save", i);
		message.reply("Saved JSON list for Adblock");
	} else if (message.member.hasPermission("MANAGE_MESSAGES")) {
		if (i.v.guilds_adblock.includes(message.guild.id)) {
			i.f.removeArrayObject(i.v.guilds_adblock, message.guild.id);
			message.channel.send(`Adblock disabled, type \`${message.content}\` to enable it.`);
			i.bf.adblock.on("save", i);
		} else {
			i.v.guilds_adblock.push(message.guild.id);
			message.channel.send(`Adblock enabled, type \`${message.content}\` to disable it.`);
			i.bf.adblock.on("save", i);
		}
	} else {
		message.reply("You do not have the `MANAGE_MESSAGES`")
	}
});

module.exports = exports = Adblock;
