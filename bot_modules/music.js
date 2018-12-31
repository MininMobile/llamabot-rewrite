const discord = require("discord.js");
const ytdl = require("ytdl-core");
const { getInfo } = require("ytdl-getinfo");
const _util = require("./util");
const Command = require("./framework");
const config = require("../src/config.json")

const util = new _util();

const Music = new Command();

Music.AddCommand("summon", (message, args, bot) => {
	if (message.member.voiceChannel == null) return message.reply("You are not in a voice channel.").catch(console.error);
	if (message.member.voiceChannel.speakable == false) return message.reply("Bot is unable to speak in your voice channel.").catch(console.error);

	message.member.voiceChannel.join().catch((e) => message.channel.send(`ERROR: ${"```"}${e}${"```"}`));
});

Music.AddCommand("dc,disconnect", (message, args, bot) => {
	if (message.member.voiceChannel == null) return message.reply("You are not in a voice channel.").catch(console.error);

	message.member.voiceChannel.leave();
});

Music.AddCommand("play", (message, args, bot) => {	
	if (message.member.voiceChannel == null) return message.reply("You are not in a voice channel.").catch(console.error);
	if (message.member.voiceChannel.speakable == false) return message.reply("Bot is unable to speak in your voice channel.").catch(console.error);
	if (args[1] == undefined) return message.reply("Please provide a link to a YouTube video.").catch(console.error);

	let streamOptions = { seek: 0, volume: 1 };

	args.shift();
	let vquery = args.join(" ");

	let video = {
		//thumbnail: undefined,
		title: undefined,
		url: undefined
	}

	getInfo(vquery).then((i) => {
		let info = i.items[0];

		video.title = info.title;
		video.url = "https://www.youtube.com/watch?v=" + info.id;
	}).then(() => {
		message.member.voiceChannel.join().then((connection) => {
			const stream = ytdl(video.url, {filter : 'audioonly'});
			const dispatcher = connection.playStream(stream, streamOptions);
	
			let embed = new discord.RichEmbed()
				.attachFile(new discord.Attachment("src/img/youtube.png", "youtube.png"))
				.setDescription(`**Now Playing**\n${video.title}`)
				.setThumbnail("attachment://youtube.png")
				.setFooter("streaming from YouTube");
			
			message.channel.sendEmbed(embed);
			util.log(`PLAYING ${video.title} AT ${message.member.voiceChannel.bitrate}kb/s IN ${message.guild.name} (PLAYING ${video.url} IN ${message.guild.id})`);
		}).catch((e) => message.channel.send(`ERROR: ${"```"}${e}${"```"}`));
	}).catch((e) => message.channel.send(`ERROR: ${"```"}${e}${"```"}`));
});

module.exports = exports = Music;
