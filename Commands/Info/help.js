exports.play = async function(i) {
    var lines = [
    "**Commands**", "",
    `**${i.config.prefix}help** DMs author command list`,
    `**${i.config.prefix}ping** Bot response time in milliseconds`,
    `**${i.config.prefix}status** Basic bot statistics`
    ];

    i.m.author.send(lines.join("\n"));
    i.m.channel.send(`Slid into your DMs :wink:`);
}