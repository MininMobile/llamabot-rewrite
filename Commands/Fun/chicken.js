exports.play = async function(i) {
	i.a.shift();
	var words = i.a.join(" ");
	words = words.toLowerCase();

	var result = "";

	for (let i = 0; i < words.length; i++) {
		const letter = words[i]; result += i % 2 == 0 ? letter.toUpperCase() : letter;
	}

	const m = await i.m.channel.send(result, { file: "https://i.amz.mshcdn.com/Zv8QbacjPIeuIowk3H8liiVSmR8=/950x534/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fstory%2Fthumbnail%2F45074%2Fdf8b0cfc-5b48-4a03-bf41-226083dac0d1.png" });
}