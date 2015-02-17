# grunt-mokuai-coffee

> A Grunt task to create mokuai closures from CoffeeScript.

[Mokuai](https://github.com/JimRobs/mokuai) lets you write pure JavaScript modules, without any concern about
concatenation order and require calls. [Mokuai-coffee](https://github.com/JimRobs/mokuai-coffee) lets you do the same
thing with CoffeeScript.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mokuai-coffee --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mokuai-coffee');
```

## The "mokuai-coffee" task

### Overview
In your project's Gruntfile, add a section named `mokuai-coffee` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'mokuai-coffee': {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.prepend
Type: `String|Array|Function`
Default value: `[]`

Files that will be prepended to mokuai modules.

#### options.append
Type: `String|Array|Function`
Default value: `[]`

Files that will be appended to mokuai modules.

#### options.exports
Type: `Boolean|String|Function`
Default value: `false`

* false : Nothing is exported. (default)
* true : All modules are exported.
* {value} : The module named as the value is exported.

#### options.exportsname
Type: `String|Function`
Default value: `null`

Overrides the name of the exported module. (Only applicable if exports is true or a string value)

If **NOT** set :
* exports=true : The exportsname is `modules`
* exports={value} : The exportsname is `value`

#### options.autoexports
Type: `Boolean|Function`
Default value: `false`

Whether the modules need to be autoexported.

#### options.partial
Type: `Boolean|Function`
Default value: `false`

Whether the modules should be wrapped in the mokuai closure.

#### options.name
Type: `Function`
Default value: `function(filepath, filename, dest){ return filename; };`

Overrides the names of the modules. Default is the filename.

```js
grunt.initConfig({
  mokuai-coffee: {
    your_target: {
      src: "/src**/*.coffee",
      options: {
        name: function(filepath, filename, dest){
          // Modules names will be capitalized file names
          return capitalize(filename);
        }
      }
    },
  },
});
```

#### Multiple output files

Because, you can define multiple output files, the following options can be replaced by functions that return the value
by destination file.

```js
grunt.initConfig({
  mokuai-coffee: {
    your_target: {
      files: {
        'path/to/output1.js': [ /* ... */ ],
        'path/to/output2.js': [ /* ... */ ],
      },
      options: {
        exports: true,
        exportsname: function(dest){
          if(dest === 'path/to/output1.js'){
            return 'output1';
          } else if(dest === 'path/to/output2.js'){
            return 'output2';
          }
        }
      }
    },
  },
});
```

#### No output file

If no destination file is defined, the mokuai closure (or partial) will be printed in the console.