
function CbUser(name, gender, isHost, isMod, isFan, tippedRecently) {
    this.name   = name;
    this.gender = gender;
    this.isHost = !!isHost;
    this.isMod  = !!isMod;
    this.isFan  = !!isFan;

    this.tippedRecently = !!tippedRecently

    this.fansCanAlwaysTalk = true;
    this.isSilenced = false;
};

CbUser.create = function(data, hostsName) {
    return new CbUser(
        data.user,
        data.gender,
        data.is_mod,
        hostsName == data.user,
        data.in_fanclub,
        data.tipped_recently
    );
};

CbUser.createFromMessage = function(data, hostsName) {
    return new CbUser(
        data.user,
        data.gender,
        data.user == hostsName,
        data.is_mod,
        data.in_fanclub,
        data.tipped_recently
    );
};

CbUser.createFromTip = function(data, hostsName) {
    return new CbUser(
        data.from_user,
        data.from_user_gender,
        data.from_user_is_mod,
        false,
        data.from_user_in_fanclub,
        data.from_user_tipped_recently
    );
};

CbUser.createFromUsername = function(username, hostsName) {
    return new CbUser(
        username,
        false,
        false,
        username == hostsName,
        false,
        false
    );
};

CbUser.prototype.silence = function() {
    this.isSilenced = true;
    return this;
};

CbUser.prototype.unsilence = function() {
    this.isSilenced = false;
    return this;
};

CbUser.prototype.canTalk = function() {
    if (this.isHost || this.isMod) {
        return true;
    }
    if (this.isFan && this.fansCanAlwaysTalk) {
        return true;
    }
    return this.isSilenced === false;
};

CbUser.prototype.allowFansToAlwaysTalk = function() {
    this.fansCanAlwaysTalk = true;
};

CbUser.prototype.disAllowFansToAlwaysTalk = function() {
    this.fansCanAlwaysTalk = false;
};

CbUser.prototype.hasPermission = function(permissions) {
    if (permissions === undefined) {
        return true;
    }
    if (permissions.constructor !== Array) {
        return false;
    }
    return permissions.indexOf(this.getRole()) > -1;
};

CbUser.prototype.getRole = function() {
    switch (true) {
        case this.isHost: return 'host';
        case this.isMod: return 'mod';
        case this.isFan: return 'fan';
        default: return undefined;
    }
};

CbUser.prototype.addRole = function(type) {
    switch (type) {
        case 'mod': this.isMod = true; break;
        case 'fan': this.isFan = true; break;
    }
    return this;
};

CbUser.prototype.removeRole = function(type) {
    switch (type) {
        case 'mod': this.isMod = false; break;
        case 'fan': this.isFan = false; break;
    }
    return this;
};

module.exports = CbUser;
