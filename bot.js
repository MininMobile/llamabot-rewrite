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
    if (message.author.dmChannel.id == message.channel.id) if (message.author.id != "176048981615312897") return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    let cmd = message.content.split(" ")[0].substr(config.prefix.length);
    let arguments = message.content.split(" "); arguments[0] = arguments[0].substr(config.prefix.length);

    for (let i = 0; i < config.commandLoader.length; i++) {
        let command = config.commandLoader[i]
        if (command.name == cmd) {
            let location = `${config.commandCatagories[command.catagory].location}`
            let file = `./${config.commandPrefix}${location}${command.file}${config.commandSuffix}`;
            if (fs.existsSync(file)) {
                imports.m = message;
                imports.a = arguments;
                imports.c = cmd;
                require(file).play(imports);
            }
            break
        }
    }
});

//// Connect Bot
bot.login(token.token);