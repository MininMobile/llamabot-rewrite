const Discord = require("discord.js");
const Command = require("./framework");

const Say = new Command();

Say.AddCommand("say", (message, args, bot) => {
	args.shift();

	message.channel.send(args.join(" "));

	if (message.guild.me.hasPermission("MANAGE_MESSAGES")) message.delete();
});

module.exports = exports = Say;
