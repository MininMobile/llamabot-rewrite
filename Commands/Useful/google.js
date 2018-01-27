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
				error(i);
				return;
			}

			try {
				googleImageSearch.search(words).then(images => {
					let resultTitle;
					let resultLink;
					let resultImage;
		
					if (response.searchInformation.totalResults == 0) {
						resultTitle = 'No results for ***' + words + '***';
						resultLink = '[   . . .   ]';
						resultImage = "http://i0.kym-cdn.com/photos/images/original/001/285/460/8b6.jpg";
					} else {
						resultTitle = response.items[0].title;
						resultLink = response.items[0].link;
						resultImage = images[0].url;
					}
		
					let embed = new i.d.RichEmbed()
						.setThumbnail(resultImage)
						.addField("Google Search Query", words)
						.addField("Result", resultTitle)
						.addField("Link", resultLink);
		
					i.m.channel.send(embed);
				});
			} catch (e) {
				error(i);
				return;
			}
		});
	} else {
		i.m.reply("Please enter an argument!");
	}
}

function error(i) {
	i.m.reply("Whoopsie Doopsie!");
}