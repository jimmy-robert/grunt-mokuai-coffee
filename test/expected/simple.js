(function(){
    var modules = {};
    function setter(){ throw new Error('Cannot manually set module property'); }
    function setModule(name, factory){
        if(modules.hasOwnProperty(name)){
            throw new Error('Module '+name+' already exists.');
        }
        var module;
        Object.defineProperty(modules, name, {
            get: function(){
                if(module) {
                    return module;
                }
                if(factory.busy) {
                    throw new Error('Cyclic dependency detected on module '+name);
                }
                factory.busy = true;
                module = factory();
                factory.busy = false;
                return module;
            },
            set: setter
        });
    }
    with(modules){
        (function() {
          var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
            __hasProp = {}.hasOwnProperty;
        
          (function(modules, module, exports, setModule, setter) {
            return modules.originalWindow = window;
          })(modules, void 0, void 0, void 0, void 0);
        
          setModule('window', function() {
            var exports, module;
            module = {};
            exports = module.exports = {};
            (function(modules, module, exports, setModule, setter) {
              return module.exports = {
                description: "This module dangerously overrides window in the mokuai context with this object. Fortunately, we prepended a file that saves originalWindow, so you can still use it.",
                isWindow: function() {
                  return this === window;
                },
                isOriginalWindow: function() {
                  return this === originalWindow;
                }
              };
            })(modules, module, exports, void 0, void 0);
            return module.exports;
          });
        
          setModule('Horse', function() {
            var exports, module;
            module = {};
            exports = module.exports = {};
            (function(modules, module, exports, setModule, setter) {
              var Horse;
              Horse = (function(_super) {
                __extends(Horse, _super);
        
                function Horse() {
                  return Horse.__super__.constructor.apply(this, arguments);
                }
        
                Horse.prototype.move = function() {
                  alert("Galloping...");
                  return Horse.__super__.move.call(this, 45);
                };
        
                return Horse;
        
              })(Animal);
              return module.exports = Horse;
            })(modules, module, exports, void 0, void 0);
            return module.exports;
          });
        
          setModule('Animal', function() {
            var exports, module;
            module = {};
            exports = module.exports = {};
            (function(modules, module, exports, setModule, setter) {
              var Animal;
              Animal = (function() {
                function Animal(_at_name) {
                  this.name = _at_name;
                }
        
                Animal.prototype.move = function(meters) {
                  return alert(this.name + (" moved " + meters + "m."));
                };
        
                return Animal;
        
              })();
              return module.exports = Animal;
            })(modules, module, exports, void 0, void 0);
            return module.exports;
          });
        
          setModule('Snake', function() {
            var exports, module;
            module = {};
            exports = module.exports = {};
            (function(modules, module, exports, setModule, setter) {
              var Snake;
              Snake = (function(_super) {
                __extends(Snake, _super);
        
                function Snake() {
                  return Snake.__super__.constructor.apply(this, arguments);
                }
        
                Snake.prototype.move = function() {
                  alert("Slithering...");
                  return Snake.__super__.move.call(this, 5);
                };
        
                return Snake;
        
              })(Animal);
              return module.exports = Snake;
            })(modules, module, exports, void 0, void 0);
            return module.exports;
          });
        
          (function(modules, module, exports, setModule, setter) {
            var sam, tom;
            sam = new Snake("Sammy the Python");
            tom = new Horse("Tommy the Palomino");
            sam.move();
            return tom.move();
          })(modules, void 0, void 0, void 0, void 0);
        
        }).call(this);
        
    }
}).call(this);