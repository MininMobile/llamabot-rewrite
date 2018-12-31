const discord = require("discord.js");

/**
 * Framework for creating commands
 */
class Command {
	/**
	 * Framework for creating commands
	 */
	constructor() {
		this.commands = {};

		this.ev = {};
		this.ev.init = () => { };
	}

	/**
	 * Add a command
	 * @param {string} name name of command
	 * @param {lambda} callback function callback
	 */
	AddCommand(names, callback) {
		names.split(",").forEach((name) => {
			this.commands[name] = callback;
		});
	}

	/**
	 * Set handler for an event
	 * @param {string} name name of event
	 * @param {lambda} callback function callback
	 */
	On(name, callback) {
		switch (name) {
			case "init":
				this.ev.init = callback;
				break;

			default:
				throw new Error("Invalid event specified");
		}
	}

	/**
	 * Call an event
	 * @param {string} name name of event
	 * @param {object} scope scope passed to callback
	 */
	Call(name, scope) {
		switch (name) {
			case "init":
				this.ev.init(scope);
				break;

			default:
				throw new Error("Invalid event specified");
		}
	}
}

module.exports = exports = Command;
