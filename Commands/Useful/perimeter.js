exports.play = async function(i) {
    if (i.a[1] && i.a[2] && i.a[3] != null) {
        if (i.f.isNumeric(i.a[1]) && i.f.isNumeric(i.a[2]) && isNaN(i.a[3])) {
            let num1 = parseInt(i.a[1]);
            let num2 = parseInt(i.a[2]);
            let m = i.a[3];

            let dim = `**Dimensions** ${num1}${m} x ${num2}${m}`
            let peri = `**Perimeter** ${(num1 + num2) * 2}${m}`

            i.m.channel.send(`${dim}\n${peri}`);
        } else {
            i.m.reply("Numbers 1 & 2 must actually be numbers! (Not including the measurement)");
        }
    } else {
        i.m.reply(`Please give 2 numbers and measurement, like \`${i.config.prefix}peri 8 4 cm\` for instance.`);
    }
}