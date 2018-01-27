exports.play = async function(i) {
	if (i.a.length == 2) {
		const options = [`Rock!`, `Paper!`, `Scissors!`];
		let botChoice = i.f.r(0, 3);
		let userChoice;

		// Get User Input
		if (i.a[1].toLowerCase() == `gun`) {
			i.m.channel.send(`*dies lol*`);
			return;
		} else if (i.a[1].toLowerCase() == `rock`)
			userChoice = 0;
		else if (i.a[1].toLowerCase() == `paper`)
			userChoice = 1;
		else if (i.a[1].toLowerCase() == `scissors`)
			userChoice = 2;
		else
			userChoice = -1;

		// Get Winner/Loser
		if (userChoice == botChoice)
			i.m.channel.send(`${options[botChoice]}, Draw...`);
		else if (userChoice < 0)
			i.m.channel.send(`Hacker! You can't choose that!`);
		else if (userChoice == 2 && botChoice == 0)
			i.m.channel.send(`${options[botChoice]}, I win!`);
		else if (userChoice == 2 && botChoice == 1)
			i.m.channel.send(`${options[botChoice]}, You win!`);
		else if (userChoice == 1 && botChoice == 0)
			i.m.channel.send(`${options[botChoice]}, You win!`);
		else if (userChoice == 1 && botChoice == 2)
			i.m.channel.send(`${options[botChoice]}, I win!`);
		else if (userChoice == 0 && botChoice == 1)
			i.m.channel.send(`${options[botChoice]}, I win!`);
		else if (userChoice == 0 && botChoice == 2)
			i.m.channel.send(`${options[botChoice]}, You win!`);
		else
			i.m.channel.send(`Something bad happened! Maybe you cheated?`);
	} else {
		i.m.channel.send(`Choose something you doofus!\n\nValid choices are; \`rock\`, \`paper\` and \`scissors\`!`);
	}
}