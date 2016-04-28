"use strict";

class CbDummy {
    constructor() {
        this.fns = {};
    }

    onEnter(fn) {
        console.log('onEnter registered');
        this.fns.enter = fn;
    }

    onMessage(fn) {
        console.log('onMessage registered');
        this.fns.message = fn;
    }

    onTip(fn) {
        console.log('onTip registered');
        this.fns.tip = fn;
    }

    onDrawPanel(fn) {
        console.log('onDrawPanel registered');
        this.fns.drawpanel = fn;
    }

    onLeave(fn) {
        console.log('onLeave registered');
        this.fns.leave = fn;
    }

    log(message) {
        console.log(arguments);
    }

    sendNotice() {
        console.log('sendNotice', arguments);
    }

    emit(event, args) {
        console.log(arguments);
        if (!this.fns.hasOwnProperty(event)) {
            return;
        }
        return this.fns[event].apply(this.fns[event], args);
    }
}

var dummy = new CbDummy();
dummy.settings = {};

module.exports = dummy;
