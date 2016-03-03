module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        "webpack": {
            "my-target": {
                entry: "./src/index.js",
                output: {
                    path: "./",
                    filename: "bundle.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('default', ['webpack']);
};
