exports.play = async function(i) {
	const lc = require("../../bot_modules/lunicode");
	const luni = new lc.Lunicode();
	luni.tools.creepify.options.maxHeight = 15;

	i.a.shift();
	var words = i.a.join(" ");

	switch (i.c) {
		case "glitch":
			i.m.channel.send(luni.tools.creepify.encode(words));
			break;

		case "tiny":
			i.m.channel.send(luni.tools.tiny.encode(words));
			break;

		case "bubble":
			i.m.channel.send(luni.tools.bubbles.encode(words));
			break;

		case "square":
			i.m.channel.send(luni.tools.squares.encode(words));
			break;

		default:
			i.m.reply("eror lol");
			break;
	}
}