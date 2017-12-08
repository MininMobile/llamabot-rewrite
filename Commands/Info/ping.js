exports.play = async function(i) {
    const m = await i.m.channel.send(":ping_pong: Pinging...");

    let botPing = `**Bot** ${m.createdTimestamp - i.m.createdTimestamp}ms`;
    let apiPing = `**API** ${Math.round(i.b.ping)}ms`;

    m.edit(`:ping_pong: ${botPing} ${apiPing}`);
}