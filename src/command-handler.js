/* jshint node: true, esversion: 6 */
"use strict";

var InvalidCommand   = require('./error/invalidcommand'),
    PermissionDenied = require('./error/permissiondenied');

class CommandHandler {
    constructor(api) {
        this.api = api;
        this.commands = {};
    }

    register(object) {
        if (!object.commands) {
            return this;
        }

        for (let command in object.commands) {
            if (this.commands.hasOwnProperty(command)) {
                throw new InvalidCommand("Specified command '" + command + "' clashes with an existing command.");
            }
            if (!object.commands[command].scope) {
                object.commands[command].scope = object;
            }
            this.commands[command] = object.commands[command];
        }

        return this;
    }

    handle(user, message) {
        try {
            var command = message.getCommand();
            if (!this.commands[command]) {
                throw new InvalidCommand("Specified command '" + command + "' is not valid.");
            }

            command = this.commands[command];
            if (command.access && !user.hasPermission(command.access)) {
                throw new PermissionDenied('You do not have permission to that command');
            }

            var params = [];
            if (command.params) {
                params = message.getCommandParameters(command.params);
            }
            command.handler.apply(command.scope, [user].concat(params));

        } catch (error) {
            this.api.sendNotice(error.toString(), user.name);
        } finally {
            return message.getResponse();
        }
    }
}

module.exports = CommandHandler;
