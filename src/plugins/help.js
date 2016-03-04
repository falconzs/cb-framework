
var DefineClass = require('define-class'),
    PluginAbstract = require('./abstract'),
    HelpPlugin = DefineClass(PluginAbstract, {
        //constructor
        init: function() {
            this.descriptions = [];

            this.commands = {
                help: {
                    scope: this,
                    handler: this.displayHelp,
                    description: 'Display this listing of commands.',
                    alias: ['h']
                }
            };
            this._super();
        },

        setDependencies: function(api, library) {
            this._super(api, library);
        },

        discover: function (plugins) {
            var index, plugin;
            for (index in plugins) {
                plugin = plugins[index];
                if (!plugin.commands) {
                    continue;
                }
                this.iterateCommands(plugin.commands);
            }
        },

        iterateCommands: function(commands) {
            var index;
            for (index in commands) {
                if (!commands.hasOwnProperty(index)) {
                    continue;
                }
                this.appendHelpMessage(index, commands[index]);
            }
        },

        appendHelpMessage: function(name, command) {
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
        },

        displayHelp: function(user, command) {
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
    }, {});

module.exports = HelpPlugin;
