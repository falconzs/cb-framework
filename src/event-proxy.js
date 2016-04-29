/* jshint node: true, esversion: 6 */
"use strict";

var User       = require('./user'),
    Message    = require('./message');

class EventProxy {
    constructor(api) {
        this.api = api;
        this.intercepts = {};
    }

    initialise(methods, object) {
        for (let index in methods) {
            var method = methods[index],
                handler = object[method];
            if (typeof handler == 'function') {
                this.api[method](this.proxy(method, object, handler));
            }
        }

        // kick off
        var user = User.createFromUsername(this.api.room_slug, this.api.room_slug);
        object.onStart(user);
    }

    proxy(method, scope, handlerFn) {
        if (!this[method]) {
            return function() {
                return handlerFn.apply(scope, arguments);
            };
        }

        return function () {
            var proxied = this[method].apply(this, arguments);
            if (typeof this.intercepts[method] == 'function') {
                handlerFn = this.intercepts[method].apply(scope, [handlerFn].concat(proxied));
            }
            return handlerFn.apply(scope, proxied);
        }.bind(this);
    }

    redirectCommand(handlerFn) {
        this.intercept('onMessage', function (origHandlerFn, user, message) {
            if (message.isCommand()) {
                message.hide();
                return handlerFn;
            }
            return origHandlerFn;
        });
        return this;
    }
    
    intercept(method, fn) {
        this.intercepts[method] = fn;
        return this;
    }

    onEnter(cbUser) {
        var user = User.create(cbUser);
        return [user];
    }

    onMessage(cbMessage) {
        var user = User.createFromMessage(cbMessage, this.api.room_slug),
            message = new Message(cbMessage.m, user, cbMessage);
        return [user, message];
    }

    onTip(cbTip) {
        var from    = User.createFromTip(cbTip, this.api.room_slug),
            to      = User.createFromUsername(cbTip.to_user, this.api.room_slug),
            message = Message.createFromTip(cbTip, from);
        return [from, to, cbTip.amount, message];
    }

    onLeave(cbUser) {
        var user = User.create(cbUser);
        return [user];
    }

    onDrawPanel() {
        return [];
    }
}

module.exports = EventProxy;
