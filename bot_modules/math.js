const discord = require("discord.js");
const Command = require("./framework");
const config = require("../src/config.json");

const Mathc = new Command();

Mathc.AddCommand("add", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``).catch(console.error);

	args.shift();

	let r = 0;

	args.forEach((num) => { r += parseInt(num); });

	message.channel.send(r).catch(console.error);
});

Mathc.AddCommand("subtract,sub,min", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``).catch(console.error);

	args.shift();

	let r = parseInt(args[0]);

	args.shift();

	args.forEach((num) => { r -= parseInt(num); });

	message.channel.send(r).catch(console.error);
});

Mathc.AddCommand("multiply,mult", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``).catch(console.error);

	args.shift();

	let r = parseInt(args[0]);

	args.shift();

	args.forEach((num) => { r *= parseInt(num); });

	message.channel.send(r).catch(console.error);
});

Mathc.AddCommand("divide,div", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``).catch(console.error);

	args.shift();

	let r = parseInt(args[0]);

	args.shift();

	args.forEach((num) => { r /= parseInt(num); });

	message.channel.send(r).catch(console.error);
});

Mathc.AddCommand("squareroot,sqrt,sq", (message, args, bot) => {
	if (!va(args, 1)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 36\``).catch(console.error);

	message.channel.send(Math.sqrt(parseInt(args[1]))).catch(console.error);
});

Mathc.AddCommand("perimeter,peri", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 8 4\``).catch(console.error);

	let num1 = parseInt(args[1]);
	let num2 = parseInt(args[2]);

	let dim = `**Dimensions** ${num1}cm x ${num2}cm`
	let peri = `**Perimeter** ${(num1 + num2) * 2}cm`

	message.channel.send(`${dim}\n${peri}`).catch(console.error);
});

Mathc.AddCommand("area", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 8 4\``).catch(console.error);

	let num1 = parseInt(args[1]);
	let num2 = parseInt(args[2]);

	let dim = `**Dimensions** ${num1}cm x ${num2}cm`
	let area = `**Area** ${num1 * num2}cm²`

	message.channel.send(`${dim}\n${area}`).catch(console.error);
});


/**
 * validate args
 *
 * @param {string[]} a args
 * @param {number} [expected=2] expected amount of args
 * @returns boolean
 */
function va(a, expected = 2) {
	let args = a.slice(1, a.length);

	let r = true;

	if (args.length < expected) r = false;
	args.forEach((num) => { if (isNaN(parseInt(num))) r = false; });

	return r;
}

module.exports = exports = Mathc;
