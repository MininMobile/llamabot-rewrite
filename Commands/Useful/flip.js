exports.play = async function(i) {
    var sides = [
        "http://www.stickpng.com/assets/images/580b585b2edbce24c47b27c5.png", // Heads
        "http://touchcoins.moneymuseum.com/coins_media/Federal-Republic-of-Germany-1-Euro-2002/1368/obverse.png" // Tails
    ];

    var sideNames = [
        "Heads!",
        "Tails!"
    ];

    var side = i.f.r(0,2);

    var embed = new i.d.RichEmbed()
        .setTitle(sideNames[side])
        .setImage(sides[side]);

    i.m.channel.send(embed)
}