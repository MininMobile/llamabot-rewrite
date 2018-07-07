const Discord = require("discord.js");
const IsOnline = require("is-reachable");
const Command = require("./framework");
const config = require("../config.json");

const Webutil = new Command();

Webutil.AddCommand("online", (message, args, bot) => {
	if (args.length > 1) {
		args.shift();
		let words = args.join(" ");

		IsOnline(words).then((res) => {
			if (res) {
				message.channel.send(`:satellite: ${words} is online!`);
			} else {
				message.channel.send(`:satellite_orbital: ${words} is offline!`);
			}
		});
	} else {
		message.reply(`Enter a URL to ping, eg. \`${config.prefix}${args[0]} duckduckgo.com\``);
	}
});

module.exports = exports = Webutil;
