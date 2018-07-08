const Discord = require("discord.js");
const Command = require("./framework");
const config = require("../src/config.json");

const Mathc = new Command();

Mathc.AddCommand("add", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``);

	args.shift();

	let r = 0;

	args.forEach((num) => { r += parseInt(num); });

	message.channel.send(r);
});

Mathc.AddCommand("subtract,sub,min", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``);

	args.shift();

	let r = parseInt(args[0]);

	args.shift();

	args.forEach((num) => { r -= parseInt(num); });

	message.channel.send(r);
});

Mathc.AddCommand("multiply,mult", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``);

	args.shift();

	let r = parseInt(args[0]);

	args.shift();

	args.forEach((num) => { r *= parseInt(num); });

	message.channel.send(r);
});

Mathc.AddCommand("divide,div", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 5 5\``);

	args.shift();

	let r = parseInt(args[0]);

	args.shift();

	args.forEach((num) => { r /= parseInt(num); });

	message.channel.send(r);
});

Mathc.AddCommand("squareroot,sqrt,sq", (message, args, bot) => {
	if (!va(args, 1)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 36\``);

	message.channel.send(Math.sqrt(parseInt(args[1])));
});

Mathc.AddCommand("perimeter,peri", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 8 4\``);

	let num1 = parseInt(args[1]);
	let num2 = parseInt(args[2]);

	let dim = `**Dimensions** ${num1}cm x ${num2}cm`
	let peri = `**Perimeter** ${(num1 + num2) * 2}cm`

	message.channel.send(`${dim}\n${peri}`);
});

Mathc.AddCommand("area", (message, args, bot) => {
	if (!va(args)) return message.reply(`Invalid use of \`${config.prefix}${args[0]}\`, use like \`${config.prefix}${args[0]} 8 4\``);

	let num1 = parseInt(args[1]);
	let num2 = parseInt(args[2]);

	let dim = `**Dimensions** ${num1}cm x ${num2}cm`
	let area = `**Area** ${num1 * num2}cm²`

	message.channel.send(`${dim}\n${area}`);
});

function va(a, expected = 2) {
	let args = a.slice(1, a.length);

	r = true;

	if (args.length < expected) r = false;
	args.forEach((num) => { if (isNaN(parseInt(num))) r = false; });

	return r;
}

module.exports = exports = Mathc;
