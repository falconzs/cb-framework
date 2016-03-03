
var CbBot = require('./bot'),
    CbApp = function(api, library) {
        CbBot.call(this, api, library);
    };

CbApp.prototype = Object.create(CbBot.prototype);
CbApp.prototype.constructor = CbApp;
CbApp.prototype.parent = CbBot.prototype;

CbApp.prototype.run = function() {
    this.api.onDrawPanel(this.onDrawPanel.bind(this));
    this.parent.run.call(this);
};

CbApp.prototype.onDrawPanel = function() {
    console.log(onDrawPanel);
};

module.exports = CbApp;
