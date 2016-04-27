"use strict";

class Abstract {
    constructor() {
        this.settingsMap = null;
    }

    setDependencies(api) {
        this.api = api;
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
}

module.exports = Abstract;
