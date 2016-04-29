"use strict";

var HelpPlugin = require('./plugins/help'),
    EventProxy = require('./event-proxy'),
    CommandHandler = require('./command-handler'),
    SettingsHandler = require('./settings-handler');

class App {
    constructor(api) {
        this.api = api;
        this.help = new HelpPlugin();
        this.help.setDependencies(this.api);
        this.commands = {};

        this.settings = new SettingsHandler();
        this.handler = new CommandHandler(this.api);
        this.handler.register(this.help);
    }

    run() {
        this.help.discover([this]);
        this.api.settings_choices = this.settings.fetch();

        this.handler.register(this);

        var methods = ['onEnter', 'onMessage', 'onTip', 'onLeave', 'onDrawPanel'],
            eventPoxy = new EventProxy(this.api);
        eventPoxy.initialise(methods, this);

        if (typeof this.onCommand == 'function') {
            eventPoxy.redirectCommand(this.onCommand);
        }
    }

    onCommand(user, message) {
        this.handler.handle(user, message);
    }
}

module.exports = App;
