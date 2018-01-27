exports.play = async function(i) {
	const figlet = new require("figlet");

	i.a.shift();
	var words = i.a.join(" ");

	figlet(words, (error, result) => {
		if (error) {
			message.reply('Something went wrong... :(');
			return;
		}

		i.m.channel.send("```" + result + "```");
	});
}