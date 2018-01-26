exports.play = async function(i) {
    var sides = 6;

    if (i.a[1] != null) {
        if (i.f.isNumeric(i.a[1])) {
            sides = i.a[1];
        }
    }

    var roll = i.f.r(1,sides);
    i.m.channel.send(`**You rolled a** ${roll}`)
}
