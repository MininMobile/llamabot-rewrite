const discord = require("discord.js");
const fs = require("fs");
const Command = require("./framework");
const _util = require("./util");
const config = require("../src/config.json")

const util = new _util();

const Rpg = new Command();

Rpg.On("init", (scope) => {
	let bot = scope.bot;

	scope.rpg = {};
	scope.rpg.players = require("../data/rpg.json");
	scope.rpg.call = (name, s) => {
		switch (name) {
			case "message":
				let m = s.message;
				let b = s.bot;
				let player = scope.rpg.players[m.author.id];

				if (player) {
					//// give xp
					player.xp += xpr(player.xp);

					//// check for levelup
					if (Math.floor(player.xp/1000) > player.level) {
						player.level = Math.round(player.xp/1000);
						player.gold += 10;
					}
				} else {
					scope.rpg.players[m.author.id] = {
						xp: 1000,
						level: 1,
						gold: 10,
						inventory: []
					};
				}
				break;

			case "save":
				console.log(":: SAVING RPG DATA");
				fs.writeFileSync("data/rpg.json", JSON.stringify(s.rpg.players));
				break;

			default:
				throw new Error("invalid event");
		}
	}

	Array.from(bot.users.values).forEach((user) => {
		if (!Object.keys(scope.rpg.players).includes(user.id)) {
			scope.rpg.players[user.id] = {
				xp: 1000,
				level: 1,
				gold: 10,
				inventory: []
			};
		}
	});
});

Rpg.AddCommand("rpgadmin", (message, args, bot, scope) => {
	if (message.author.id == "176048981615312897") {
		switch (args[1]) {
			case "save":
				scope.rpg.call("save", scope);
				break;

			case "poxp":
				args[2] = args[2].replace("me", "176048981615312897");
				scope.rpg.players[args[2]].xp += parseInt(args[3]);
				break;

			case "give":
				args[2] = args[2].replace("me", "176048981615312897");
				scope.rpg.players[args[2]].inventory.push(args[3]);
				break;

			case "drop":
				args[2] = args[2].replace("me", "176048981615312897");
				util.removeArrayItem(scope.rpg.players[args[2]].inventory, args[3]);
				break;
		}
	}
});

Rpg.AddCommand("donate", (message, args, bot, scope) => {
	if (args.length < 4) return message.reply(`ERROR: missing arguments, try something like \`${config.prefix}donate @zvava#0009 gold 1\`.`).catch(console.error);
	if (args[1].startsWith("<@") && args[1].endsWith(">")) return message.reply("ERROR: invalid target.").catch(console.error)
	if (!_donatable.includes(args[2])) return message.reply(`ERROR: you can only donate: ${_donatable.join(", ")}.`).catch(console.error);
	if (parseInt(args[3]) === NaN) return message.reply(`ERROR: you can only donate amount of number`).catch(console.error);
	if (parseInt(args[3]) < 0) return message.reply(`ERROR: you cannot donate negative amounts`).catch(console.error);

	message.reply(":ok_hand:").catch(console.error);
});

Rpg.AddCommand("rpginfo,profile", (message, args, bot, scope) => {
	let id = args[1] ? args[1].substring(2, args[1].length-1) : message.author.id;

	let user = bot.users.get(id);

	let embed = new discord.RichEmbed()
		.attachFile(new discord.Attachment("src/img/user.png", "user.png"))
		.setAuthor(user.username, "attachment://user.png")
		.setColor(args[1] ? null : message.member.displayHexColor)
		.setThumbnail(user.avatarURL)
		.setFooter(`${Math.round(xpr(scope.rpg.players[id].xp))}xp/per message`);

	embed
		.addField("Gold `$NPN`", scope.rpg.players[id].gold)
		.addField("Level", scope.rpg.players[id].level)
		.addField("Experience", Math.round(scope.rpg.players[id].xp));

	message.channel.send(embed).catch(console.error);
});

Rpg.AddCommand("rpgtop,leaderboard", (message, args, bot, scope) => {
	let id = "388764732301246484";
	let topxp = 1000;

	Object.keys(scope.rpg.players).forEach((player) => {
		if (scope.rpg.players[player].xp > topxp) {
			topxp = scope.rpg.players[player].xp;
			id = player;
		}
	});

	let user = bot.users.get(id);

	let embed = new discord.RichEmbed()
		.attachFile(new discord.Attachment("src/img/user.png", "user.png"))
		.setAuthor(user.username, "attachment://user.png")
		.setColor(args[1] ? null : message.member.displayHexColor)
		.setThumbnail(user.avatarURL)
		.setFooter(`${Math.round(xpr(scope.rpg.players[id].xp))}xp/per message`);

	embed
		.addField("Gold `$NPN`", scope.rpg.players[id].gold)
		.addField("Level", scope.rpg.players[id].level)
		.addField("Experience", Math.round(scope.rpg.players[id].xp));

	message.channel.send(embed).catch(console.error);
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

	let embed = new discord.RichEmbed()
		.setAuthor("Inventory", message.author.avatarURL)
		.setColor(message.member.displayHexColor)
		.setDescription(lines)
		.setFooter(`total ${scope.rpg.players[message.author.id].inventory.length} items`);

	message.channel.send(embed).catch(console.error);
});

function xpr(xp) {
	return util.csch(xp / 50000) + 1;
}

let _donatable = [
	"gold"
];

module.exports = exports = Rpg;
