"use strict";

var splitCommand = function(message) {
    if (message.indexOf(' ') == -1) {
        message += ' ';
    }
    var parts = message.split(' '),
        command = parts[0].substring(1).trim(),
        params  = parts.splice(-1, 1).join(' ').trim();
    return [command, params];
};

class Message {
    constructor(message, user, response) {
        this.message  = message.trim();
        this.user     = user;
        this.response = response;
        this.command  = null;
        this.parsed   = null;
    }

    static create(source, cbMessage) {
        return new CbMessage('', '', cbMessage);
    }

    static createFromTip(data, user) {
        return new Message(data.message, user);
    }

    isEmpty() {
        return this.message == '';
    }

    isCommand() {
        return this.message.charAt(0) === '/';
    }

    getCommand() {
        if (this.command === null) {
            this.command = splitCommand(this.message)[0];
        }
        return this.command;
    }

    getCommandParameters(pattern) {
        if (this.parsed === null) {
            var paramStr = splitCommand(this.message)[1];
            this.parsed = paramStr;
        }
        return this.parsed;
    }

    isHidden() {
        return this.response['X-Spam'] === true;
    }

    hide() {
        this.response['X-Spam'] = true;
        return this;
    }

    show() {
        if (this.response.hasOwnProperty('X-Spam')) {
            delete this.response['X-Spam'];
        }
        return this;
    }

    getUser() {
        return this.user;
    }

    getResponse() {
        return this.response;
    }
}

module.exports = Message;
