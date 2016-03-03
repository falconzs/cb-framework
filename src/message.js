
var splitCommand = function(message) {
    if (message.indexOf(' ') == -1) {
        message += ' ';
    }
    var parts = message.split(' '),
        command = parts[0].substring(1).trim(),
        params  = parts.splice(-1, 1).join(' ').trim();
    return [command, params];
};

function CbMessage(message, user, response) {
    this.message  = message;
    this.user     = user;
    this.response = response;
    this.command  = null;
    this.parsed   = null;
};

CbMessage.create = function(source, cbMessage) {
    return new CbMessage('', '', cbMessage);
};

CbMessage.createFromTip = function(data, user) {
    return new CbMessage(data.message, user);
};

CbMessage.prototype.isEmpty = function() {
    return this.message == '';
};

CbMessage.prototype.contains = function() {
};

CbMessage.prototype.isCommand = function() {
    return this.message[0] == '/';
};

CbMessage.prototype.getCommand = function() {
    if (this.command === null) {
        this.command = splitCommand(this.message)[0];
    }
    return this.command;
};

CbMessage.prototype.getCommandParameters = function(pattern) {
    if (this.parsed === null) {
        var paramStr = splitCommand(this.message)[1];
        this.parsed = paramStr;
    }
    return this.parsed;
};

CbMessage.prototype.isHidden = function() {
    return this.response['X-Spam'] === true;
};

CbMessage.prototype.hide = function() {
    this.response['X-Spam'] = true;
};

CbMessage.prototype.show = function() {
    if (this.response.hasOwnProperty('X-Spam')) {
        delete this.response['X-Spam'];
    }
};

CbMessage.prototype.getUser = function () {
    return this.user;
};

CbMessage.prototype.getResponse = function () {
    return this.response;
};

module.exports = CbMessage;
