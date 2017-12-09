//// Install Modules
// Init Discord Client
const discord = require("discord.js");
const bot = new discord.Client();

// Initialize Node Modules
const af = require("minin-api-additionalfunctions");
const moment = require("moment");
const fs = require("fs");
const path = require('path');

// Load Configuration
const token = require(path.join(__dirname + "/../token.json"));
const config = require("./config.json");

//// Create Variables
// COMMAND IMPORTER
const imports = {
    config:config,
    f:{
        l:log,
        cl:console.log,
        r:af.randomInt,
        formatSecs:af.formatSecs,
        isNumeric:isNumeric
    },
    d:discord,
    b:bot
};

// FUNCTIONS
function isNumeric(num) { return !isNaN(num); }

function loadModule(module, i) {
    require("./bot_modules/" + module + ".js").load(i)
}

function log(text) {
    console.log(moment().format('LTS') + ' | ' + text);
}

//// Events
// Bot Connected
bot.on("ready", async () => {
    log(`Connected to ${bot.guilds.size} Servers`)
});

// Message Received
bot.on("message", async (message) => {
    // Add Info to Imports
    imports.m = message;

    // Deny DM Messages
    if (message.author.dmChannel.id == message.channel.id) if (message.author.id != "176048981615312897") return;
    
    // Load Modules
    loadModule("adblock", imports);

    // Give Users a Sense of Pride and Accomplishment for Using Different Commands
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    // Create Reference Variables
    let cmd = message.content.split(" ")[0].substr(config.prefix.length);
    let arguments = message.content.split(" "); arguments[0] = arguments[0].substr(config.prefix.length);

    // Go Thorugh all Commands
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

//// Connect Bot
bot.login(token.token);