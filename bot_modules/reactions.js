const Discord = require("discord.js");
const af = require("minin-api-additionalfunctions");
const Command = require("./framework");
const r = require("../json/reactions.json");

const Reactions = new Command();

Reactions.AddCommand("yes", (message, args, bot) => {
	let gif = af.randomInt(0, r.cool.length);
	message.channel.send(r.cool[gif]);
});

module.exports = exports = Reactions;
