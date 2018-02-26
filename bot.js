//// Install Modules
// Initialize Discord Client
const discord = require("discord.js");
const bot = new discord.Client();

// Load Node Moduless
const af = require("minin-api-additionalfunctions");
const moment = require("moment");
const fs = require("fs");
const path = require('path');
// Load Bot Modules
const adblock = loadModule("adblock")

//// c o n f i g u r e
const token = require(path.join(__dirname + "/../token.json"));
const config = require("./config.json");

//// Initialize Modules
// Moment
moment.locale();


//// Commandious Importious
// Get Imports Class
const ic = loadModule("imports");

// Make Imports Class
const imports = new ic.Imports({
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
});

//// Create Variables
// Functions
function isNumeric(num) { return !isNaN(num); }

function loadModule(module) {
	return require("./bot_modules/" + module + ".js");
}

function log(text) {
	console.log(moment().format('LTS') + ' | ' + text);
}

//// Events
// Bot Connected
bot.on("ready", async () => {
	imports.v.guilds_adblock = require("./json/guilds_adblock.json");
	log(`Connected to ${bot.guilds.size} Servers`)
});

// Guild Added
bot.on("guildCreate", async (guild) => {
	
});

// Guild Removed
bot.on("guildDelete", async (guild) => {
	adblock.on("guildDelete", imports)
});

// Message Received
bot.on("message", async (message) => {
	// Add Info to Imports
	imports.m = message;

	// Deny DM Messages
	if (message.author.dmChannel != null) if (message.author.id != "176048981615312897") return;
	
	// Load Modules
	adblock.on("message", imports);
	
	// Give Users a Sense of Pride and Accomplishment for Using Different Commands
	if (!message.content.toLowerCase().startsWith(config.prefix)) return;

	// Create Reference Variables
	let cmd = message.content.split(" ")[0].substr(config.prefix.length);
	let arguments = message.content.split(" "); arguments[0] = arguments[0].substr(config.prefix.length);

	// Go Through all Commands
	for (let i = 0; i < config.commandLoader.length; i++) {
		// Create Command Object from Id
		let command = config.commandLoader[i]
		// If Regocnized Command
		if (command.name == cmd) {
			// Pick out File Location
			let location = `${config.commandCatagories[command.catagory].location}`
			let file = `./${config.commandPrefix}${location}${command.file}${config.commandSuffix}`;
			
			// Ensure the Bot doesn't Die if System32 is Deleted
			if (fs.existsSync(file)) {
				// Set Import Parameters
				imports.a = arguments;
				imports.c = cmd;
				// Run Command
				require(file).play(imports);
			}

			// Stop the Loop from Running
			break
		}
	}
});

//// Autosave
var autosave = setInterval(function() {
	// Save Settings
	adblock.on("save", imports)
}, 600000);

//// Connect Bot
bot.login(token.token);