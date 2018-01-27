exports.play = async function(i) {
	if (i.a.length == 2) {
		const o = [`Rock!`, `Paper!`, `Scissors!`];
		let bC = i.f.r(0, 3);
		let uC;

		// Get User Input
		if (i.a[1].toLowerCase() == `gun`) {
			i.m.channel.send(`*dies lol*`);
			return;
		} else if (i.a[1].toLowerCase() == `rock`)
			uC = 0;
		else if (i.a[1].toLowerCase() == `paper`)
			uC = 1;
		else if (i.a[1].toLowerCase() == `scissors`)
			uC = 2;
		else
			uC = -1;

		// Get Winner/Loser
		if (uC == bC)
			i.m.channel.send(`${o[bC]}, Draw...`);
		else if (uC < 0)
			i.m.channel.send(`Hacker! You can't choose that!`);
		else if (uC == 2 && bC == 0)
			i.m.channel.send(`${o[bC]}, I win!`);
		else if (uC == 2 && bC == 1)
			i.m.channel.send(`${o[bC]}, You win!`);
		else if (uC == 1 && bC == 0)
			i.m.channel.send(`${o[bC]}, You win!`);
		else if (uC == 1 && bC == 2)
			i.m.channel.send(`${o[bC]}, I win!`);
		else if (uC == 0 && bC == 1)
			i.m.channel.send(`${o[bC]}, I win!`);
		else if (uC == 0 && bC == 2)
			i.m.channel.send(`${o[bC]}, You win!`);
		else
			i.m.channel.send(`Something bad happened! Maybe you cheated?`);
	} else {
		i.m.channel.send(`Choose something you doofus!\n\nValid choices are; \`rock\`, \`paper\` and \`scissors\`!`);
	}
}