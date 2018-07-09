const Discord = require("discord.js");
const Command = require("./framework");

const Rpg = new Command();

Rpg.On("init", (scope, bot) => {
	scope.rpg = {};
	scope.rpg.players = {};
	scope.rpg.call = (name, s) => {
		switch (name) {
			default:
				throw new Error("invalid event");
		}
	}
});

Rpg.AddCommand("rpginfo,profile", (message, args, bot, scope) => {
	let embed = new Discord.RichEmbed()
		.attachFile(new Discord.Attachment("src/img/user.png", "user.png"))
		.setAuthor(message.author.username, "attachment://user.png")
		.setColor(message.member.displayHexColor)
		.setThumbnail(message.author.avatarURL)
		.setFooter(`${undefined}xp/per message`);

	embed
		.addField("Gold `$NPN`", undefined)
		.addField("Level", undefined)
		.addField("Experience", undefined);

	message.channel.send(embed);
});

Rpg.AddCommand("inventory,inv", (message, args, bot, scope) => {
	let inventory = ["socks", "socks", "socks", "socks", "socks", "socks", "socks", "socks", "underwear", "underwear", "underwear", "underwear", "shirt", "shirt", "pant", "pant", "hoodie"];
	let invmap = {};

	inventory.forEach((item) => {
		if (invmap[item]) {
			invmap[item] += 1;
		} else {
			invmap[item] = 1;
		}
	});

	let lines = "\n";

	Object.keys(invmap).forEach((item) => {
		lines += `${item[0].toUpperCase()}${item.substring(1, item.length)} x${invmap[item]}`; lines += "\n";
	});

	let embed = new Discord.RichEmbed()
		.setAuthor("Inventory", message.author.avatarURL)
		.setColor(message.member.displayHexColor)
		.setDescription(lines)
		.setFooter(`total ${inventory.length} items`);

	message.channel.send(embed);
});

module.exports = exports = Rpg;
