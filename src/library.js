
function library(options) {
    if (!options || !options.cbjs) {
        throw new Error('Missing require CB JS Library');
    }

    var colorRegex = /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;

    return {
        // compiled regexs
        regex: {
            validColor: colorRegex
        },

        // functions
        fn: {
            strCapitalize: function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            strRepeat: function (string, quantity) {
                return new Array(quantity + 1).join(string);
            },
            strEquals: function(string, compare, caseSensitive) {
                var options = (caseSensitive) ? 'i' : undefined,
                    comparison = new RegExp(compare, options);
                return string.match(comparison) != null;
            },
            strIsValidColor: function(code) {
                code = code.trim();
                if (code.charAt(0) == '#') {
                    code = code.split('#', 2)[1];
                }

                return colorRegex.test(code);
            },
            arrayContains: options.cbjs.arrayContains,
            arrayRemove: options.cbjs.arrayRemove
        },

        // special characters
        chars: {
            black_arrow_right: '\u25ba'
        },

        // color mappings
        colors: {
            grey: '#ddd',
            blue: '#01a9db',
            dark_blue: '#246',
            yellow: '#db0', // mustard
            deep_pink: '#b45',
            light_pink: '#fcc',
            green: '#091',
            light_purple: '#d8deff'
        }
    };
}

module.exports = library;
