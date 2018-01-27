exports.play = async function(i) {
	const gs = new require("google-search");
	const gi = new require("google-images");

	const googleSearch = new gs({ key: "AIzaSyAzW8u08AJE9ur-ByoJAYTEDFdb0JAJhSA", cx: "007225782620738562910:eokdvs27v7o" });
	const googleImageSearch = new gi("007225782620738562910:eokdvs27v7o", "AIzaSyAzW8u08AJE9ur-ByoJAYTEDFdb0JAJhSA");

	if (i.a[1] != null) {
		i.a.shift();
		var words = i.a.join(" ");

		googleSearch.build({
			q: words,
			start: 1
		}, function(error, response) {
			if (error) {
				i.m.reply("Whoopsie Doopsie!");
				return;
			}

			googleImageSearch.search(words).then(images => {
				let resultTitle;
				let resultLink;
	
				if (response.searchInformation.totalResults == 0) {
					resultTitle = 'No results for ***' + words + '***';
					resultLink = '[   . . .   ]';
				} else {
					resultTitle = response.items[0].title;
					resultLink = response.items[0].link;
				}
	
				let embed = new i.d.RichEmbed()
					.setThumbnail(images[0].url)
					.addField("Google Search Query", words)
					.addField("Result", resultTitle)
					.addField("Link", resultLink);
	
				i.m.channel.send(embed);
			});
		});
	} else {
		i.m.reply("Please enter an argument!");
	}
}