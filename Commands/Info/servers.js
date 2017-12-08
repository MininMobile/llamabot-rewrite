exports.play = async function(i) {
    let servers = '';
    let inf = i.b.guilds.array();
    for (var u = 0; u < i.b.guilds.size; u++) {
        servers = servers + `\n**${u + 1}** ${inf[u].name} - **${inf[u].memberCount} members**`;
        if (servers.length > 950 ) {
            servers = servers + `\n\n*and ${inf.length-(u-1)} more...*`;
            
            u = i.b.guilds.size;
        }
    }

    var embed = new i.d.RichEmbed()
        .setDescription(`Llama Bots are active in these servers;\n${servers}`);

    i.m.channel.send(embed);
}