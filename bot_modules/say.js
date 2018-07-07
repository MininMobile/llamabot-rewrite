const Discord = require("discord.js");
const Command = require("./framework");

const Say = new Command();

Say.AddCommand("say", (message, args, bot) => {
	args.shift();

	message.channel.send(args.join(" "));

	if (message.guild.me.hasPermission("MANAGE_MESSAGES")) message.delete();
});

Say.AddCommand("cowsay", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	let topline = "";
	let botline = "";

	for (let i = 0; i != words.length + 2; i++) {
		topline += `_`;
		botline += `-`;
	}

	message.channel.send("```\
	\n " + topline + " \
	\n< " + words + " > \
	\n " + botline + " \
	\n		\\   ^__^ \
	\n		 \\  (oo)\\_______ \
	\n			(__)\\	   )\\/\\ \
	\n				||----w | \
	\n				||	 || \
	\n\
	\n\
	\n```");
});

module.exports = exports = Say;
