const Discord = require("discord.js");

/**
 * Framework for creating commands
 */
class Command {
	/**
	 * Framework for creating commands
	 */
	constructor() {
		this.commands = {};
	}

	/**
	 * Add a command
	 * @param {string} name name of command
	 * @param {lambda} callback function callback
	 */
	AddCommand(name, callback) {
		this.commands[name] = callback;
	}
}

module.exports = exports = Command;
