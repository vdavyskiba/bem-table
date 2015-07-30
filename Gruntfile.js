module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {}
        },
        execute: {
            initdb: {
                src: ['createDb.js']
            },
            enb: {
                options: {
                    args: ['make']
                },
                src: ['./node_modules/enb/bin/enb']
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
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('default', [
        'bower',
        'execute',
        'nodeunit'
    ]);

};
