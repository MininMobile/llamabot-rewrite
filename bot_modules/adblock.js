exports.on = async function(event, i) {
    var fs = require("fs");

    switch (event) {
        case "message":
            if (i.v.guilds_adblock.includes(i.m.guild.id)) {
                if ((i.m.content.includes("http://") ||
                    i.m.content.includes("https://") ||
                    i.m.content.includes("discord.gg") ||
                    i.m.content.includes("discord.io")) &&
                    i.m.author.id != i.b.user.id) {
                    if (i.m.deletable) { i.m.delete(); } 
                    else { i.m.channel.send(`I am missing \`MANAGE_MESSAGES\` permissions for adblock;\nIf you did not intend to enable adblock, type \`${i.config.prefix}adblock\`.`); }
                }
            }
            break
        case "save":
            fs.writeFileSync("./json/guilds_adblock.json", JSON.stringify(i.v.guilds_adblock));
            break
        case "guildDelete":
            for (var u = 0; u < imports.v.guilds_adblock.length; u++) {
                if (i.v.guilds_adblock[u] == guild.id) {
                    i.v.guilds_adblock.splice(u, 1);
                    break
                }
            }
            break
    }
}