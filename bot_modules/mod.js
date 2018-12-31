const discord = require("discord.js");
const Command = require("./framework");
const config = require("../src/config.json");

const Mod = new Command();

Mod.AddCommand("clear", (message, args, bot) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have the `MANAGE_MESSAGES` permission.").catch(console.error);

	if (args.length >= 2) {
		// NaN error
		if (isNaN(parseInt(args[1]))) return message.channel.send(`Invalid use of \`${config.prefix}${args[0]}\`, provided amount is not a number.`).catch(console.error);
		// cannot undelete messages error
		if (parseInt(args[1]) < 0) return message.channel.send(`Invalid use of \`${config.prefix}${args[0]}\`, provided amount is smaller than 0.`).catch(console.error);
		// cannot delete >100 messages error
		if (parseInt(args[1]) > 99) return message.channel.send(`Invalid use of \`${config.prefix}${args[0]}\`, cannot delete more than 99 messages due to a discord limitation.`).catch(console.error);

		message.channel.bulkDelete(parseInt(args[1]) + 1).catch((e) => message.channel.send(`ERROR: ${"```"}${e}${"```"}`));
	} else {
		// not enough args error
		message.channel.send(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 9\` (max 99)`).catch(console.error);
	}
});

Mod.AddCommand("purge", (message, args, bot) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have the `MANAGE_MESSAGES` permission.").catch(console.error);

	message.channel.bulkDelete(100).catch((e) => message.channel.send(`ERROR: ${"```"}${e}${"```"}`));
});

module.exports = exports = Mod;
