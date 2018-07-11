class Util {
	constructor(moment) {
		this.m = moment;
	}

	csch(z) {
		return 2/(Math.pow(Math.E, z)-Math.pow(Math.E, -z));
	}

	Log(text) {
		console.log(`${this.m().format("LTS")} | ${text}`);
	}
}

module.exports = exports = Util;
