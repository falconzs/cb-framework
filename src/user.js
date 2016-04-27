"use strict";

class User {
    constructor(name, gender, isHost, isMod, isFan, tippedRecently) {
        this.name   = name;
        this.gender = gender;
        this.isHost = !!isHost;
        this.isMod  = !!isMod;
        this.isFan  = !!isFan;

        this.tippedRecently = !!tippedRecently

        this.fansCanAlwaysTalk = true;
        this.isSilenced = false;
    }

    static createFromMessage(data, hostsName) {
        return new User(
            data.user,
            data.gender,
            data.user == hostsName,
            data.is_mod,
            data.in_fanclub,
            data.tipped_recently
        );
    }

    static createFromTip(data, hostsName) {
        return new User(
            data.from_user,
            data.from_user_gender,
            false,
            data.from_user_is_mod,
            data.from_user_in_fanclub,
            data.from_user_tipped_recently
        );
    }
    
    static createFromUsername(username, hostsName) {
        return new User(
            username,
            false,
            false,
            username == hostsName,
            false,
            false
        );
    }
    
    silence() {
        this.isSilenced = true;
        return this;
    }
    
    unsilence() {
        this.isSilenced = false;
        return this;
    }

    canTalk() {
        if (this.isHost || this.isMod) {
            return true;
        }
        if (this.isFan && this.fansCanAlwaysTalk) {
            return true;
        }
        return this.isSilenced === false;
    }

    allowFansToAlwaysTalk() {
        this.fansCanAlwaysTalk = true;
    }

    disAllowFansToAlwaysTalk() {
        this.fansCanAlwaysTalk = false;
    }

    hasPermission(permissions) {
        if (permissions === undefined) {
            return true;
        }
        if (permissions.constructor !== Array) {
            return false;
        }
        return permissions.indexOf(this.getRole()) > -1;
    }

    getRole() {
        switch (true) {
            case this.isHost: return 'host';
            case this.isMod: return 'mod';
            case this.isFan: return 'fan';
            default: return undefined;
        }
    }

    addRole(type) {
        switch (type) {
            case 'mod': this.isMod = true; break;
            case 'fan': this.isFan = true; break;
        }
        return this;
    }

    removeRole(type) {
        switch (type) {
            case 'mod': this.isMod = false; break;
            case 'fan': this.isFan = false; break;
        }
        return this;
    }
}

module.exports = User;
