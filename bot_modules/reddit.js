const Discord = require("discord.js");
const Fetch = require("fetch-subreddit");
const af = require("minin-api-additionalfunctions");
const Command = require("./framework");

const Reddit = new Command();

Reddit.AddCommand("meme,meirl,me_irl", (message, args, bot) => {
	Fetch.fetchSubreddit("me_irl").then((urls) => {
		let memes = urls[0].urls;

		let meme = "fetchmeme";
		while (!_extensions.includes(meme.substr(meme.length-4))) {
			meme = memes[af.randomInt(0, memes.length-1)];
		}
		
		let embed = new Discord.RichEmbed()
			.setImage(meme)
			.setFooter("meme from r/me_irl");

		message.channel.send(embed);
	}).catch((e) => {
		message.channel.send(`ERROR: ${e}`);
	});
});

Reddit.AddCommand("r,reddit", (message, args, bot) => {
	args.shift();
	let words = args.join("");

	Fetch.fetchSubreddit(words).then((urls) => {
		let posts = urls[0].urls;

		let post = "fetchpost";
		let count = 0;
		while (!_extensions.includes(post.substr(post.length-4)) && count < 15) {
			post = posts[af.randomInt(0, posts.length-1)];
			count++;
		}

		let embed;

		if (!_extensions.includes(post.substr(post.length-4))) {
			embed = new Discord.RichEmbed()
				.setDescription("*...oh no, no image posts detected...*")
				.setImage("https://i.kym-cdn.com/photos/images/newsfeed/001/285/460/8b6.jpg")
				.setFooter(`post from r/${words}`);
		} else {
			embed = new Discord.RichEmbed()
				.setImage(post)
				.setFooter(`post from r/${words}`);
		}

		message.channel.send(embed);
	}).catch((e) => {
		message.channel.send(`ERROR: ${e} (either that or the subreddit doesn't exist)`);
	});
});

var _extensions = [
	".jpg",
	"jpeg",
	".png",
	".gif",
	"gifv"
]

module.exports = exports = Reddit;
