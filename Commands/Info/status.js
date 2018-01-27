exports.play = async function(i) {
	let memUsage = (process.memoryUsage().heapUsed/1024/1024/1024).toString();

	var lines = [
	"**Statistics**", "",
	`:bust_in_silhouette: **Users** ${i.b.users.size}`,
	`:busts_in_silhouette: **Channels** ${i.b.channels.size}`,
	`:house: **Servers** ${i.b.guilds.size}`,
	`:iphone: **Node.js Version** ${process.version}`,
	`:calling: **Discord.js Version** ${i.d.version}`,
	`:ram: **Memory Usage** ${memUsage.charAt(0) + memUsage.charAt(1) + memUsage.charAt(2) + memUsage.charAt(3)} GB / 2GB`,
	`:stopwatch: **Uptime** ${i.f.formatSecs(Math.floor(i.b.uptime/1000))} (Days:Hours:Mins:Secs)`, "",
	`Use \`${i.config.prefix}servers\` to list servers.`
	];

	var embed = new i.d.RichEmbed()
		.setDescription(lines.join("\n"));

	i.m.channel.send(embed);
}