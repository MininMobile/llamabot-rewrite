const discord = require("discord.js");
const ytdl = require("ytdl-core");
const { getInfo } = require("ytdl-getinfo");
const _util = require("./util");
const Command = require("./framework");
const config = require("../src/config.json")

const util = new _util();

const Music = new Command();

Music.On("init", (scope) => {
	let bot = scope.bot;

	scope.music = {};
	scope.music.status = {};

	Array.from(bot.guilds.values).forEach((guild) => {
		if (!Object.keys(scope.music.status).includes(guild.id)) {
			scope.music.status[guild.id] = {
				volume: 1,
				playing: undefined
			};
		}
	});
});

Music.AddCommand("summon", (message, args, bot, scope) => {
	if (message.member.voiceChannel == null) return message.reply("You are not in a voice channel.").catch(console.error);
	if (message.member.voiceChannel.speakable == false) return message.reply("Bot is unable to speak in your voice channel.").catch(console.error);

	if (!scope.music.status[message.guild.id]) {
		scope.music.status[message.guild.id] = {
			volume: 1,
			playing: undefined
		};
	}

	message.member.voiceChannel.join().catch((e) => message.channel.send(`ERROR: ${"```"}${e}${"```"}`));
});

Music.AddCommand("dc,disconnect", (message, args, bot, scope) => {
	if (message.member.voiceChannel == null) return message.reply("You are not in a voice channel.").catch(console.error);

	let status = { volume: 1, playing: undefined };

	if (scope.music.status[message.guild.id]) {
		status = scope.music.status[message.guild.id];
	} else {
		scope.music.status[message.guild.id] = {
			volume: 1,
			playing: undefined
		};
	}

	status.playing = undefined;

	message.member.voiceChannel.leave();
});

Music.AddCommand("play", (message, args, bot, scope) => {
	if (message.member.voiceChannel == null) return message.reply("You are not in a voice channel.").catch(console.error);
	if (message.member.voiceChannel.speakable == false) return message.reply("Bot is unable to speak in your voice channel.").catch(console.error);
	if (args[1] == undefined) return message.reply("Please provide a link to a YouTube video.").catch(console.error);

	let streamOptions = { volume: 1 };

	if (scope.music.status[message.guild.id]) {
		streamOptions.volume = scope.music.status[message.guild.id].volume;
	} else {
		scope.music.status[message.guild.id] = {
			volume: 1,
			playing: undefined
		};
	}

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

			scope.music.status[message.guild.id].playing = connection;

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

Music.AddCommand("volume", (message, args, bot, scope) => {
	if (scope.music.status[message.guild.id] == undefined) return message.reply("ERROR: ```Error: Music status for guild is undefined```").catch(console.error);
	if (scope.music.status[message.guild.id].playing == undefined) return message.reply("Bot is not in a voice channel.").catch(console.error);
	if (scope.music.status[message.guild.id].playing.dispatcher == undefined) return message.reply("Music is not playing.").catch(console.error);

	let status = scope.music.status[message.guild.id];

	if (args[1] == undefined) {
		message.channel.send(`The current volume is **${status.volume * 100}**/100.`).catch(console.error);
	} else {
		let vol = Math.floor(parseInt(args[1])) / 100;

		if (isNaN(vol)) return message.reply("Invalid volume.").catch(console.error);
		if (vol < 0) return message.reply("Volume is too low.").catch(console.error);
		if (vol > 1 && !_rapists.includes(message.author.id)) return message.reply("Volume is too high, max 100.").catch(console.error);
		if (vol > 10 && _rapists.includes(message.author.id)) return message.reply("Volume is too high, max 1000.").catch(console.error);

		status.volume = vol;
		status.playing.dispatcher.setVolume(vol);

		message.channel.send(`The volume is now **${status.volume * 100}**/100.`).catch(console.error);
	}
});

Music.AddCommand("queue", (message, args, bot, scope) => {
	message.reply("Yeah you can play music but this command is not implemented yet ok").catch(console.error);
});

Music.AddCommand("skip", (message, args, bot, scope) => {
	message.reply("Yeah you can play music but this command is not implemented yet ok").catch(console.error);
});

// people who can set volume to greater than 100
let _rapists = [
	"187245461554462721",
	"176048981615312897"
];

module.exports = exports = Music;
