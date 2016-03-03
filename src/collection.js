
var DefineClass = require('DefineClass'),
    collection = DefineClass({
        init: function(indexBy, unique) {
            if (indexBy.constructor != 'Array') {
                indexBy = [indexBy];
            }
        },

        add: function(object) {
        },

        remove: function(object) {
        },

        has: function(object, searchBy) {
        },
        
        search: function(callback, indexHint) {
        },

        join: function(separator, field) {
        },

        clear: function() {
        }
    });

module.exports = collection;
