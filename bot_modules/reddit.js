const Discord = require("discord.js");
const Fetch = require("fetch-subreddit");
const af = require("minin-api-additionalfunctions");
const Command = require("./framework");

const Reddit = new Command();

Reddit.AddCommand("meme", (message, args, bot) => {
	Fetch.fetchSubreddit("me_irl").then((urls) => {
		let memes = urls[0].urls;

		let meme = "fetchmeme";
		while (!_extensions.includes(meme.substr(meme.length-4))) {
			meme = memes[af.randomInt(0, memes.length-1)];
		}
		
		let embed = new Discord.RichEmbed()
			.setImage(meme)
			.setFooter(`me_irl`);

		message.channel.send(embed)
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
