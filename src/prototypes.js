/* jshint node: true, esversion: 6 */
'use strict';

var hexColor    = /^#?(?:[0-9a-f]{3}){1,2}$/i,
    titleCase   = /\w\S*/g,
    regexEscape = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

/**
 * Capitalize the first letter of the string.
 * @returns {string}
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
};

/**
 * Capitalizes the first letter of each word.
 * @returns {string}
 */
String.prototype.toTitleCase = function() {
    return this.replace(titleCase, function (word) {
        return word.capitalize();
    });
};

/**
 * Compares the two strings for equality.
 * @param {string} compare
 * @param {boolean} caseSensitive Optional, defaults to false.
 * @returns {boolean}
 */
String.prototype.isEqual = function(compare, caseSensitive) {
    compare = compare + '';
    caseSensitive = caseSensitive || false;
    if (!!caseSensitive) {
        return this === compare;
    } else {
        return this.toLowerCase() === compare.toLowerCase();
    }
};

/**
 * Determines if the string is a hexadecimal color. '#' is optional, works with 3 or 6
 * charater length colors.
 * @returns {boolean}
 */
String.prototype.isHexColor = function() {
    return hexColor.test(this.trim());
};

/**
 * Trims the string, adds # if missing and upper or lower cases the string. This
 * does not mean the string is a valid hex color.
 * @param {boolean} upper
 * @returns {string}
 */
String.prototype.filterHexColor = function(upper) {
    upper = upper || true;
    var code = this.trim();
    if (code.charAt(0) !== '#') {
        code = '#' + code;
    }
    return !!upper ? code.toUpperCase() : code.toLowerCase();
};

/**
 * Escape a string to be used in a regular expression.
 * @see http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
 * @param {string} string
 * @returns {string}
 */
String.prototype.toRegex = function() {
    return this.replace(regexEscape, "\\$&");
};

/**
 * Converts a number to string ordinal number.
 * @see https://gist.github.com/jlbruno/1535691
 * @returns {string}
 */
Number.prototype.toOrdinal = function() {
    var n,
        s = ["th","st","nd","rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
