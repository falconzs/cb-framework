"use strict";

var HelpPlugin = require('./plugins/help'),
    EventProxy = require('./event-proxy');

class App {
    constructor(api) {
        this.api = api;
        this.help = new HelpPlugin();

        this.commands = {};
    }

    satisfies(command) {
        if (!this.commands) {
            return false;
        }
        var index, request;
        for (index in this.commands) {
            if (index == command) {
                return this.commands[index];
            }
        }
        return false;
    }

    run() {
        this.help.discover(this);
        this.api.settings_choices = compileConfig.call(this);

        var methods = ['onEnter', 'onMessage', 'onTip', 'onLeave', 'onDrawPanel'],
            eventPoxy = new EventProxy(this.api);
        eventPoxy.initialise(methods, this);

        if (typeof this.onCommand == 'function') {
            eventPoxy.redirectCommand(this.onCommand);
        }
    }

    onCommand(user, message) {
    }
}

module.exports = App;
