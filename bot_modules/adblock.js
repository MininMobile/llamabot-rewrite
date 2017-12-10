exports.on = async function(event, i) {
    switch (event) {
        case "message":
            if (i.m.content.includes("http://") ||
                i.m.content.includes("https://") ||
                i.m.content.includes("discord.gg") ||
                i.m.content.includes("discord.io")) {
                if (i.m.deletable) { i.m.delete(); } 
                else { message.reply(`I am missing \`MANAGE_MESSAGES\` permissions for adblock;\nIf you did not intend to enable adblock, type \`${i.config.prefix}adblock\`.`); }
            }
            break
    }
}