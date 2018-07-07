//// import modules
const discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
const config = require("./config.json");
const af = require("minin-api-additionalfunctions");
const path = require('path');

//// variables
var commands = {};

//// initialize
// discord.js
const bot = new discord.Client();

// moment
moment.locale();

// load bot modules
const adblock = loadModule("adblock");

// create imports
const imports = {
	config:config,
	v:{
		"guilds_adblock":[]
	},
	f:{
		l:log,
		cl:console.log,
		lm:loadModule,
		r:af.randomInt,
		formatSecs:af.formatSecs,
		removeArrayObject:af.removeArrayObject,
		isNumeric:isNumeric
	},
	bf:{
		adblock:adblock
	},
	d:discord,
	b:bot
};

//// functions
function isNumeric(num) { return !isNaN(num); }

function loadModule(module) {
	return require("./bot_modules/" + module + ".js");
}

function log(text) {
	console.log(moment().format('LTS') + ' | ' + text);
}

//// events
// bot connect
bot.on("ready", async () => {
	fs.readdir("bot_modules", "utf8", (err, data) => {
		if (err) throw new Error(err);

		data.forEach((file) => {
			if (!(["framework.js", "adblock.js", "lunicode.js"].includes(file))) {
				let module = require(`./bot_modules/${file.substring(0, file.length - 3)}`);

				Object.keys(module.commands).forEach((command) => {
					commands[command] = module.commands[command];
				});

				console.log(`:: LOADED ${file.substring(0, 1).toUpperCase()}${file.substring(1, file.length - 3)}`);
			}
		});

		imports.v.guilds_adblock = require("./json/guilds_adblock.json");

		log(`Connected to ${bot.guilds.size} servers`);
	});
});

// guild joined
bot.on("guildCreate", async (guild) => {
	
});

// guild left
bot.on("guildDelete", async (guild) => {
	adblock.on("guildDelete", imports);
});

// message recieved
bot.on("message", async (message) => {
	if (message.author.dmChannel != null) if (message.author.id != "176048981615312897") return;
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;

	let args = message.content.split(" ");
	let cmd = args[0].substring(config.prefix.length);
	args[0] = cmd;
	
	imports.m = message;

	adblock.on("message", imports);

	log(`${config.prefix}${cmd} FROM ${message.author.username} IN ${message.guild.name} (${message.author.id} SENT IN ${message.guild.id})`);

	for (let i = 0; i < config.commandLoader.length; i++) {
		let command = config.commandLoader[i]
		if (command.name == cmd) {
			let location = `${config.commandCatagories[command.catagory].location}`
			let file = `./${config.commandPrefix}${location}${command.file}${config.commandSuffix}`;
			
			if (fs.existsSync(file)) {
				imports.a = args;
				require(file).play(imports);
			}

			break;
		}
	}

	switch (cmd) {
		case "ping":
			message.channel.send(":ping_pong: Pinging...").then((m) => {
				let botPing = `**Bot** ${m.createdTimestamp - message.createdTimestamp}ms`;
				let apiPing = `**API** ${Math.round(Bot.ping)}ms`;

				m.edit(`:ping_pong: ${botPing} ${apiPing}`);
			});
			break;

		case "help": {
			let lines = "";

			lines += "[**>>**](https://sites.google.com/site/llamabotwiki/) Commands"; lines += "\n";
			lines += "[**>>**](https://sites.google.com/site/llamabotwiki/home/features/commands) Wiki"; lines += "\n";
			lines += "[**>>**](https://discordapp.com/oauth2/authorize?client_id=292320341701689344&scope=bot&permissions=36727808) Invite"; lines += "\n";
			lines += "[**>>**](https://trello.com/b/9GCQPaPz/llama-bot-updates) Trello"; lines += "\n";
			lines += "[**>>**](https://discord.gg/BBax4jk) Support Server"; lines += "\n";
			lines += "[**>>**](https://sites.google.com/site/llamabotwiki/tos) Terms of Service"; lines += "\n";

			let embed = new discord.RichEmbed()
				.setAuthor(bot.user.username, bot.user.avatarURL)
				.setDescription(lines)
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
			lines += `${imports.f.formatSecs(Math.floor(bot.uptime/1000))} **Uptime** (Days:Hours:Mins:Secs)`; lines += "\n";
		
			let embed = new discord.RichEmbed()
				.setAuthor("Statistics", bot.user.avatarURL)
				.setDescription(lines)
				.setFooter(`Related Commands: ${config.prefix}servers, ${config.prefix}modules`);
		
			message.channel.send(embed);
			} break;

		case "servers": {
			let lines = "";
			let guilds = bot.guilds.array();

			for (let i = 0; i < guilds.length; i++) {
				if (lines.length < 1800) {
					lines += `**${guilds[i]}** (${guilds[i].memberCount} Members)`;
					lines += "\n";
				} else {
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
			if (Object.keys(commands).includes(cmd)) commands[cmd](message, args, bot);
	}
});

//// autosave
var autosave = setInterval(function() {
	adblock.on("save", imports)
}, 600000);

//// connect
bot.login(require("./token.json").token);
