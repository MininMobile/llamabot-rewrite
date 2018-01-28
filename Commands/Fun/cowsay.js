exports.play = async function(i) {
	i.a.shift();
	var words = i.a.join(" ");

	var topline = "";
	var botline = "";

	for (let i = 0; i != words.length + 2; i++) {
		topline += `_`;
		botline += `-`;
	}

	i.m.channel.send("``` \
	\n " + topline + " \
	\n< " + words + " > \
	\n " + botline + " \
	\n		\\   ^__^ \
	\n		 \\  (oo)\\_______ \
	\n			(__)\\	   )\\/\\ \
	\n				||----w | \
	\n				||	 || \
	\n ```");
}