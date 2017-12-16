exports.play = async function(i) {
    if (i.m.author.id !== '176048981615312897') return

    await i.m.react('🤔');

    i.a.shift();
    let code = i.a.join(" ");

    let result;

    let embed = new i.d.RichEmbed()
        .addField(":inbox_tray: Input", '```javascript\n' + code.toString() + '\n```')

    try {
        var evaled = eval(code);
        if (typeof evaled !== 'string') { toString(evaled) }

        result = evaled;
    } catch (err) {
        result = err;
    }

    embed.addField(":outbox_tray: Output", '```\n' + result + '\n```');
    i.m.author.send(embed);

    await i.m.clearReactions();
    i.m.react('👌');
}