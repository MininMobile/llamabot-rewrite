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

module.exports = exports = Rpg;
