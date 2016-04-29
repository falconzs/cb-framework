/* jshint node: true, esversion: 6 */
"use strict";

class Abstract {
    constructor() {
        this.settingsMap = null;
    }

    setDependencies(api) {
        this.api = api;
    }
}

module.exports = Abstract;
