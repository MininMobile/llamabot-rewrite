exports.play = async function(i) {
	let r = require("./../../json/insults.json");

	i.m.channel.send(r[i.f.r(0,r.length)])
}