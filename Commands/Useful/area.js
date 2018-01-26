exports.play = async function(i) {
    if (i.a[1] && i.a[2] && i.a[3] != null) {
        if (i.f.isNumeric(i.a[1]) && i.f.isNumeric(i.a[2]) && isNaN(i.a[3])) {
            let num1 = parseInt(i.a[1]);
            let num2 = parseInt(i.a[2]);
            let m = i.a[3];

            let dim = `**Dimensions** ${num1}${m} x ${num2}${m}`
            let area = `**Area** ${num1 * num2}${m}²`

            i.m.channel.send(`${dim}\n${area}`);
        } else {
            i.m.reply("Number 1 & 2 must actually be numbers! (Not including the measurement)");
        }
    } else {
        i.m.reply(`Please give 2 numbers and measurement, like \`${i.config.prefix}area 8 4 cm\` for instance.`);
    }
}