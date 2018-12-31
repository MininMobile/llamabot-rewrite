const discord = require("discord.js");
const Command = require("./framework");

const Say = new Command();

Say.AddCommand("say", (message, args, bot) => {
	args.shift();

	message.channel.send(args.join(" ")).catch(console.error);

	if (message.guild.me.hasPermission("MANAGE_MESSAGES")) message.delete().catch((e) => s.message.channel.send(`DELETE ERROR: ${e}`));
});

Say.AddCommand("embed", (message, args, bot) => {
	args.shift();
	let words = args.join(" ");

	let embed = new discord.RichEmbed()
		.setAuthor(message.member.nickname || message.author.username, message.author.avatarURL)
		.setColor(message.member.displayColor)
		.setDescription(words);

	message.channel.send(embed).catch(console.error);

	if (message.guild.me.hasPermission("MANAGE_MESSAGES")) message.delete().catch((e) => s.message.channel.send(`DELETE ERROR: ${e}`));
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
