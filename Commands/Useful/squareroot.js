exports.play = async function(i) {
    if (i.a[1] != null) {
        if (i.f.isNumeric(i.a[1])) {
            let num = parseInt(i.a[1]);
            i.m.channel.send(`**Result** \`${Math.sqrt(num)}\``);
        } else {
            i.m.reply("The number must actually be a number!");
        }
    } else {
        i.m.reply(`Please give a number, like \`${i.config.prefix}squareroot 36\` for instance.`);
    }
}