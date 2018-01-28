exports.play = async function(i) {
	const isOnline = require("is-reachable");

	if (i.a.length == 2) {
		isOnline(i.a[1]).then(res => {
			res ? i.m.reply("They're online!") : i.m.reply("They're offline... :(")
		});
	} else {
		i.m.reply("Please enter a URL to ping!");
	}
}