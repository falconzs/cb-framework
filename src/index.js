require('./prototypes');

exports.app = require('./app');
exports.bot = require('./bot');
exports.cbdummy = require('./cb-dummy');
exports.cbjsdummy = require('./cbjs-dummy');
exports.collection = require('./collection');
exports.consts = require('./consts');
exports.message = require('./message');
exports.user = require('./user');

exports.pluginAbstract = require('./plugins/abstract');
exports.pluginHelp = require('./plugins/help');
