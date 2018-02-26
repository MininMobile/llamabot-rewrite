/** Class for Importing Information to Commands */
class Imports {
	/**
	 * @param {Object} imports 
	 */
	constructor(imports) {
		this.config = imports.config
		this.v = new require("./ImportSubClasses/data")(imports.v);
		this.f = new require("./ImportSubClasses/functions")(imports.f);
		this.bf = new require("./ImportSubClasses/botFunctions")(imports.bf);
		this.d = imports.d;
		this.b = imports.b;
	}
}

exports = Imports;