/** Transfer Functions to Commands */
class Data {
	/**
	 * @param {Object} imports 
	 */
	constructor(imports) {
		this.l = imports.l;
		this.cl = imports.cl;
		this.lm = imports.lm;
		this.r = imports.r;
		this.formatSecs = imports.formatSecs;
		this.removeArrayObject = imports.removeArrayObject;
		this.isNumeric = imports.isNumeric;
	}
}

module.exports = Data;