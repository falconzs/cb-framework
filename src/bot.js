"use strict";

var HelpPlugin = require('./plugins/help'),
    EventProxy = require('./event-proxy');

// private functions
var callPlugins = function(method, args) {
        var index, plugin;
        for (index in this.plugins) {
            plugin = this.plugins[index];
            if (typeof plugin[method] == 'function') {
                plugin[method].apply(plugin, args);
            }
        }
    },
    callCommand = function(user, message) {
        var index, plugin, command,
            request = message.getCommand();
        for (index in this.plugins) {
            plugin = this.plugins[index];
            if (
                (command = plugin.satisfies(request)) === false ||
                typeof command.handler != 'function'
            ) {
                continue;
            }

            if (command.access && !user.hasPermission(command.access)) {
                this.api.sendNotice('You don\'t have permission to that command.', user.name);
                return;
            }
            var params = [];
            if (command.params) {
                params = message.getCommandParameters(command.params);
            }
            return command.handler.apply(plugin, [user].concat(params));
        }

        // no plugin satified the requested command, notify user
        this.api.sendNotice('Failed to match command', user.name);
    },
    compileConfig = function() {
        var index, i, pluginSettings, settings = [];
        for (index in this.plugins) {
            pluginSettings = this.plugins[index].settings;
            if (!pluginSettings || pluginSettings.constructor !== Array) {
                continue;
            }

            var i, length = pluginSettings.length;
            for (i = 0; i < length; i++) {
                settings.push(pluginSettings[i]);
            }
        }
        return settings;
    };

class Bot {
    constructor(api) {
        this.api = api;
        this.help = new HelpPlugin();
        this.plugins = [];
        this.register(this.help);
    }

    run() {
        this.help.discover(this.plugins);
        this.api.settings_choices = compileConfig.call(this);

        var methods = ['onEnter', 'onMessage', 'onTip', 'onLeave'],
            eventPoxy = new EventProxy(this.api);
        eventPoxy.initialise(methods, this);

        if (typeof this.onCommand == 'function') {
            eventPoxy.redirectCommand(this.onCommand);
        }
    }

    register(plugin) {
        if (typeof plugin['setDependencies'] == 'function') {
            plugin.setDependencies(this.api);
        }
        this.plugins.push(plugin);
        return this;
    }

    onStart(user) {
        // let the host know we're good to go
        // @todo output some pretty message
        callPlugins.call(this, 'onStart', [user]);
    }

    onEnter(user) {
        callPlugins.call(this, 'onEnter', [user]);
    }

    onCommand(user, message) {
        callCommand.call(this, user, message);
        return message.getResponse();
    }

    onMessage(user, message) {
        callPlugins.call(this, 'onMessage', [user, message]);
        return message.getResponse();
    }

    onTip(from, to, amount, message) {
        callPlugins.call(this, 'onTip', [from, to, amount, message]);
    }

    onLeave(user) {
        callPlugins.call(this, 'onLeave', [user]);
    }
}

module.exports = Bot;
