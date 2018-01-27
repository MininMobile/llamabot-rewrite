exports.play = async function(i) {
	const lc = require("../../bot_modules/lunicode");
	const luni = new lc.Lunicode();
	luni.tools.creepify.options.maxHeight = 15;

	i.a.shift();
	var words = i.a.join(" ");

	i.m.channel.send(luni.tools.creepify.encode(words));
}