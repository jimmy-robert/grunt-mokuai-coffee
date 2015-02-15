/*
 * grunt-mokuai-coffee
 * https://github.com/JimRobs/grunt-mokuai-coffee
 *
 * Copyright (c) 2015 JimRobs
 * Licensed under the MIT license.
 */

'use strict';

var mokuaiCoffee = require('mokuai-coffee');
var _ = require('lodash');

var path = require('path');

module.exports = function (grunt) {

    // Get option result from options
    function optionResult(options, option){
        var result = options[option];
        // If the returned value is a function, call it with the dest option parameter
        if(_.isFunction(result)){
            result = result(options.dest);
        }
        return result;
    }

    // Get prepend/append wrapper (array of file content)
    function optionWrapper(options, option){
        var files = optionResult(options, option);
        // Map all files to their content
        return _.map(grunt.file.expand(files), function(file){
            return grunt.file.read(file);
        });
    }

    grunt.registerMultiTask('mokuai-coffee', 'A Grunt task to create mokuai closures from CoffeeScript.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            // Default no prepend file
            prepend: [],
            // Default no append file
            append: [],
            // Default no exports
            exports: false,
            // Default no exportsname
            exportsname: null,
            // Default no autoexports
            autoexports: false,
            // Default name is filename
            name: function(filepath, filename, dest){
                return filename;
            },
            // Default no partial
            partial: false
        });

        _.each(this.files, function(f){
            // Get destination for this file
            var dest = f.dest;

            // Get modules from files src
            var modules = {};
            _.each(f.src, function(filepath){
                var extname = path.extname(filepath);
                var filename = path.basename(filepath, extname);
                // Get module name from filepath, filename and dest folder
                var name = options.name(filepath, filename, dest);
                // If the module already exists, fail task with a warn level
                if(modules.hasOwnProperty(name)){
                    grunt.fail.warn(new Error('Module name must be unique : found several "'+name+'"'));
                }
                // Save file content into modules map
                modules[name] = grunt.file.read(filepath);
            });

            // Get mokuai-coffee options values
            var prepend = optionWrapper(options, 'prepend');
            var append = optionWrapper(options, 'append');
            var exports = optionResult(options, 'exports');
            var exportsname = optionResult(options, 'exportsname');
            var autoexports = optionResult(options, 'autoexports');
            var partial = optionResult(options, 'partial');

            // Call mokuai-coffee
            var result = mokuaiCoffee(modules, {
                prepend: prepend,
                append: append,
                exports: exports,
                exportsname: exportsname,
                autoexports: autoexports,
                partial: partial
            });

            // If there is a destination file, write result in
            if(dest){
                grunt.file.write(dest, result);
                grunt.log.ok('File "'+dest+'" created.');
            }
            // If no destination file, write result to the console
            else {
                grunt.log.writeln('No dest file: writing mokuai-coffee result to console.');
                grunt.log.writeln(result);
            }
        });
    });

};
