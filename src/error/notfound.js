/* jshint node: true, esversion: 6 */
"use strict";

var RuntimeError = require('./runtime');

class NotFoundError extends RuntimeError
{
}

module.exports = NotFoundError;
