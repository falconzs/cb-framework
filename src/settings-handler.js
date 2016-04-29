"use strict";

class SettingsHandler {
    constructor(api) {
        this.api = api;
        this.settings = [];
    }

    register(object) {
        var settings = object.settings;
        if (!settings || settings.constructor !== Array) {
            return this;
        }

        this.settings.concat(settings);

        return this;
    }

    fetch() {
        return this.settings;
    }
}

module.exports = SettingsHandler;
