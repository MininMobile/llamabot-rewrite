exports.play = async function(i) {
    if (i.m.member.hasPermission("MANAGE_MESSAGES")) {
        if (i.v.guilds_adblock.includes(i.m.guild.id)) {
            i.f.removeArrayObject(i.v.guilds_adblock, i.m.guild.id);
            i.m.channel.send(`Adblock disabled, type \`${i.m.content}\` to enable it.`);
            i.bf.adblock.on("save", i);
        } else {
            i.v.guilds_adblock.push(i.m.guild.id);
            i.m.channel.send(`Adblock enabled, type \`${i.m.content}\` to disable it.`);
            i.bf.adblock.on("save", i);
        }
    } else {
        i.m.reply("You do not have the `MANAGE_MESSAGES`")
    }
}