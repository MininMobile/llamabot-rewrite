const Discord = require("discord.js");
const fs = require("fs");
const Command = require("./framework");

const Rpg = new Command();

Rpg.On("init", (scope) => {
	let bot = scope.bot;

	scope.rpg = {};
	scope.rpg.players = require("../data/rpg.json");
	scope.rpg.call = (name, s) => {
		switch (name) {
			case "save":
				console.log(":: SAVING RPG DATA");
				fs.writeFileSync("data/rpg.json", JSON.stringify(s.rpg.players));
				break;

			default:
				throw new Error("invalid event");
		}
	}

	bot.users.array().forEach((user) => {
		if (!Object.keys(scope.rpg.players).includes(user.id))
			scope.rpg.players[user.id] = { xp: 100, level: 1, gold: 10, inventory: [] };
	});
});

Rpg.AddCommand("rpgsave", (message, args, bot, scope) => {
	if (message.author.id == "176048981615312897")
		scope.rpg.call("save", scope);
});

Rpg.AddCommand("rpginfo,profile", (message, args, bot, scope) => {
	let embed = new Discord.RichEmbed()
		.attachFile(new Discord.Attachment("src/img/user.png", "user.png"))
		.setAuthor(message.author.username, "attachment://user.png")
		.setColor(message.member.displayHexColor)
		.setThumbnail(message.author.avatarURL)
		.setFooter(`${undefined}xp/per message`);

	embed
		.addField("Gold `$NPN`", scope.rpg.players[message.author.id].gold)
		.addField("Level", scope.rpg.players[message.author.id].level)
		.addField("Experience", scope.rpg.players[message.author.id].xp);

	message.channel.send(embed);
});

Rpg.AddCommand("inventory,inv", (message, args, bot, scope) => {
	let invmap = {};

	scope.rpg.players[message.author.id].inventory.forEach((item) => {
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

	if (lines == "\n")
		lines += "*...no items...*\n";

	let embed = new Discord.RichEmbed()
		.setAuthor("Inventory", message.author.avatarURL)
		.setColor(message.member.displayHexColor)
		.setDescription(lines)
		.setFooter(`total ${scope.rpg.players[message.author.id].inventory.length} items`);

	message.channel.send(embed);
});

module.exports = exports = Rpg;
