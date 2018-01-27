exports.play = async function(i) {
	i.a.shift();
	var words = i.a.join(" ");

	var embed = new i.d.RichEmbed()
		.setDescription(words);

	i.m.channel.send(embed);
}