const Discord = require("discord.js");
const IsOnline = require("is-reachable");
const Command = require("./framework");
const config = require("../src/config.json");
const gs = new require("google-search");
const gi = new require("google-images");

const Webutil = new Command();

Webutil.AddCommand("online", (message, args, bot) => {
	if (args.length > 1) {
		args.shift();
		let words = args.join(" ");

		IsOnline(words).then((res) => {
			if (res) {
				message.channel.send(`:satellite: ${words} is online!`);
			} else {
				message.channel.send(`:satellite_orbital: ${words} is offline!`);
			}
		});
	} else {
		message.reply(`enter a URL to ping, eg. \`${config.prefix}${args[0]} duckduckgo.com\``);
	}
});

Webutil.AddCommand("google,search", (message, args, bot) => {
	const GoogleSearch = new gs({ key: "AIzaSyAzW8u08AJE9ur-ByoJAYTEDFdb0JAJhSA", cx: "007225782620738562910:eokdvs27v7o" });
	const GoogleImageSearch = new gi("007225782620738562910:eokdvs27v7o", "AIzaSyAzW8u08AJE9ur-ByoJAYTEDFdb0JAJhSA");

	if (args.length > 1) {
		args.shift();
		let words = args.join(" ");

		GoogleSearch.build({
			q: words,
			start: 1
		}, (err, res) => {
			if (err) return message.channel.send(`ERROR: ${e}`);

			try {
				GoogleImageSearch.search(words).then((images) => {
					let embed = new Discord.RichEmbed();
		
					if (res.searchInformation.totalResults == 0 || images.length == 0) {
						embed
							.attachFile(new Discord.Attachment("src/img/guess ill die.jpg", "die.jpg"))
							.setDescription(`No results for **${words}**`)
							.setThumbnail("attachment://die.jpg");
					} else {
						embed
							.setDescription(`[${res.items[0].title}](${res.items[0].link})`)
							.setThumbnail(images[0].url);
					}
		
					message.channel.send(embed);
				});
			} catch (e) {
				message.channel.send(`ERROR: ${e}`);
			}
		});
	} else {
		message.reply(`enter something to search, eg. \`${config.prefix}${args[0]} I have a lump on my foot\``);
	}
});

module.exports = exports = Webutil;
