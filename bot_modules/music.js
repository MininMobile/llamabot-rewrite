const discord = require("discord.js");
const Command = require("./framework");

const Music = new Command();

Music.AddCommand("summon", (message, args, bot) => {
	let streamOptions = { seek: 0, volume: 1 };

	if (message.member.voiceChannel == null) return message.reply("You are not in a voice channel.").catch(console.error);
	if (message.member.voiceChannel.speakable == false) return message.reply("Bot is unable to speak in your voice channel.").catch(console.error);

	message.member.voiceChannel.join().catch((e) => message.channel.send(`ERROR: ${"```"}${e}${"```"}`));
});

Music.AddCommand("dc,disconnect", (message, args, bot) => {
	if (message.member.voiceChannel == null) return message.reply("You are not in a voice channel.").catch(console.error);

	message.member.voiceChannel.leave().catch((e) => message.channel.send(`ERROR: ${"```"}${e}${"```"}`));
});

/*
if (commandIs('play', message)) {
	let streamOptions = { seek: 0, volume: 1 };
	if (message.member.voiceChannel == null) {
		message.reply('You are not in a voice channel. :thinking:')
		log('User not in VC.');
	} else if (message.member.voiceChannel.speakable == false) {
		message.reply('Bot is unable to speak in your voice channel. :thinking:')
		log("Can't talk in VC.");
	} else {
		if (args[1] == null) {
			message.reply('Please use a proper YouTube video/SoundCloud Audio link, non-https urls are not allowed! :thinking:');
		} else if (args[1].startsWith("https://youtube.com") || args[1].startsWith("https://www.youtube.com")) {
			message.member.voiceChannel.join().then(connection => {
				const stream = ytdl(args[1], {filter : 'audioonly'});
				const dispatcher = connection.playStream(stream, streamOptions);

				let infoEmbed = new discord.RichEmbed()
					.addField("Now Playing", args[1], true)
					.setFooter("Playing from YouTube, Bitrate is " + message.member.voiceChannel.bitrate + " kb/s")
					.setThumbnail("https://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png");
				
				message.channel.sendEmbed(infoEmbed);
				console.log(`${moment().format('LTS')} | Playing Music at ${message.member.voiceChannel.bitrate} kb/s`);

				dispatcher.setVolume(0.25);
			});
		} else {
			message.reply('Please use a proper YouTube video' + ', non-https urls are not allowed! :thinking:');
		}
	}
}
*/

module.exports = exports = Music;
