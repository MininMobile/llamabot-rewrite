const Discord = require("discord.js");
const Command = require("./framework");

const Actions = new Command();

Actions.AddCommand("pisson", (message, args, bot) => {
	if (!vm(args)) return message.reply("invalid arguments, please mention the user correctly.");

	message.channel.send(`${message.author} pissed on ${args[1]}, right in their little, *smug* face.`).catch(console.error);
});

Actions.AddCommand("spiton", (message, args, bot) => {
	if (!vm(args)) return message.reply("invalid arguments, please mention the user correctly.");

	message.channel.send(`${message.author} spat on ${args[1]}, like a *~~disgusting degenerate~~* llama.`).catch(console.error);
});

Actions.AddCommand("hug", (message, args, bot) => {
	if (!vm(args)) return message.reply("invalid arguments, please mention the user correctly.");

	message.channel.send(`${message.author} hugged ${args[1]}, this is the start of something beautiful. ( ͡° ͜ʖ ͡°)`).catch(console.error);
});

Actions.AddCommand("kiss", (message, args, bot) => {
	if (!vm(args)) return message.reply("invalid arguments, please mention the user correctly.");

	message.channel.send(`${message.author} smooched ${args[1]}, dead rate drops to 0!`).catch(console.error);
});

Actions.AddCommand("pat", (message, args, bot) => {
	if (!vm(args)) return message.reply("invalid arguments, please mention the user correctly.");

	message.channel.send(`${message.author} pat ${args[1]} on their head, who's a good [gender neutral pronoun, fucking tumblr]?`).catch(console.error);
});

/**
 * validate mention
 *
 * @param {string[]} args arguments
 * @returns boolean
 */
function vm(args) {
	if (args.length < 2) return false;
	if (!(args[1].startsWith("<@") && args[1].endsWith(">"))) return false;

	return true;
}

module.exports = exports = Actions;
