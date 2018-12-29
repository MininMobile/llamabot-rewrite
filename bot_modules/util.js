class util {
	constructor(moment) {
		this.m = moment;
	}

	removeArrayItem(array, object) {
		let loc = array.indexOf(object);

		while (loc != -1) {
			array.splice(loc, 1);
			loc = array.indexOf(object);
		}
	}

	formatSecs(secs) {
		// Get Days/Hours/Minutes/Seconds
		let numdays = Math.floor(secs / 86400);
		let numhours = Math.floor((secs % 86400) / 3600);
		let numminutes = Math.floor(((secs % 86400) % 3600) / 60);
		let numseconds = ((secs % 86400) % 3600) % 60;
		
		// Format Calculations
		let result = numdays + ":" + numhours + ":" + numminutes + ":" + numseconds;
		
		// Return Result
		return result;
	}

	rand(min, max) {
		return Math.floor(Math.random() * max) + min;
	}

	csch(z) {
		return 2/(Math.pow(Math.E, z)-Math.pow(Math.E, -z));
	}

	log(text) {
		console.log(`${this.m().format("LTS")} | ${text}`);
	}
}

module.exports = exports = util;
