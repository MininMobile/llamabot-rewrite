exports.play = async function(i) {
	if (i.a.length == 2) {
		let userId = i.a[1].substr(2, 18);

		if (userId.length == 18) {
			let user = i.b.users.get(userId);

			let embed = new i.d.RichEmbed()
				.setImage(user.avatarURL)
				.addField("Link", `[For ${user.username}'s avatar](${user.avatarURL})`);

			i.m.channel.send(embed);
		} else {
			i.m.reply("Please enter a __valid__ user mention!");
		}
	} else {
		i.m.reply("Please enter a user metion!");
	}
}