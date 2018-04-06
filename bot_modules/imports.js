/** Class for Importing Information to Commands */
class Imports {
	/**
	 * @param {Object} imports 
	 */
	constructor(imports) {
		let v = new require("./ImportSubClasses/data");
		let f = new require("./ImportSubClasses/functions");
		let bf = new require("./ImportSubClasses/botFunctions");

		this.config = imports.config
		this.v = new v(imports.v);
		this.f = new f(imports.f);
		this.bf = new bf(imports.bf);
		this.d = imports.d;
		this.b = imports.b;
	}
}

module.exports = Imports;