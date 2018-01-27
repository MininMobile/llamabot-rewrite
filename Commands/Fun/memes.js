exports.play = async function(i) {
	const reddit = require("fetch-subreddit")

	reddit.fetchSubreddit("me_irl").then((urls) => {
		var memes = urls[0].urls;
		var meme = memes[i.f.r(0, memes.length)]
		
		var embed = new i.d.RichEmbed()
			.setImage(meme)
			.setDescription(`Meme courtesy of [r/me_irl](https://reddit.com/r/me_irl)`);

		i.m.channel.send(embed)
	});
}