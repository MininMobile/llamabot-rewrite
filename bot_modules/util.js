class Util {
	constructor(moment) {
		this.m = moment;
	}

	Log(text) {
		console.log(`${this.m().format("LTS")} | ${text}`);
	}
}

module.exports = exports = Util;
