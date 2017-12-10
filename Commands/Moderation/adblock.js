exports.play = async function(i) {
    if (i.m.member.hasPermission("MANAGE_MESSAGES")) {
        if (i.v.guilds_adblock.includes(message.guild.id)) {
            af.removeArrayObject(adblocked, message.guild.id);
            message.channel.send("Adblock disabled, type `" + message.content + "` to enable it.");
        } else {
            adblocked.push(message.guild.id);
            message.channel.send("Adblock enabled, type `" + message.content + "` to disable it.");
        }
    } else {
        i.m.reply("You do not have the `MANAGE_MESSAGES`")
    }
}