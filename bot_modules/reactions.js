const Discord = require("discord.js");
const _util = require("./util");
const util = new _util();
const Command = require("./framework");
const r = require("../data/reactions.json");

const Reactions = new Command();

Reactions.AddCommand("yes", (message, args, bot) => {
	let gif = util.rand(0, r.yes.length);
	message.channel.send(r.yes[gif]);
});

Reactions.AddCommand("no", (message, args, bot) => {
	let gif = util.rand(0, r.no.length);
	message.channel.send(r.no[gif]);
});

Reactions.AddCommand("cool", (message, args, bot) => {
	let gif = util.rand(0, r.cool.length);
	message.channel.send(r.cool[gif]);
});

Reactions.AddCommand("notcool", (message, args, bot) => {
	let gif = util.rand(0, r.notcool.length);
	message.channel.send(r.notcool[gif]);
});

Reactions.AddCommand("yeah", (message, args, bot) => {
	let gif = util.rand(0, r.yeah.length);
	message.channel.send(r.yeah[gif]);
});

Reactions.AddCommand("ohno", (message, args, bot) => {
	let gif = util.rand(0, r.ohno.length);
	message.channel.send(r.ohno[gif]);
});

module.exports = exports = Reactions;
