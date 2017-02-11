/* jshint node: true, esversion: 6 */
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
    constructor(api, config) {
        this.api = api;
        this.config = config || {autoProxy: true, enableHelp: true};

        this.commands = new CommandHandler(this.api);
        this.settings = new SettingsHandler();

        this.plugins = [];
        if (this.config.enableHelp) {
            this.help = new HelpPlugin();
            this.register(this.help);
        }
    }

    enableProxy(eventProxy) {
        if (!eventProxy) {
            eventProxy = new EventProxy(this.api);
        }

        var methods = ['onEnter', 'onMessage', 'onTip', 'onLeave'];
        eventProxy.initialise(methods, this);

        if (typeof this.onCommand == 'function') {
            eventProxy.redirectCommand(this.onCommand);
        }
    }

    run() {
        this.help.discover(this.plugins);
        this.api.settings_choices = this.settings.fetch();

        if (this.config.autoProxy) {
            this.enableProxy();
        }
    }

    register(plugin) {
        if (typeof plugin.setDependencies == 'function') {
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
