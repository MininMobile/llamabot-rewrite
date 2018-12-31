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

	bot.user.setActivity(`type ${config.prefix}help`).catch(console.error);

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
	// don't reply in dms
	if ((message.channel.type == "dm") && (message.author.id != "176048981615312897")) {
		message.author.send("Executing commands inside of DMs are not supported.").catch(() => {});
		util.log(`${message.author.username} SENT ${message.content} IN DMS (${message.author.id} SENT IN DMS)`);
		return;
	}

	// adblock
	scope.adblock.call("message", { scope: scope, message: message, bot: bot });

	// log reply
	if (message.author.id == bot.user.id) util.log(`${message.content} REPLIED ${bot.user.username} IN ${message.guild.name} (BOT REPLIED IN ${message.guild.id})`);

	// don't reply to bots
	if (message.author.bot) return;

	// ignore messages w/o prefix
	if (!message.content.startsWith(config.prefix)) return;

	// setup scope
	scope.message = message;
	scope.rpg.call("message", scope);

	// setup args
	let args = message.content.split(" ");
	let cmd = args[0].substring(config.prefix.length).toLowerCase();
	args[0] = cmd;

	// log command
	util.log(`${message.author.username} COMMANDED ${message.content} IN ${message.guild.name} (${message.author.id} COMMANDED IN ${message.guild.id})`);

	switch (cmd) {
		case "ping": {
			message.channel.send(":ping_pong: Pinging...").then((m) => {
				let botPing = `**Bot** ${m.createdTimestamp - message.createdTimestamp}ms`;
				let apiPing = `**API** ${Math.round(bot.ping)}ms`;

				m.edit(`:ping_pong: ${botPing} ${apiPing}`).catch(console.log);
			}).catch(console.log);
		} break;

		case "join":case "invite": {
			let embed = new discord.RichEmbed()
				.setAuthor(bot.user.username, bot.user.avatarURL)
				.setDescription("[**>>**](https://discordapp.com/oauth2/authorize?client_id=292320341701689344&scope=bot&permissions=439675974) Invite")
				.setFooter(`serving ${bot.guilds.size} servers`);

			message.channel.send(embed).catch(console.error);
		} break;

		case "help": {
			let lines = [];

			lines.push("[**>>**](https://sites.google.com/view/llamabotwiki/features/commands) Commands");
			lines.push("[**>>**](https://sites.google.com/view/llamabotwiki) Wiki");
			lines.push("[**>>**](https://discordapp.com/oauth2/authorize?client_id=292320341701689344&scope=bot&permissions=439675974) Invite");
			lines.push("[**>>**](https://trello.com/b/9GCQPaPz/llama-bot-updates) Trello");
			lines.push("[**>>**](https://discord.gg/BBax4jk) Support Server");
			lines.push("[**>>**](https://sites.google.com/view/llamabotwiki/tos) Terms of Service");
			lines.push(`\`${config.prefix}\` Prefix`);

			let embed = new discord.RichEmbed()
				.setAuthor(bot.user.username, bot.user.avatarURL)
				.setDescription(lines.join("\n"))
				.setFooter(`serving ${bot.guilds.size} servers`);

			message.channel.send(embed).catch(console.error);
		} break;

		case "status": {
			let memUsage = (process.memoryUsage().heapUsed/1000/1000/1000).toString();

			let lines = [""]; // init with string for top padding

			lines.push(`${bot.users.size} **Users**`);
			lines.push(`${bot.channels.size} **Channels**`);
			lines.push(`${bot.guilds.size} **Servers**`);
			lines.push(`${process.version} **Node.js Version**`);
			lines.push(`${discord.version} **Discord.js Version**`);
			lines.push(`${memUsage.charAt(0) + memUsage.charAt(1) + memUsage.charAt(2) + memUsage.charAt(3)} GB / 2GB **Memory Usage**`);
			lines.push(`${util.formatSecs(Math.floor(bot.uptime/1000))} **Uptime** (days:hours:mins:secs)`);
		
			let embed = new discord.RichEmbed()
				.setAuthor("Statistics", bot.user.avatarURL)
				.setDescription(lines.join("\n"))
				.setFooter(`see also; ${config.prefix}server, ${config.prefix}info, ${config.prefix}modules`);
		
			message.channel.send(embed).catch(console.error);
		} break;

		case "avatar": {
			let embed = new discord.RichEmbed()
				.setDescription(message.author.avatarURL)
				.setImage(message.author.avatarURL)
				.setFooter(`${message.member.nickname || message.author.username}'s avatar`);

			message.channel.send(embed).catch(console.error);
		} break;

		case "info":case "userinfo": {
			let lines = [""]; // init with string for top padding

			                                  lines.push(`**ID** ${message.author.id}`);
			if (message.author.bot)           lines.push(`They are a **bot**`);
			if (message.member.nickname)      lines.push(`**Nickname** ${message.member.nickname}`);
			                                  lines.push(`**Currently** ${message.author.presence.status}`);
			if (message.author.presence.game) lines.push(`**Playing** ${message.author.presence.game.name}`);
			                                  lines.push(`**Roles** \`${message.member.roles.map(r => r.name).reverse().join("`, `")}\``);
			                                  lines.push(`**Server Join Date** ${message.member.joinedAt.toDateString()}`);
			                                  lines.push(`**Discord Join Date** ${message.author.createdAt.toDateString()}`);
		
			let embed = new discord.RichEmbed()
				.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
				.setColor(message.member.displayColor)
				.setDescription(lines.join("\n"))
				.setFooter(`see also; ${config.prefix}server, ${config.prefix}status, ${config.prefix}modules`);
		
			message.channel.send(embed).catch(console.error);
		} break;

		case "server":case "serverinfo": {
			let lines = [""]; // init with string for top padding

			lines.push(`${message.guild.channels.size} **Channels**`);
			lines.push(`${message.guild.channels.filter(c => c.type == "voice").size} **Voice Channels**`);
			lines.push(`${message.guild.channels.filter(c => c.type == "text").size} **Text Channels**`);
			lines.push(`${message.guild.memberCount} **Users**`);
			lines.push(`**ID** ${message.guild.id}`);
		
			let embed = new discord.RichEmbed()
				.setAuthor("Server Statistics", bot.user.avatarURL)
				.setDescription(lines.join("\n"))
				.setFooter(`see also; ${config.prefix}status, ${config.prefix}info, ${config.prefix}modules`);
		
			message.channel.send(embed).catch(console.error);
		} break;

		case "servers": {
			let guilds = bot.guilds.array();

			let lines = [];

			for (let i = 0; i < guilds.length; i++) {
				if (lines.length < 1900) {
					lines.push(`**${guilds[i]}** (${guilds[i].memberCount} Members)`);
				} else {
					lines.push("", `*...and ${guilds.length - i} more!*`);
					break;
				}
			}

			let embed = new discord.RichEmbed()
				.setAuthor("Servers", bot.user.avatarURL)
				.setDescription(lines.join("\n"))
				.setFooter(`see also; ${config.prefix}modules`);

			message.channel.send(embed).catch(console.error);
		} break;

		case "modules": {
			fs.readdir("bot_modules", "utf8", (err, data) => {
				if (err) return message.channel.send(`ERROR: ${err.message}`).catch(console.error);

				let lines = [""]; // init with string for top padding

				data.forEach((file) => {
					lines.push(`${file.substring(0, 1).toUpperCase()}${file.substring(1, file.length - 3)}`);
				});

				let embed = new discord.RichEmbed()
					.setAuthor("Modules", bot.user.avatarURL)
					.setDescription(lines.join("\n"))
					.setFooter(`total of ${data.length} modules`);

			message.channel.send(embed).catch(console.error);
			});
		} break;

		case "eval": {
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
			
			message.author.send(embed).then(() => { message.react("👌").catch(console.log) }).catch(console.error);
		} break;

		default: {
			if (Object.keys(commands).includes(cmd)) {
				commands[cmd](message, args, bot, scope);
			} else if (Object.keys(scope.usrcmd.commands[message.guild.id]).includes(cmd)) {
				message.channel.send(scope.usrcmd.commands[message.guild.id][cmd]).catch(console.error);
			}
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
