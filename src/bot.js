
var HelpPlugin = require('./plugins/help'),
    CbUser     = require('./user'),
    CbMessage  = require('./message');

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

function CbBot(api, library) {
    this.api     = api;
    this.library = library;
    this.help    = new HelpPlugin();

    this.plugins = [];
    this.register(this.help);
}

CbBot.prototype.run = function() {
    // init help commands
    this.help.discover(this.plugins);
    // compile settings
    this.api.settings_choices = compileConfig.call(this);

    // hook in
    this.api.onEnter(this.onEnter.bind(this));
    this.api.onMessage(this.onMessage.bind(this));
    this.api.onTip(this.onTip.bind(this));
    this.api.onLeave(this.onLeave.bind(this));

    // kick off
    this.onStart();
};

CbBot.prototype.register = function(plugin) {
    if (typeof plugin['setDependencies'] == 'function') {
        plugin.setDependencies(this.api, this.library);
    }
    this.plugins.push(plugin);
    return this;
};

CbBot.prototype.onStart = function() {
    // let the host know we're good to go
    // @todo output some pretty message
    var user = CbUser.createFromUsername(this.api.room_slug, this.api.room_slug);
    callPlugins.call(this, 'onStart', [user]);
};

CbBot.prototype.onEnter = function(cbUser) {
    var user = CbUser.create(cbUser);
    callPlugins.call(this, 'onEnter', [user]);
};

CbBot.prototype.onMessage = function(cbMessage) {
    var user = CbUser.createFromMessage(cbMessage, this.api.room_slug),
        message = new CbMessage(cbMessage.m, user, cbMessage);
    if (message.isCommand()) {
        message.hide();
        callCommand.call(this, user, message)
    } else {
        callPlugins.call(this, 'onMessage', [user, message]);
    }

    return cbMessage;
};

CbBot.prototype.onTip = function(cbTip) {
    var from    = CbUser.createFromTip(cbTip, this.api.room_slug),
        to      = CbUser.createFromUsername(cbTip.to_user, this.api.room_slug),
        message = CbMessage.createFromTip(cbTip, from);
    callPlugins.call(this, 'onTip', [from, to, cbTip.amount, message]);
};

CbBot.prototype.onLeave = function(cbUser) {
    var user = CbUser.create(cbUser);
    callPlugins.call(this, 'onLeave', [user]);
};

module.exports = CbBot;
