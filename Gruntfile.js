/*
 * grunt-mokuai-coffee
 * https://github.com/JimRobs/grunt-mokuai-coffee
 *
 * Copyright (c) 2015 JimRobs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: true
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: 'test/tmp'
        },

        // Configuration to be run (and then tested).
        'mokuai-coffee': {
            simple: {
                files: {
                    'test/tmp/simple.js': [
                        'test/fixtures/modules/window.coffee',
                        'test/fixtures/modules/Horse.coffee',
                        'test/fixtures/modules/Animal.coffee',
                        'test/fixtures/modules/Snake.coffee'
                    ]
                },
                options: {
                    prepend: 'test/fixtures/prepend/window.coffee',
                    append: [
                        'test/fixtures/append/instances.coffee',
                        'test/fixtures/append/move.coffee'
                    ]
                }
            },
            'simple.partial': {
                files: {
                    'test/tmp/simple.partial.js': [
                        'test/fixtures/modules/window.coffee',
                        'test/fixtures/modules/Horse.coffee',
                        'test/fixtures/modules/Animal.coffee',
                        'test/fixtures/modules/Snake.coffee'
                    ]
                },
                options: {
                    prepend: 'test/fixtures/prepend/window.coffee',
                    append: [
                        'test/fixtures/append/instances.coffee',
                        'test/fixtures/append/move.coffee'
                    ],
                    partial: true
                }
            },
            'simple.autoexports': {
                files: {
                    'test/tmp/simple.autoexports.js': [
                        'test/fixtures/modules/autoexports/window.coffee',
                        'test/fixtures/modules/autoexports/Horse.coffee',
                        'test/fixtures/modules/autoexports/Animal.coffee',
                        'test/fixtures/modules/autoexports/Snake.coffee'
                    ]
                },
                options: {
                    prepend: [ 'test/fixtures/prepend/window.coffee' ],
                    append: [
                        'test/fixtures/append/instances.coffee',
                        'test/fixtures/append/move.coffee'
                    ],
                    autoexports: true,
                    exports: true
                }
            },
            'custom': {
                dest: 'test/tmp/custom.js',
                src: [
                    'test/fixtures/modules/Horse.coffee',
                    'test/fixtures/modules/Animal.coffee',
                    'test/fixtures/modules/Snake.coffee'
                ],
                options: {
                    exports: true,
                    name: function(filepath, filename){
                        switch(filename){
                            case 'Horse': return 'JollyJumper';
                            case 'Snake': return 'Kaa';
                            default: return filename;
                        }
                    }
                }
            },
            'custom.jollyjumper': {
                dest: 'test/tmp/custom.jollyjumper.js',
                src: [
                    'test/fixtures/modules/Horse.coffee',
                    'test/fixtures/modules/Animal.coffee'
                ],
                options: {
                    exports: 'JollyJumper',
                    name: function(filepath, filename){
                        switch(filename){
                            case 'Horse': return 'JollyJumper';
                            default: return filename;
                        }
                    }
                }
            },
            'custom.besthorse': {
                dest: 'test/tmp/custom.besthorse.js',
                src: [
                    'test/fixtures/modules/Horse.coffee',
                    'test/fixtures/modules/Animal.coffee'
                ],
                options: {
                    exports: 'JollyJumper',
                    exportsname: 'BestHorseEver',
                    name: function(filepath, filename){
                        switch(filename){
                            case 'Horse': return 'JollyJumper';
                            default: return filename;
                        }
                    }
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: [
                'test/*.test.js'
            ]
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', [
        'clean',
        'mokuai-coffee',
        'nodeunit',
        'clean'
    ]);
};