
var DefineClass = require('define-class'),
    abstract = DefineClass({
        init: function() {
            this.settingsMap = null;
        },

        setDependencies: function(api, library) {
            this.api = api;
            this.library = library;
        },

        satisfies: function (command) {
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
    }, {});

module.exports = abstract;
