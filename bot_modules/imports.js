class Imports {
	constructor(imports) {
		this.config = imports.config
		this.v = new require("./ImportSubClasses/data")(imports.v);
		this.f = {
			l:imports.f.l,
			cl:imports.f.cl,
			lm:imports.f.lm,
			r:imports.f.r,
			formatSecs:imports.f.formatSecs,
			removeArrayObject:imports.f.removeArrayObject,
			isNumeric:imports.f.isNumeric
		}
		this.bf = {
			adblock:imports.bf.adblock
		}
		this.d = imports.d;
		this.b = imports.b;
	}
}

exports = Imports;