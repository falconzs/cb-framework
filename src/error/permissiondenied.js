/* jshint node: true, esversion: 6 */
"use strict";

var RuntimeError = require('./runtime');

class PermissionDeniedError extends RuntimeError
{
}

module.exports = PermissionDeniedError;
