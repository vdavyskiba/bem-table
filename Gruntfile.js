module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        execute: {
            target: {
                src: ['createDb.js']
            }
        },
        nodeunit: {
            all: ['tests/**/*_test.js'],
            options: {
                reporter : 'default'
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('default', [
        'execute',
        'nodeunit'
    ]);

};