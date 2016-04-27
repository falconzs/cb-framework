"use strict";

var Abstract = require('./abstract');

class Help extends Abstract {
    constructor() {
        super();
        this.descriptions = [];
        this.commands = {
            help: {
                scope: this,
                handler: this.displayHelp,
                description: 'Display this listing of commands.'
            }
        }
    }

    discover(plugins) {
        var index, plugin;
        for (index in plugins) {
            plugin = plugins[index];
            if (!plugin.commands) {
                continue;
            }
            this.iterateCommands(plugin.commands);
        }
    }

    iterateCommands(commands) {
        var index;
        for (index in commands) {
            if (!commands.hasOwnProperty(index)) {
                continue;
            }
            this.appendHelpMessage(index, commands[index]);
        }
    }

    appendHelpMessage(name, command) {
        var message = '/' + name;
        if (command.alias) {
            if (typeof command.alias == 'Array') {
                command.alias = [command.alias];
            }
            var index, alias;
            for (index in command.alias) {
                alias = command.alias[index];
                message +=  ' | /' + command.alias;
            }
        }
        if (command.description) {
            message += ': ' + command.description;
        }
        this.descriptions.push({
            message: message,
            access: command.access
        });
    }

    displayHelp(user, command) {
        var index,
            description,
            output = [],
            color = this.library.colors.light_purple;

        output.push("########### Available Commands ###########");
        for (index in this.descriptions) {
            description = this.descriptions[index];
            if (user.hasPermission(description.access)) {
                output.push(description.message);
            }
        }
        output.push("####### End of Available Commands ########");

        this.api.sendNotice(output.join("\n") + "\n", user.name, color, '', 'bold');
    }
}

module.exports = Help;
