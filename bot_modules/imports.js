class Imports {
	constructor(imports) {
		this.config = imports.config
		this.v = new require("./ImportSubClasses/data")(imports.v);
		this.f = new require("./ImportSubClasses/functions")(imports.f);
		this.bf = new require("./ImportSubClasses/botFunctions")
		this.d = imports.d;
		this.b = imports.b;
	}
}

exports = Imports;