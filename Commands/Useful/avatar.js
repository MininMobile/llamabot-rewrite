exports.play = async function(i) {
    console.log(i)
    if (i.a[2] == null) {
        let embed = new discord.RichEmbed()
            .addField("The Avatar Of", i.m.author.username)
            .addField("Link", i.m.author.avatarURL)
            .setImage(i.m.author.avatarURL);

        i.m.channel.sendEmbed(embed);
    } else {
        if (i.a[2].startsWith('<@') && i.a[2].endsWith('>')) {
            let userID;
            let username;
            let userAvatar;
            let userExists = false;
            if (i.a[2].startsWith("<@!")) {
                userID = i.a[2].substring(3, i.a[2].length-1);
            } else {
                userID = i.a[2].substring(2, i.a[2].length-1);
            }
            
            let usersArray = bot.users.array();
            for (var x = 1; x < usersArray.length; x++) {
                if (usersArray[i].id == userID) {
                    userExists = true;
                    userAvatar = usersArray[i].avatarURL;
                    username = usersArray[i].username;
                    break;
                }
            }

            if (userExists == true) {
                let embed = new i.d.RichEmbed()
                    .addField("The Avatar Of", username)
                    .addField("Link", userAvatar)
                    .setImage(userAvatar);

                i.m.channel.sendEmbed(embed);
            } else {
                i.m.reply("User doesn't exist/use Llama Bot!");
            }
        } else {
            i.m.reply("Please use a proper mention!");
        }
    }
}