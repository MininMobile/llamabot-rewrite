exports.play = async function(i) {
	i.a.shift();
	var words = i.a.join(" ");

	i.m.channel.send(`${i.m.author.username} says ${words}`);
}