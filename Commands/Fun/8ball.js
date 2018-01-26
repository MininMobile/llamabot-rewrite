exports.play = async function(i) {
    var answers =
    ['Maybe...',
    'Nope!',
    "Don't count on it...",
    'Probably...',
    'Without a doubt!',
    'go to yahoo answers lol',
    'go ask google lol',
    'Definitely!'];

    answer = i.f.r(0, answers.length);
    i.m.channel.send(answers[answer]);
}