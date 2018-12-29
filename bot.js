//// import modules
const discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const _util = require("./bot_modules/util");
const config = require("./src/config.json");

//// variables
var commands = { };
var scope = { };

//// initialize
// discord.js
const bot = new discord.Client();

// moment
moment.locale();

// util
const util = new _util(moment);

//// events
// bot connect
bot.on("ready", async () => {
	scope.bot = bot;

	bot.user.setGame(`type ${config.prefix}help`);

	fs.readdir("bot_modules", "utf8", (err, data) => {
		if (err) throw new Error(err);

		data.forEach((file) => {
			if (!(["framework.js", "lunicode.js", "util.js"].includes(file))) {
				let module = require(`./bot_modules/${file.substring(0, file.length - 3)}`);

				module.Call("init", scope);

				Object.keys(module.commands).forEach((command) => {
					commands[command] = module.commands[command];
				});

				console.log(`:: LOADED ${file.substring(0, 1).toUpperCase()}${file.substring(1, file.length - 3)}`);
			}
		});

		util.log(`Connected to ${bot.guilds.size} servers`);
	});
});

// guild joined
bot.on("guildCreate", async (guild) => {
	// placeholder event
});

// guild left
bot.on("guildDelete", async (guild) => {
	scope.adblock.call("guildDelete", { scope: scope, guild: guild });
});

// message recieved
bot.on("message", async (message) => {
	if (message.author.dmChannel != null) if (message.author.id != "176048981615312897") return;
	
	scope.adblock.call("message", { scope: scope, message: message, bot: bot });
	if (message.author.id == bot.user.id) util.log(`${message.content} REPLIED ${bot.user.username} IN ${message.guild.name} (${message.guild.id})`);

	if (message.author.bot) return;

	scope.message = message;
	scope.rpg.call("message", scope);

	if (!message.content.startsWith(config.prefix)) return;

	let args = message.content.split(" ");
	let cmd = args[0].substring(config.prefix.length).toLowerCase();
	args[0] = cmd;

	util.log(`${message.content} FROM ${message.author.username} IN ${message.guild.name} (${message.author.id} SENT IN ${message.guild.id})`);

	switch (cmd) {
		case "ping":
			message.channel.send(":ping_pong: Pinging...").then((m) => {
				let botPing = `**Bot** ${m.createdTimestamp - message.createdTimestamp}ms`;
				let apiPing = `**API** ${Math.round(bot.ping)}ms`;

				m.edit(`:ping_pong: ${botPing} ${apiPing}`);
			});
			break;

		case "help": {
			let lines = [];

			lines.push("[**>>**](https://sites.google.com/view/llamabotwiki/features/commands) Commands");
			lines.push("[**>>**](https://sites.google.com/view/llamabotwiki) Wiki");
			lines.push("[**>>**](https://discordapp.com/oauth2/authorize?client_id=292320341701689344&scope=bot&permissions=439675974) Invite");
			lines.push("[**>>**](https://trello.com/b/9GCQPaPz/llama-bot-updates) Trello");
			lines.push("[**>>**](https://discord.gg/BBax4jk) Support Server");
			lines.push("[**>>**](https://sites.google.com/view/llamabotwiki/tos) Terms of Service");

			let embed = new discord.RichEmbed()
				.setAuthor(bot.user.username, bot.user.avatarURL)
				.setDescription(lines.join("\n"))
				.setFooter(`serving ${bot.guilds.size} servers`);

			message.channel.send(embed);
			} break;

		case "status": {
			let memUsage = (process.memoryUsage().heapUsed/1000/1000/1000).toString();

			let lines = "\n";

			lines += `${bot.users.size} **Users**`; lines += "\n";
			lines += `${bot.channels.size} **Channels**`; lines += "\n";
			lines += `${bot.guilds.size} **Servers**`; lines += "\n";
			lines += `${process.version} **Node.js Version**`; lines += "\n";
			lines += `${discord.version} **Discord.js Version**`; lines += "\n";
			lines += `${memUsage.charAt(0) + memUsage.charAt(1) + memUsage.charAt(2) + memUsage.charAt(3)} GB / 2GB **Memory Usage**`; lines += "\n";
			lines += `${util.formatSecs(Math.floor(bot.uptime/1000))} **Uptime** (Days:Hours:Mins:Secs)`; lines += "\n";
		
			let embed = new discord.RichEmbed()
				.setAuthor("Statistics", bot.user.avatarURL)
				.setDescription(lines)
				.setFooter(`Related Commands: ${config.prefix}servers, ${config.prefix}modules`);
		
			message.channel.send(embed);
			} break;

		case "server":case "serverinfo": {
			let lines = "\n";

			lines += `${message.guild.channels.size} **Channels**`; lines += "\n";
			lines += `${message.guild.channels.findAll("type", "voice").length} **Voice Channels**`; lines += "\n";
			lines += `${message.guild.channels.findAll("type", "text").length} **Text Channels**`; lines += "\n";
			lines += `${message.guild.memberCount} **Users**`; lines += "\n";
			lines += `**ID** ${message.guild.id}`; lines += "\n";
		
			let embed = new discord.RichEmbed()
				.setAuthor("Server Statistics", bot.user.avatarURL)
				.setDescription(lines);
		
			message.channel.send(embed);
			} break;

		case "servers": {
			let lines = "";
			let guilds = bot.guilds.array();

			for (let i = 0; i < guilds.length; i++) {
				if (lines.length < 1900) {
					lines += `**${guilds[i]}** (${guilds[i].memberCount} Members)`;
					lines += "\n";
				} else {
					lines += "\n";
					lines += `*...and ${guilds.length - i} more!*`
					lines += "\n";
					break;
				}
			}

			let embed = new discord.RichEmbed()
				.setAuthor("Servers", bot.user.avatarURL)
				.setDescription(lines);

			message.channel.send(embed);
			} break;

		case "modules":
			fs.readdir("bot_modules", "utf8", (err, data) => {
				if (err) return message.channel.send(`ERROR: ${err.message}`);

				let modules = "\n";
				data.forEach((file) => {
					modules += `${file.substring(0, 1).toUpperCase()}${file.substring(1, file.length - 3)}\n`;
				});

				let embed = new discord.RichEmbed()
					.setAuthor("Modules", bot.user.avatarURL)
					.setDescription(modules);

				message.channel.send(embed);
			});
			break;

		case "eval":
			if (message.author.id !== "176048981615312897") return;

			args.shift();
			let code = args.join(" ");
		
			let result;
		
			try {
				result = eval(code);
			} catch (e) {
				result = e;
			}

			let embed = new discord.RichEmbed()
				.addField(":inbox_tray: Input", "```javascript\n" + code + "```")
				.addField(":outbox_tray: Output", "```\n" + result + "```");
			
			message.author.send(embed).then(() => { message.react("👌") });
			break;

		default:
			if (Object.keys(commands).includes(cmd)) {
				commands[cmd](message, args, bot, scope);
			} else if (Object.keys(scope.usrcmd.commands[message.guild.id]).includes(cmd)) {
				message.channel.send(scope.usrcmd.commands[message.guild.id][cmd]);
			}
	}
});

//// autosave
const autosave = setInterval(function() {
	scope.adblock.call("save", scope);
	scope.usrcmd.call("save", scope);
	scope.rpg.call("save", scope);
}, 600000);

//// connect
bot.login(require("./token.json").token);
