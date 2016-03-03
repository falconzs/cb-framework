
//var console = console || { log: function() {} };
function cbDummy() {
    this.fns = {};
};

cbDummy.prototype.onEnter = function(fn) { this.fns.enter = fn; };
cbDummy.prototype.onMessage = function(fn) { this.fns.message = fn; };
cbDummy.prototype.onTip = function(fn) { this.fns.tip = fn; };
cbDummy.prototype.onDrawPanel = function(fn) { this.fns.drawpanel = fn; };
cbDummy.prototype.onLeave = function(fn) { this.fns.leave = fn; };
cbDummy.prototype.log = function(message) { console.log(arguments.callee, arguments); };
cbDummy.prototype.sendNotice = function() {
    console.log('sendNotice', arguments);
};

cbDummy.prototype.emit = function(event, args) {
    if (!this.fns.hasOwnProperty(event)) {
        return;
    }
    //console.log
    return this.fns[event].apply(this.fns[event], args);
};

var dummy = new cbDummy();
dummy.settings = {};

module.exports = dummy;
