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
	args.shift();
	
	imports.m = message;

	adblock.on("message", imports);

	log(`${config.prefix}${cmd} FROM ${message.author.username} IN ${message.guild.name} (${message.author.id} SENT IN ${message.guild.id})`);

	for (let i = 0; i < config.commandLoader.length; i++) {
		let command = config.commandLoader[i]
		if (command.name == cmd) {
			let location = `${config.commandCatagories[command.catagory].location}`
			let file = `./${config.commandPrefix}${location}${command.file}${config.commandSuffix}`;
			
			if (fs.existsSync(file)) {
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

		case "modules":
			fs.readdir("bot_modules", "utf8", (err, data) => {
				if (err) return message.channel.send(`ERROR: ${err.message}`);

				let modules = "";
				data.forEach((file) => {
					modules += `${file.substring(0, 1).toUpperCase()}${file.substring(1, file.length - 3)}\n`;
				});

				let embed = new discord.RichEmbed()
					.setTitle("Modules")
					.setDescription(modules);

				message.channel.send(embed);
			});
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
