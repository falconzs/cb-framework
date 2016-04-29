"use strict";

var HelpPlugin      = require('./plugins/help'),
    EventProxy      = require('./event-proxy'),
    CommandHandler  = require('./command-handler'),
    SettingsHandler = require('./settings-handler');

// private functions
var callPlugins = function(method, args) {
        var index, plugin;
        for (index in this.plugins) {
            plugin = this.plugins[index];
            if (typeof plugin[method] == 'function') {
                plugin[method].apply(plugin, args);
            }
        }
    };

class Bot {
    constructor(api) {
        this.api = api;

        this.commands = new CommandHandler(this.api);
        this.settings = new SettingsHandler();

        this.plugins = [];
        this.help = new HelpPlugin();
        this.register(this.help);
    }

    run() {
        this.help.discover(this.plugins);
        this.api.settings_choices = this.settings.fetch();

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
        this.commands.register(plugin);
        this.settings.register(plugin);
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
        return this.commands.handle(user, message);
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
