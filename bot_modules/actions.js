const Discord = require("discord.js");
const Command = require("./framework");

const Actions = new Command();

Actions.AddCommand("pisson", (message, args, bot) => {
	if (!vm(args)) return message.reply("invalid arguments, please mention the user correctly.");

	message.channel.send(`${message.author} pissed on ${args[1]}, right in their *smug* fucking face.`);
});

function vm(args) {
	if (args.length < 2) return false;
	if (!(args[1].startsWith("<@") && args[1].endsWith(">"))) return false;

	return true;
}

module.exports = exports = Actions;
