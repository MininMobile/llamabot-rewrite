exports.play = async function(i) {
    let gif;
    let af = require("minin-api-additionalfunctions");
    let r = require("../../reactions.json");
    
    switch (i.c) {
        case "cool":
            gif = af.randomInt(0, r.cool.length);
            i.m.channel.send(r.cool[gif]);
            break
        case "no":
            gif = af.randomInt(0, r.no.length);
            i.m.channel.send(r.no[gif]);
            break
        case "notcool":
            gif = af.randomInt(0, r.notcool.length);
            i.m.channel.send(r.notcool[gif]);
            break
        case "yeah":
            gif = af.randomInt(0, r.yeah.length);
            i.m.channel.send(r.yeah[gif]);
            break
        case "yes":
            gif = af.randomInt(0, r.yes.length);
            i.m.channel.send(r.yes[gif]);
            break
        case "ohno":
            gif = af.randomInt(0, r.ohno.length);
            i.m.channel.send(r.ohno[gif]);
            break
    }
}