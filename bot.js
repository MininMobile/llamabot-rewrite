//// import modules
const discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
const config = require("./config.json");
const af = require("minin-api-additionalfunctions");
const path = require('path');

//// variables
var Commands = {};

//// initialize
// discord.js
const Bot = new Discord.Client();

// moment
Moment.locale();

// load bot modules
const adblock = loadModule("adblock")

// moment
moment.locale();

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
	imports.v.guilds_adblock = require("./json/guilds_adblock.json");
	log(`Connected to ${bot.guilds.size} Servers`)
});

// guild joined
bot.on("guildCreate", async (guild) => {
	
});

// guild left
bot.on("guildDelete", async (guild) => {
	adblock.on("guildDelete", imports)
});

// message recieved
bot.on("message", async (message) => {
	imports.m = message;

	if (message.author.dmChannel != null) if (message.author.id != "176048981615312897") return;
	
	adblock.on("message", imports);
	
	if (!message.content.toLowerCase().startsWith(config.prefix)) return;

	let cmd = message.content.split(" ")[0].substr(config.prefix.length);
	let arguments = message.content.split(" "); arguments[0] = arguments[0].substr(config.prefix.length);

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
});

//// autosave
var autosave = setInterval(function() {
	adblock.on("save", imports)
}, 600000);

//// connect
bot.login(require("./token.json").token);
