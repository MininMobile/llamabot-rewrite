exports.play = async function(i) {
	var googleSearch = new require("google-search")({
		key: 'AIzaSyAzW8u08AJE9ur-ByoJAYTEDFdb0JAJhSA',
		cx: '007225782620738562910:eokdvs27v7o'
	});

	if (i.a[1] != null) {
		i.a.shift();
		var words = join(" ");

		googleSearch.build({
			q: words,
			start: 1
		}, function(error, response) {
			let resultTitle;
			let resultLink;

			if (response.searchInformation.totalResults == 0) {
				resultTitle = 'No results for***' + words + '***';
				resultLink = '[...]';
			} else {
				resultTitle = response.items[0].title;
				resultLink = response.items[0].link;
			}

			let embed = new i.d.RichEmbed()
				.addField("Google Search Query", words)
				.addField("Result", resultTitle)
				.addField("Link", resultLink);

			i.m.channel.send(embed);
		});
	} else {
		i.m.reply("Please enter an argument!");
	}
}