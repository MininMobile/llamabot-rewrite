exports.play = async function(i) {
    if (i.a[1] && i.a[2] != null) {
        if (i.f.isNumeric(i.a[1]) && i.f.isNumeric(i.a[2])) {
            let result;
            let num1 = parseInt(i.a[1]);
            let num2 = parseInt(i.a[2]);

            switch (i.c) {
                case "add":
                    result = num1 + num2;
                    break
                case "sub":
                    result = num1 - num2;
                    break
                case "mult":
                    result = num1 * num2;
                    break
                case "div":
                    result = num1 / num2;
                    break
            }

            i.m.channel.send(`**Result** \`${result}\``);
        } else {
            i.m.reply("Number 1 & 2 must actually be numbers!");
        }
    } else {
        i.m.reply(`Please give numbers 1 & 2, like \`${i.config.prefix}${i.c} 6 9\` for instance.`);
    }
}