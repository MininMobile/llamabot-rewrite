//// Install Modules
// Init Discord Client
const discord = require("discord.js");
const bot = new discord.Client();

// Initialize Node Modules
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
    l: function (text) { log(text) },
    cl: function (text) { console.log(text) },
    d:discord,
    b:bot
};

// FUNCTIONS
function log(text) {
    console.log(moment().format('LTS') + ' | ' + text);
}

//// Events
// Bot Connected
bot.on("ready", async () => {
    log("Connected")
    log(`${bot.guilds.size} Servers`)
});

// Message Received
bot.on("message", async (message) => {
    
});

//// Connect Bot
bot.login(token.token);