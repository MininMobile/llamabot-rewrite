exports.play = async function(i) {
    const reddit = require("fetch-subreddit")
    var memes;

    reddit.fetchSubreddit("me_irl").then((urls) => {
        /*
        the var urls now has the value of:

        [ { subreddit: 'me_irl',
            urls:
            [ ... ]
        } ]
        */
        memes = urls[0].urls;
    });

    var meme = memes[i.f.r(0, memes.length)]
    
    i.m.reply(meme)
}