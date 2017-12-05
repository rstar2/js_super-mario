/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 101);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(120);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(2);
var ctx = __webpack_require__(15);
var hide = __webpack_require__(16);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(49)('wks');
var uid = __webpack_require__(37);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(70);
var toPrimitive = __webpack_require__(46);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Entity = undefined;

var _symbol = __webpack_require__(60);

var _symbol2 = _interopRequireDefault(_symbol);

var _slicedToArray2 = __webpack_require__(31);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = __webpack_require__(94);

var _from2 = _interopRequireDefault(_from);

var _map = __webpack_require__(56);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _math = __webpack_require__(55);

var _Bounds = __webpack_require__(162);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Entity = exports.Entity = function () {
    function Entity(name) {
        (0, _classCallCheck3.default)(this, Entity);

        this.NAME = name;
        // current possition
        this._pos = new _math.Vector(0, 0);
        // current velocity
        this._vel = new _math.Vector(0, 0);
        // current size
        this._size = new _math.Vector(0, 0);
        // current offset (allow drawn size to be different that the real size)
        this._offset = new _math.Vector(0, 0);

        // it wil make all calculations 
        this._bounds = new _Bounds.Bounds(this._pos, this._size, this._offset);

        this._lifetime = 0;

        this._traits = [];

        this._animations = new _map2.default();
    }

    /**
     * @returns {Bounds}
     */


    (0, _createClass3.default)(Entity, [{
        key: 'registerTrait',


        /**
         * 
         * @param {Trait} trait 
         */
        value: function registerTrait(trait) {
            // remember all registered trait
            this._traits.push(trait);

            // expose it by its name to the entity
            this[trait.NAME] = trait;
        }

        /**
         * Register an animation. It can be bound to a {@link Trait} instance.
         * It also allow a {@link Trait} to have multiple animations
         * Like main "walk", "walk-run", "walk-break", "walk-turbo", etc...
         * @param {String} animName 
         * @param {(progress: Number)} animation 
         */

    }, {
        key: 'registerAnimation',
        value: function registerAnimation(animName, animation) {
            var idx = animName.indexOf('-');
            var mainName = animName;
            var subName = animName;
            if (idx > 0) {
                mainName = animName.substring(0, idx);
                subName = animName.substring(idx + 1);
            }
            var animations = this._animations.get(mainName);
            if (!animations) {
                animations = new _map2.default();
                this._animations.set(mainName, animations);
            }
            animations.set(subName, animation);
        }

        /**
         * Move all registered animations from the {@link SpriteSheet} object to the entity
         * @param {SpriteSheet} sprites 
         */

    }, {
        key: 'registerAnimationsFromSprites',
        value: function registerAnimationsFromSprites(sprites) {
            var _this = this;

            sprites.forEachAnimation(function (animation, name) {
                _this.registerAnimation(name, animation);
            });
        }

        /**
         * 
         * @param {Level} level 
         */

    }, {
        key: 'animate',
        value: function animate(level) {
            var _this2 = this;

            return (0, _from2.default)(this._animations).reduce(function (accum, _ref) {
                var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                    animName = _ref2[0],
                    animations = _ref2[1];

                // check to see if there's such Trait registered and if there is then
                // call it's animation method,
                // if not then use the level's total time as a progress for a animation
                // that is not connected to a Trait

                var trait = _this2[animName];
                if (trait) {
                    var _trait$animate = trait.animate(_this2, animations, level.getTotalTime()),
                        tile = _trait$animate.tile,
                        mirrored = _trait$animate.mirrored;

                    if (accum.tile === undefined) {
                        accum.tile = tile;
                    }
                    if (accum.mirrored === undefined) {
                        accum.mirrored = mirrored;
                    }
                } else {
                    throw new Error('Unsupported standalone animation ' + animName);
                    // not used for now - all animation for an entity are connnected to a Trait.
                    // thus if needed a "standalone" animation then a specific Trait can be created
                    // just for it
                }

                return accum;
            }, { tile: undefined, mirrored: undefined });
        }

        /**
         * 
         * @param {Number} rate
         * @param {Level} level  
         */

    }, {
        key: 'update',
        value: function update(rate, level) {
            var _this3 = this;

            this._traits.forEach(function (trait) {
                return trait.update(_this3, rate, level);
            });

            // increase also the overall lifetime of the entity
            this._lifetime += rate;
        }

        /**
         * 
         * @param {CanvasRenderingContext2D} context 
         * @param {Level} level 
         */
        // eslint-disable-next-line no-unused-vars

    }, {
        key: 'draw',
        value: function draw(context, level) {
            throw new Error("Each Entity should overwrite this abstract method");
        }
    }, {
        key: 'finalize',
        value: function finalize() {
            this._traits.forEach(function (trait) {
                return trait.finalize();
            });
        }

        /**
         * Called when the entity was "obstructed" by a "ground" tile
         * @param {{tile:Tile, x1:Number, x2:Number, y1:Number, y2:Number}} obstacle
         * @param {Number} direction 
         */

    }, {
        key: 'obstructedBy',
        value: function obstructedBy(obstacle, direction) {
            var _this4 = this;

            this._traits.forEach(function (trait) {
                return trait.obstructed(_this4, obstacle, direction);
            });
        }

        /**
         * Called when the entity has "collided" with another entity.
         * @param {Entity} other 
         */

    }, {
        key: 'collidedWith',
        value: function collidedWith(other) {
            var _this5 = this;

            this._traits.forEach(function (trait) {
                return trait.collided(_this5, other);
            });
        }
    }, {
        key: 'bounds',
        get: function get() {
            return this._bounds;
        }

        /**
         * @returns {Vector}
         */

    }, {
        key: 'pos',
        get: function get() {
            return this._pos;
        }

        /**
         * @returns {Vector}
         */

    }, {
        key: 'vel',
        get: function get() {
            return this._vel;
        }

        /**
         * @returns {Vector}
         */

    }, {
        key: 'size',
        get: function get() {
            return this._size;
        }

        /**
         * @returns {Vector}
         */

    }, {
        key: 'offset',
        get: function get() {
            return this._offset;
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'lifetime',
        get: function get() {
            return this._lifetime;
        }
    }]);
    return Entity;
}();

/**
 * Collide directon TOP
 * @constant
 * @static
 */


Entity.COLLIDE_TOP = (0, _symbol2.default)(1);
/**
 * Collide directon BOTTOM
 * @constant
 * @static
 */
Entity.COLLIDE_BOTTOM = (0, _symbol2.default)(2);
/**
 * Collide directon LEFT
 * @constant
 * @static
 */
Entity.COLLIDE_LEFT = (0, _symbol2.default)(3);
/**
 * Collide directon RIGHT
 * @constant
 * @static
 */
Entity.COLLIDE_RIGHT = (0, _symbol2.default)(4);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(18)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(171), __esModule: true };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(98);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(176);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(180);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(98);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trait = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Tile = __webpack_require__(91);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trait = exports.Trait = function () {
    function Trait(name) {
        var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        (0, _classCallCheck3.default)(this, Trait);

        this.NAME = name;
        this._isBehavior = isBehavior;
        this._queuedTasks = [];
    }

    (0, _createClass3.default)(Trait, [{
        key: "finalize",
        value: function finalize() {
            // perform each queued tasks
            this._queuedTasks.forEach(function (task) {
                return task();
            });
            this._queuedTasks.length = 0;
        }

        /**
         * Queue up a task to be executed when the {@see finalize} method is called
         * @param {Function} task 
         */

    }, {
        key: "queueTask",
        value: function queueTask(task) {
            this._queuedTasks.push(task);
        }

        /**
         * 
         * @param {Entity} entity 
         * @param {Number} rate
         * @param {Level} level 
         */
        // eslint-disable-next-line no-unused-vars

    }, {
        key: "update",
        value: function update(entity, rate, level) {
            if (!this._isBehavior) {
                throw new Error("Abstract method 'update' is not implemented");
            }
        }

        /**
         * 
         * @param {Entity} entity 
         * @param {Map<name:String, (progress: Number)>} animations 
         * @param {Number} levelTotalTime 
         */
        // should return an object { tile, mirrored }
        // with the next frame/tile name to be drawn, and whether or not it's mirrored in the sprites
        // eslint-disable-next-line no-unused-vars

    }, {
        key: "animate",
        value: function animate(entity, animations, levelTotalTime) {
            if (!this._isBehavior) {
                throw new Error("Abstract method 'animate' is not implemented");
            }
        }

        /**
         * 
         * @param {Entity} entity 
         * @param {{tile:Tile, x1:Number, x2:Number, y1:Number, y2:Number}} obstacle 
         * @param {Number} direction 
         */
        // eslint-disable-next-line no-unused-vars

    }, {
        key: "obstructed",
        value: function obstructed(entity, obstacle, direction) {}
        // keep empty , inheritors may overwrite it they need to


        /**
         * 
         * @param {Entity} entity 
         * @param {Entity} otherEntity 
         */
        // eslint-disable-next-line no-unused-vars

    }, {
        key: "collided",
        value: function collided(entity, otherEntity) {
            // keep empty , inheritors may overwrite it they need to
        }
    }]);
    return Trait;
}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(25);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(26);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(107)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(44)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isLogDbg = isLogDbg;
exports.isLogInfo = isLogInfo;
exports.isLogWarn = isLogWarn;
exports.isLogError = isLogError;
exports.logDbg = logDbg;
exports.logInfo = logInfo;
exports.logWarn = logWarn;
exports.logError = logError;
/* eslint-disable no-console */

var LEVEL_DEBUG = exports.LEVEL_DEBUG = 0;
var LEVEL_INFO = exports.LEVEL_INFO = 1;
var LEVEL_WARN = exports.LEVEL_WARN = 2;
var LEVEL_ERROR = exports.LEVEL_ERROR = 3;

// const level = LEVEL_DEBUG;
var level = LEVEL_WARN;

function isLog(levelNeeded) {
    return level <= levelNeeded;
}

function log(levelNeeded, logFunc, logFuncArguments) {
    if (isLog(levelNeeded)) {
        logFunc.apply(null, logFuncArguments);
    }
}

/* Check functions */

function isLogDbg() {
    isLog(LEVEL_DEBUG);
}

function isLogInfo() {
    isLog(LEVEL_INFO);
}
function isLogWarn() {
    isLog(LEVEL_WARN);
}

function isLogError() {
    isLog(LEVEL_ERROR);
}

/* Log functions */

function logDbg() {
    log(LEVEL_DEBUG, console.log, arguments);
}

function logInfo() {
    log(LEVEL_INFO, console.info, arguments);
}
function logWarn() {
    log(LEVEL_WARN, console.warn, arguments);
}

function logError() {
    log(LEVEL_ERROR, console.error, arguments);
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47);
var defined = __webpack_require__(43);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(112);
var global = __webpack_require__(5);
var hide = __webpack_require__(16);
var Iterators = __webpack_require__(21);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(19);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(43);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var call = __webpack_require__(76);
var isArrayIter = __webpack_require__(77);
var anObject = __webpack_require__(8);
var toLength = __webpack_require__(36);
var getIterFn = __webpack_require__(52);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(138);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(39);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 32 */
/***/ (function(module, exports) {



/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(8);
var dPs = __webpack_require__(109);
var enumBugKeys = __webpack_require__(50);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(45)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(73).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(72);
var enumBugKeys = __webpack_require__(50);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(42);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(27);
var TAG = __webpack_require__(4)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(31);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = __webpack_require__(24);

var _promise2 = _interopRequireDefault(_promise);

exports.loadSprites = loadSprites;

var _SpriteSheet = __webpack_require__(64);

var _utils = __webpack_require__(63);

var _animation = __webpack_require__(167);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {String} name 
 * @param {Boolean} mirrored
 * @returns {Promise<SpriteSheet>}
 */
function loadSprites(name) {
    var mirrored = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return (0, _utils.loadData)('sprites/' + name).then(function (spritesSpec) {
        return _promise2.default.all([spritesSpec, (0, _utils.loadImage)(spritesSpec.spritesURL)]);
    }).then(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            spritesSpec = _ref2[0],
            spritesImage = _ref2[1];

        var sprites = new _SpriteSheet.SpriteSheet(spritesImage, mirrored, spritesSpec.tileWidth, spritesSpec.tileHeight);

        spritesSpec.tiles.forEach(function (tileSpec) {
            // the specific tile's width and height are optional in the tileSpec
            // if missing then the global spritesSpec.tileWidth/spritesSpec.tileHeight will be used

            // a tile can be specified by index (when sprite is with fixed size grid)
            // or by pos and size (optional)
            var name = tileSpec.name,
                index = tileSpec.index;


            if (index) {
                var _index = (0, _slicedToArray3.default)(index, 2),
                    indexX = _index[0],
                    indexY = _index[1];

                sprites.registerTile(name, indexX, indexY);
            } else {
                // pos is obligatory then, but size is again optional
                var _tileSpec$pos = (0, _slicedToArray3.default)(tileSpec.pos, 2),
                    x = _tileSpec$pos[0],
                    y = _tileSpec$pos[1];

                var width = void 0,
                    height = void 0;
                if (tileSpec.size) {
                    width = tileSpec.size[0];
                    height = tileSpec.size[1];
                }
                sprites.register(name, x, y, width, height);
            }
        });

        // if defined animations for any tile
        if (spritesSpec.animations) {
            spritesSpec.animations.forEach(function (animSpec) {
                var animation = (0, _animation.createAnimation)(animSpec.frames, animSpec.frameRate);
                sprites.registerAnimation(animSpec.name, animation);
            });
        }

        return sprites;
    });
}

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(71);
var hide = __webpack_require__(16);
var has = __webpack_require__(19);
var Iterators = __webpack_require__(21);
var $iterCreate = __webpack_require__(108);
var setToStringTag = __webpack_require__(28);
var getPrototypeOf = __webpack_require__(74);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(27);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49)('keys');
var uid = __webpack_require__(37);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(38);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(21);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(25);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(16);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Matrix = exports.Vector = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vector = exports.Vector = function () {
    function Vector(x, y) {
        (0, _classCallCheck3.default)(this, Vector);

        this.set(x, y);
    }

    (0, _createClass3.default)(Vector, [{
        key: "set",
        value: function set(x, y) {
            this._x = x;
            this._y = y;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Vector(this._x, this._y);
        }
    }, {
        key: "x",
        get: function get() {
            return this._x;
        },
        set: function set(x) {
            this._x = x;
        }
    }, {
        key: "y",
        get: function get() {
            return this._y;
        },
        set: function set(y) {
            this._y = y;
        }
    }]);
    return Vector;
}();

var Matrix = exports.Matrix = function () {
    function Matrix() {
        (0, _classCallCheck3.default)(this, Matrix);

        this._grid = [];
    }

    (0, _createClass3.default)(Matrix, [{
        key: "set",
        value: function set(x, y, value) {
            if (!this._grid[x]) {
                this._grid[x] = [];
            }
            this._grid[x][y] = value;
        }
    }, {
        key: "get",
        value: function get(x, y) {
            var col = this._grid[x];
            return col ? col[y] : undefined;
        }
    }, {
        key: "forEach",
        value: function forEach(callback) {
            this._grid.forEach(function (column, x) {
                column.forEach(function (value, y) {
                    return callback(x, y, value);
                });
            });
        }
    }, {
        key: "forEachInColumn",
        value: function forEachInColumn(x, callback) {
            var column = this._grid[x];
            if (column) {
                column.forEach(function (value, y) {
                    return callback(x, y, value);
                });
            }
        }
    }]);
    return Matrix;
}();

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(37)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(19);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(18)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(33);
var wksExt = __webpack_require__(61);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(24);

var _promise2 = _interopRequireDefault(_promise);

exports.loadImage = loadImage;
exports.loadDataLevel = loadDataLevel;
exports.loadData = loadData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadImage(name) {
    return new _promise2.default(function (resolve, reject) {
        var image = new Image();
        image.addEventListener('load', function () {
            return resolve(image);
        });
        image.addEventListener('error', function () {
            return reject(image);
        });
        image.src = name;
    });
}

var loadJson = function loadJson(url) {
    return fetch(url).then(function (r) {
        return r.json();
    });
};

function loadDataLevel(name) {
    return loadData('levels/' + name);
}

function loadData(name) {
    return loadJson('data/' + name + '.json');
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpriteSheet = undefined;

var _map = __webpack_require__(56);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _logger = __webpack_require__(20);

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpriteSheet = exports.SpriteSheet = function () {
    function SpriteSheet(image) {
        var mirrored = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var tileWidth = arguments[2];
        var tileHeight = arguments[3];
        (0, _classCallCheck3.default)(this, SpriteSheet);

        this._image = image;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;
        this._mirrored = mirrored;

        this._tiles = new _map2.default();
        this._animations = new _map2.default();
    }

    (0, _createClass3.default)(SpriteSheet, [{
        key: 'register',
        value: function register(tile, x, y, width, height) {
            var _this = this;

            var mirrors = this._mirrored ? [false, true] : [false];

            var tileImages = mirrors.map(function (mirrored) {
                var tileImage = document.createElement('canvas');
                width = width || _this._tileWidth;
                height = height || _this._tileHeight;
                tileImage.width = width;
                tileImage.height = height;

                var tileImageCtx = tileImage.getContext('2d');

                // flip the image
                if (mirrored) {
                    tileImageCtx.scale(-1, 1);
                    tileImageCtx.translate(-width, 0);
                }

                tileImageCtx.drawImage(_this._image, x, y, width, height, 0, 0, width, height);
                return tileImage;
            });

            if (this._mirrored) {
                // if mirrored then register both tile images as a coupl
                this._tiles.set(tile, tileImages);
            } else {
                // if not mirrored then register the single tile image
                this._tiles.set(tile, tileImages[0]);
            }
        }
    }, {
        key: 'registerTile',
        value: function registerTile(tile, indexX, indexY) {
            this.register(tile, indexX * this._tileWidth, indexY * this._tileHeight);
        }
    }, {
        key: 'registerAnimation',
        value: function registerAnimation(tile, animation) {
            this._animations.set(tile, animation);
        }

        /**
         * @param {(animation:Function, name:String)=>void} callback 
         */

    }, {
        key: 'forEachAnimation',
        value: function forEachAnimation(callback) {
            this._animations.forEach(callback);
        }
    }, {
        key: 'draw',
        value: function draw(tile, context, x, y) {
            var mirrored = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var tileImage = this._tiles.get(tile);
            if (tileImage) {
                var image = tileImage;
                if (this._mirrored) {
                    // if sprites is mirror this means that 2 image tiles are registered for each name
                    // so we have to draw the desired one
                    image = tileImage[mirrored ? 1 : 0];
                }
                context.drawImage(image, x, y);

                return [image.width, image.height];
            }

            logger.logWarn('No tile set for ' + tile);
            return [0, 0];
        }
    }, {
        key: 'drawTile',
        value: function drawTile(tile, context, indexX, indexY, mirrored) {
            this.draw(tile, context, indexX * this._tileWidth, indexY * this._tileHeight, mirrored);
        }
    }, {
        key: 'drawTileAnim',
        value: function drawTileAnim(tile, context, indexX, indexY, progress, mirrored) {
            var animation = this._animations.get(tile);
            if (animation) {
                tile = animation(progress);
            } else {
                logger.logWarn('No animation set for ' + tile);
            }
            this.draw(tile, context, indexX * this._tileWidth, indexY * this._tileHeight, mirrored);
        }
    }, {
        key: 'isTileAnim',
        value: function isTileAnim(tile) {
            return this._animations.has(tile);
        }
    }]);
    return SpriteSheet;
}();

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BePhysicsTrait = undefined;

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Trait2 = __webpack_require__(14);

var _Entity = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BePhysicsTrait = exports.BePhysicsTrait = function (_Trait) {
    (0, _inherits3.default)(BePhysicsTrait, _Trait);

    function BePhysicsTrait() {
        var gravity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1500;
        (0, _classCallCheck3.default)(this, BePhysicsTrait);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BePhysicsTrait.__proto__ || (0, _getPrototypeOf2.default)(BePhysicsTrait)).call(this, 'physics'));

        _this._gravity = gravity;
        _this._enabled = true;
        return _this;
    }

    (0, _createClass3.default)(BePhysicsTrait, [{
        key: 'disable',
        value: function disable() {
            this._enabled = false;
        }

        /**
         * @param {Entity} entity
         * @param {Number} rate
         * @param {Level} level  
         */

    }, {
        key: 'update',
        value: function update(entity, rate, level) {
            // NOTE !!! : the x an y positions SHOULD be updated separately
            // before checking for collisions 
            entity.pos.x += entity.vel.x * rate;
            level.getTileCollider().checkX(entity);

            entity.pos.y += entity.vel.y * rate;
            level.getTileCollider().checkY(entity);

            if (this._gravity) {
                // NOTE !!! : applying the gravity SHOULD be after the tile collision check have been made
                entity.vel.y += this._gravity * rate;
            }
        }
    }]);
    return BePhysicsTrait;
}(_Trait2.Trait);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BeSolidTrait = undefined;

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Trait2 = __webpack_require__(14);

var _Entity = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BeSolidTrait = exports.BeSolidTrait = function (_Trait) {
    (0, _inherits3.default)(BeSolidTrait, _Trait);

    function BeSolidTrait() {
        (0, _classCallCheck3.default)(this, BeSolidTrait);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BeSolidTrait.__proto__ || (0, _getPrototypeOf2.default)(BeSolidTrait)).call(this, 'solid', true));

        _this._enabled = true;
        return _this;
    }

    (0, _createClass3.default)(BeSolidTrait, [{
        key: 'disable',
        value: function disable() {
            this._enabled = false;
        }
    }, {
        key: 'obstructed',
        value: function obstructed(entity, obstacle, direction) {
            if (!this._enabled) {
                return;
            }

            switch (direction) {
                case _Entity.Entity.COLLIDE_BOTTOM:
                    entity.bounds.bottom = obstacle.y1;
                    entity.vel.y = 0;
                    break;
                case _Entity.Entity.COLLIDE_TOP:
                    entity.bounds.top = obstacle.y2;
                    entity.vel.y = 0;
                    break;
                case _Entity.Entity.COLLIDE_RIGHT:
                    entity.bounds.right = obstacle.x1;
                    entity.vel.x = 0;
                    break;
                case _Entity.Entity.COLLIDE_LEFT:
                    entity.bounds.left = obstacle.x2;
                    entity.vel.x = 0;
                    break;
            }
        }
    }]);
    return BeSolidTrait;
}(_Trait2.Trait);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BeKillableTrait = undefined;

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Trait2 = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BeKillableTrait = exports.BeKillableTrait = function (_Trait) {
    (0, _inherits3.default)(BeKillableTrait, _Trait);

    /**
     * 
     * @param {Number} deadTimeRemove 2 seconds by default
     */
    function BeKillableTrait() {
        var deadTimeRemove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        (0, _classCallCheck3.default)(this, BeKillableTrait);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BeKillableTrait.__proto__ || (0, _getPrototypeOf2.default)(BeKillableTrait)).call(this, 'killable', true));

        _this._dead = false;
        _this._deadTimeRemove = deadTimeRemove;

        _this._deadTime = 0;
        return _this;
    }

    (0, _createClass3.default)(BeKillableTrait, [{
        key: 'kill',
        value: function kill() {
            var _this2 = this;

            this.queueTask(function () {
                _this2._dead = true;
            });
        }
    }, {
        key: 'revive',
        value: function revive() {
            var _this3 = this;

            this.queueTask(function () {
                _this3._dead = false;
                _this3._deadTime = 0;
            });
        }

        /**
         * @param {Entity} entity
         * @param {Number} rate
         * @param {Level} level  
         */

    }, {
        key: 'update',
        value: function update(entity, rate, level) {
            // keep the entity for a while and then remove it from the level
            if (this._dead) {
                this._deadTime += rate;

                if (this._deadTime >= this._deadTimeRemove) {
                    this.queueTask(function () {
                        level.removeEntity(entity);
                    });
                }
            }
        }
    }, {
        key: 'dead',
        get: function get() {
            return this._dead;
        }
    }]);
    return BeKillableTrait;
}(_Trait2.Trait);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDraw = createDraw;
/**
 * Common utility function that will be used when creating each entity.
 * It creates a 'draw' method that will be attached to each entity.
 * @param {SpriteSheet} sprites 
 * @param {String} defaultTile 
 */
function createDraw(sprites, defaultTile) {

    // the real draw function that will bve attached the entities
    return function draw(context, level) {
        var _animate = this.animate(level),
            tile = _animate.tile,
            mirrored = _animate.mirrored;
        // if no tile to animate then draw the default "idle" one,
        // tileSize is array with [width, height]


        var tileSize = sprites.draw(tile || defaultTile, context, 0, 0, mirrored);

        // TODO: The drawn tile size is not necessary the "real" size of the entity
        // set the size of the entity to the size of the real drawn tile
        // this.size.set(...tileSize);
    };
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(103);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(18)(function () {
  return Object.defineProperty(__webpack_require__(45)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(19);
var toIObject = __webpack_require__(22);
var arrayIndexOf = __webpack_require__(110)(false);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(19);
var toObject = __webpack_require__(29);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(8);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(21);
var ITERATOR = __webpack_require__(4)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(8);
var aFunction = __webpack_require__(25);
var SPECIES = __webpack_require__(4)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var invoke = __webpack_require__(115);
var html = __webpack_require__(73);
var cel = __webpack_require__(45);
var global = __webpack_require__(5);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(27)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var isObject = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(53);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var core = __webpack_require__(2);
var dP = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(10);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(4)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var CONFIG = exports.CONFIG = {
    RATE: 1 / 60,

    VIEW_WIDTH: 256,
    VIEW_HEIGHT: 240,

    DEBUG_MARIO: false,
    DEBUG_TILE_COLLISION: false,
    DEBUG_VIEW_SCROLL: false
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(6).f;
var create = __webpack_require__(34);
var redefineAll = __webpack_require__(54);
var ctx = __webpack_require__(15);
var anInstance = __webpack_require__(51);
var forOf = __webpack_require__(30);
var $iterDefine = __webpack_require__(44);
var step = __webpack_require__(75);
var setSpecies = __webpack_require__(82);
var DESCRIPTORS = __webpack_require__(10);
var fastKey = __webpack_require__(57).fastKey;
var validate = __webpack_require__(58);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var $export = __webpack_require__(3);
var meta = __webpack_require__(57);
var fails = __webpack_require__(18);
var hide = __webpack_require__(16);
var redefineAll = __webpack_require__(54);
var forOf = __webpack_require__(30);
var anInstance = __webpack_require__(51);
var isObject = __webpack_require__(9);
var setToStringTag = __webpack_require__(28);
var dP = __webpack_require__(6).f;
var each = __webpack_require__(127)(0);
var DESCRIPTORS = __webpack_require__(10);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(27);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(38);
var from = __webpack_require__(131);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(3);
var aFunction = __webpack_require__(25);
var ctx = __webpack_require__(15);
var forOf = __webpack_require__(30);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tile = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tile = exports.Tile = function () {
    /**
     * @param {{tile: String, type: String}} tileSpec 
     */
    function Tile(tileSpec) {
        (0, _classCallCheck3.default)(this, Tile);

        this._name = tileSpec.name;
        this._type = tileSpec.type;
    }

    /**
     * @property
     * @returns {String}
     */


    (0, _createClass3.default)(Tile, [{
        key: "name",
        get: function get() {
            return this._name;
        }

        /**
         * @property
         * @returns {String}
         */

    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }]);
    return Tile;
}();

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Level = undefined;

var _toConsumableArray2 = __webpack_require__(93);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = __webpack_require__(144);

var _extends3 = _interopRequireDefault(_extends2);

var _set = __webpack_require__(149);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _LayerManager = __webpack_require__(155);

var _Entity = __webpack_require__(7);

var _TileCollider = __webpack_require__(163);

var _EntityCollider = __webpack_require__(164);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PROPS_DEFAULT = { gravity: 0, time: 300 };

var Level = exports.Level = function () {
    /**
     * 
     * @param {String} name 
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     * @param {{gravity:Number, time:Number, ...}} props 
     */
    function Level(name, tiles, tileSize) {
        var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        (0, _classCallCheck3.default)(this, Level);

        this.NAME = name;
        this._tileCollider = new _TileCollider.TileCollider(tiles, tileSize);
        this._layerManager = new _LayerManager.LayerManager();
        this._entities = new _set2.default();

        this._entityCollider = new _EntityCollider.EntityCollider(this._entities);

        this._props = (0, _extends3.default)({}, PROPS_DEFAULT, props);

        // compute the width and height from the tiles and tileSize
        var maxX = 0,
            maxY = 0;
        tiles.forEach(function (x, y, tile) {
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
            tile._name == 0;
        });
        this._width = maxX * tileSize;
        this._height = maxY * tileSize;

        this._totalTime = 0;
    }

    /**
     * @returns {TileCollider}
     */


    (0, _createClass3.default)(Level, [{
        key: 'getTileCollider',
        value: function getTileCollider() {
            return this._tileCollider;
        }

        /**
         * 
         * @param {(progress: Entity)} callback 
         */

    }, {
        key: 'forEachEntity',
        value: function forEachEntity(callback) {
            this._entities.forEach(function (entity) {
                return callback(entity);
            });
        }

        /**
         * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
         */

    }, {
        key: 'addLayer',
        value: function addLayer(layer) {
            this._layerManager.add(layer);
        }

        /**
         * @param {Entity} entity 
         */

    }, {
        key: 'addEntity',
        value: function addEntity(entity) {
            this._entities.add(entity);
        }

        /**
         * @param {Entity} entity
         * @returns {Boolean} 
         */

    }, {
        key: 'removeEntity',
        value: function removeEntity(entity) {
            return this._entities.delete(entity);
        }

        /**
         * 
         * @param {Entity} entity
         * @returns {Boolean} 
         */

    }, {
        key: 'hasEntity',
        value: function hasEntity(entity) {
            return this._entities.has(entity);
        }
    }, {
        key: 'getMario',
        value: function getMario() {
            return [].concat((0, _toConsumableArray3.default)(this._entities)).find(function (entity) {
                return entity.NAME === 'mario';
            });
        }

        /**
         * 
         * @param {*} name 
         */

    }, {
        key: 'getProp',
        value: function getProp(name) {
            return this._props[name];
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'getTotalTime',
        value: function getTotalTime() {
            return this._totalTime;
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this._width;
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this._height;
        }

        /**
         * @param {Number} rate 
         */

    }, {
        key: 'update',
        value: function update(rate) {
            var _this = this;

            this._entities.forEach(function (entity) {
                entity.update(rate, _this);

                // add some gravity to all entities
                // NOTE !!! : applying the gravity SHOULD be after the tile collision check have been made
                if (_this._props.gravity) {
                    entity.vel.y += _this._props.gravity * rate;
                }
            });

            // check if entities collide with each other
            // NOTE !!! : it SHOULD be after all entities have been passed through the first loop
            this._entities.forEach(function (entity) {
                _this._entityCollider.check(entity);
            });

            // finally execute all queued tasks,
            // in order to avoid updates in from the traits depending on the order they are registered
            this._entities.forEach(function (entity) {
                return entity.finalize();
            });

            this._totalTime += rate;
        }

        /**
         * @param {CanvasRenderingContext2D} context 
         * @param {View} view 
         */

    }, {
        key: 'draw',
        value: function draw(context, view) {
            this._layerManager.draw(context, view);
        }
    }]);
    return Level;
}();

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(94);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(72);
var hiddenKeys = __webpack_require__(50).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(40);
var createDesc = __webpack_require__(26);
var toIObject = __webpack_require__(22);
var toPrimitive = __webpack_require__(46);
var has = __webpack_require__(19);
var IE8_DOM_DEFINE = __webpack_require__(70);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileResolver = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TileResolver = exports.TileResolver = function () {
    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    function TileResolver(tiles, tileSize) {
        (0, _classCallCheck3.default)(this, TileResolver);

        this._tiles = tiles;
        this._tileSize = tileSize;
    }

    /**
     * @returns {Number}
     */


    (0, _createClass3.default)(TileResolver, [{
        key: "getTileSize",
        value: function getTileSize() {
            return this._tileSize;
        }
    }, {
        key: "toIndex",
        value: function toIndex(pos) {
            return Math.floor(pos / this._tileSize);
        }
    }, {
        key: "toIndexRange",
        value: function toIndexRange(pos1, pos2) {
            // this method is axis agnostic
            var posMax = Math.ceil(pos2 / this._tileSize) * this._tileSize;

            var indexRange = [];
            var pos = pos1;
            do {
                indexRange.push(this.toIndex(pos));
                pos += this._tileSize;
            } while (pos < posMax);

            return indexRange;
        }
    }, {
        key: "getByIndex",
        value: function getByIndex(indexX, indexY) {
            var tile = this._tiles.get(indexX, indexY);
            if (tile) {
                var x1 = indexX * this._tileSize;
                var x2 = x1 + this._tileSize;
                var y1 = indexY * this._tileSize;
                var y2 = y1 + this._tileSize;
                return {
                    tile: tile, x1: x1, x2: x2, y1: y1, y2: y2
                };
            }
            return null;
        }
    }, {
        key: "getByPosition",
        value: function getByPosition(posX, posY) {
            return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
        }
    }, {
        key: "getByRange",
        value: function getByRange(posX1, posX2, posY1, posY2) {
            var _this = this;

            var tiles = [];

            this.toIndexRange(posX1, posX2).forEach(function (indexX) {
                _this.toIndexRange(posY1, posY2).forEach(function (indexY) {
                    var tile = _this.getByIndex(indexX, indexY);
                    if (tile) {
                        tiles.push(tile);
                    }
                });
            });

            return tiles;
        }
    }]);
    return TileResolver;
}();

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(174);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(60);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WanderTrait = undefined;

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Trait2 = __webpack_require__(14);

var _Entity = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WanderTrait = exports.WanderTrait = function (_Trait) {
    (0, _inherits3.default)(WanderTrait, _Trait);

    function WanderTrait() {
        var velocity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -30;
        var panicVelocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 90;
        (0, _classCallCheck3.default)(this, WanderTrait);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WanderTrait.__proto__ || (0, _getPrototypeOf2.default)(WanderTrait)).call(this, 'wander'));

        if (velocity === 0) {
            throw new Error('Cannot have wander trait with 0 velocity');
        }

        _this._paused = false;

        _this._velocity = velocity;
        _this._panicVelocity = Math.abs(panicVelocity); // prevent if passed negative number

        // the distance "walked" when in single "walking" phase
        _this._distance = 0;
        return _this;
    }

    /**
    * @returns {Number}
    */


    (0, _createClass3.default)(WanderTrait, [{
        key: 'pause',


        /**
         * @param {Boolean} paused 
         */
        value: function pause() {
            var paused = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this._paused = paused;
        }

        /**
         * @param {Entity} entity
         * @param {Number} rate
         * @param {Level} level  
         */

    }, {
        key: 'update',
        value: function update(entity, rate) {
            if (this._paused) {
                return;
            }

            // update just the 'x' coordinate of the velocity
            entity.vel.x = this._velocity;

            // measure the distance "walked" after the last stop
            this._distance += Math.abs(entity.vel.x) * rate;
        }

        /**
         * @param {Entity} entity 
         * @param {(progress: Number)} animation
         */

    }, {
        key: 'animate',
        value: function animate(entity, animations) {
            var tile = void 0;
            if (this.distance > 0) {
                // use main animation - it for sure exists
                var animation = animations.get(this.NAME);
                tile = animation(entity.lifetime);
            }

            return { tile: tile, mirrored: entity.vel.x < 0 };
        }
    }, {
        key: 'obstructed',
        value: function obstructed(entity, obstacle, direction) {
            switch (direction) {
                case _Entity.Entity.COLLIDE_LEFT:
                case _Entity.Entity.COLLIDE_RIGHT:
                    this._distance = 0;
                    this._velocity = -this._velocity;
                    break;
            }
        }
    }, {
        key: 'velocity',
        get: function get() {
            return this._velocity;
        }

        /**
         * @param {Number} velocity
         */
        ,
        set: function set(velocity) {
            this._velocity = velocity;
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'distance',
        get: function get() {
            return this._distance;
        }
    }]);
    return WanderTrait;
}(_Trait2.Trait);

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Font = undefined;

var _slicedToArray2 = __webpack_require__(31);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(39);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _SpriteSheet = __webpack_require__(64);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Font = exports.Font = function () {

    /**
     * 
     * @param {SpriteSheet} sprites 
     * @param {Number} lineHeight 
     */
    function Font(sprites, lineHeight) {
        (0, _classCallCheck3.default)(this, Font);

        this._sprites = sprites;
        this._lineHeight = lineHeight;
    }

    /**
     * @returns {Number}
     */


    (0, _createClass3.default)(Font, [{
        key: 'print',


        /**
         * 
         * @param {Sting} text 
         * @param {CanvasRenderingContext2D} context 
         * @param {Number} x 
         * @param {Number} y 
         */
        value: function print(text, context, x, y) {
            var offsetX = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(text), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var char = _step.value;

                    var _sprites$draw = this._sprites.draw(char, context, x + offsetX, y),
                        _sprites$draw2 = (0, _slicedToArray3.default)(_sprites$draw, 1),
                        charWidth = _sprites$draw2[0];

                    offsetX += charWidth;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'lineHeight',
        get: function get() {
            return this._lineHeight;
        }
    }]);
    return Font;
}();

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
module.exports = __webpack_require__(196);


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(69);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(105);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(canvas) {
        var context, keyboardManager, entityFactory, loadLevel, level, view, mario, playerEnv, font, timer;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        context = canvas.getContext('2d');

                        context.imageSmoothingEnabled = false;
                        context.mozImageSmoothingEnabled = false;
                        context.webkitImageSmoothingEnabled = false;

                        keyboardManager = new _KeyboardManager.KeyboardManager();
                        _context.next = 7;
                        return (0, _entities.loadEntities)();

                    case 7:
                        entityFactory = _context.sent;
                        loadLevel = (0, _level.createLoadLevel)(entityFactory);
                        _context.next = 11;
                        return loadLevel('1_1');

                    case 11:
                        level = _context.sent;
                        view = new _View.View(_config.CONFIG.VIEW_WIDTH, _config.CONFIG.VIEW_HEIGHT);
                        mario = level.getMario();

                        // setup the keyboard actions for Mario
                        // adn start the keyboard manager

                        (0, _keyboard.setupMarioKeyboard)(mario, keyboardManager);
                        keyboardManager.start(window);

                        // DEBUG: add Mario easy replacement if needed
                        if (_config.CONFIG.DEBUG_MARIO) {
                            (0, _debug.setupMouseControl)(mario, canvas, view);
                        }

                        // DEBUG: add visual collisions if needed
                        if (_config.CONFIG.DEBUG_TILE_COLLISION) {
                            level.addLayer((0, _debug2.createDebugTileCollisionLayer)(level));
                            level.addLayer((0, _debug2.createDebugEntityLayer)(level));
                        }

                        if (_config.CONFIG.DEBUG_VIEW_SCROLL) {
                            level.addLayer((0, _debug2.createDebugViewLayer)(view));
                        }

                        // FIXME: temporary this is here
                        playerEnv = createPlayerEnvironment(mario, level);
                        _context.next = 22;
                        return (0, _font.loadFont)();

                    case 22:
                        font = _context.sent;

                        level.addLayer((0, _dashboard.createDashboardLayer)(font, playerEnv, level));

                        timer = new _Timer.Timer(_config.CONFIG.RATE);

                        timer.update = function (rate) {
                            // update all level entities (including Mario)
                            level.update(rate);

                            // move the camera/view together with Mario
                            // TODO: Don't position Mario always in the center, allow some margin left and right
                            view.pos.x = Math.max(0, mario.pos.x - view.size.x / 2);

                            // draw next frame
                            level.draw(context, view);
                        };

                        timer.start();

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function main(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _config = __webpack_require__(84);

var _View = __webpack_require__(119);

var _Timer = __webpack_require__(123);

var _KeyboardManager = __webpack_require__(124);

var _keyboard = __webpack_require__(134);

var _level = __webpack_require__(135);

var _entities = __webpack_require__(168);

var _debug = __webpack_require__(191);

var _font = __webpack_require__(192);

var _debug2 = __webpack_require__(193);

var _dashboard = __webpack_require__(194);

var _Entity = __webpack_require__(7);

var _BePlayerControl = __webpack_require__(195);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FIXME: temporary this is here
/**
 * 
 * @param {Entity} player 
 * @param {Level} level
 * @returns {Entity}
 */
function createPlayerEnvironment(player, level) {
    // create a fictitious entity
    var playerEnv = new _Entity.Entity();
    playerEnv.draw = function () {};
    playerEnv.registerTrait(new _BePlayerControl.BePlayerControlTrait(player, level.getProp('time')));
    level.addEntity(playerEnv);
    return playerEnv;
}

var canvas = document.getElementById('screen');
main(canvas);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(104);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(24);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(17);
__webpack_require__(23);
__webpack_require__(114);
__webpack_require__(117);
__webpack_require__(118);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(42);
var defined = __webpack_require__(43);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(34);
var descriptor = __webpack_require__(26);
var setToStringTag = __webpack_require__(28);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(16)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(8);
var getKeys = __webpack_require__(35);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(22);
var toLength = __webpack_require__(36);
var toAbsoluteIndex = __webpack_require__(111);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(42);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(113);
var step = __webpack_require__(75);
var Iterators = __webpack_require__(21);
var toIObject = __webpack_require__(22);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(44)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var global = __webpack_require__(5);
var ctx = __webpack_require__(15);
var classof = __webpack_require__(38);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(9);
var aFunction = __webpack_require__(25);
var anInstance = __webpack_require__(51);
var forOf = __webpack_require__(30);
var speciesConstructor = __webpack_require__(78);
var task = __webpack_require__(79).set;
var microtask = __webpack_require__(116)();
var newPromiseCapabilityModule = __webpack_require__(53);
var perform = __webpack_require__(80);
var promiseResolve = __webpack_require__(81);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(4)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(54)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(28)($Promise, PROMISE);
__webpack_require__(82)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(83)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 115 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var macrotask = __webpack_require__(79).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(27)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(2);
var global = __webpack_require__(5);
var speciesConstructor = __webpack_require__(78);
var promiseResolve = __webpack_require__(81);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(53);
var perform = __webpack_require__(80);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.View = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _math = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = exports.View = function () {
    function View(width, height) {
        (0, _classCallCheck3.default)(this, View);

        this._pos = new _math.Vector(0, 0);
        this._size = new _math.Vector(width, height);
    }

    /**
     * @returns {Vector}
     */


    (0, _createClass3.default)(View, [{
        key: 'pos',
        get: function get() {
            return this._pos;
        }

        /**
         * @returns {Vector}
         */

    }, {
        key: 'size',
        get: function get() {
            return this._size;
        }
    }]);
    return View;
}();

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Timer = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timer = exports.Timer = function () {
    function Timer() {
        var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1 / 60;
        (0, _classCallCheck3.default)(this, Timer);

        this._rate = rate;
        this._lastTime = 0;
        this._accumulatedTime = 0;
    }

    (0, _createClass3.default)(Timer, [{
        key: "_updateProxy",
        value: function _updateProxy(time) {
            this._accumulatedTime += (time - this._lastTime) / 1000;

            // temporary fix for not updating so often
            if (this._accumulatedTime > 1) {
                this._accumulatedTime = 1;
            }

            while (this._accumulatedTime > this._rate) {
                this._accumulatedTime -= this._rate;

                this.update(this._rate);
            }
            this._lastTime = time;

            this._enqueue();
        }
    }, {
        key: "_enqueue",
        value: function _enqueue() {
            requestAnimationFrame(this._updateProxy.bind(this));
        }

        // eslint-disable-next-line no-unused-vars

    }, {
        key: "update",
        value: function update(rate) {
            // users should overwrite it
            throw new Error("Users should attach a real update method");
        }
    }, {
        key: "start",
        value: function start() {
            this._enqueue();
        }
    }]);
    return Timer;
}();

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyboardManager = exports.KEY_STATE_PRESSED = exports.KEY_STATE_RELEASED = undefined;

var _map = __webpack_require__(56);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _logger = __webpack_require__(20);

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY_STATE_RELEASED = exports.KEY_STATE_RELEASED = 0;
var KEY_STATE_PRESSED = exports.KEY_STATE_PRESSED = 1;

var KeyboardManager = exports.KeyboardManager = function () {
    function KeyboardManager() {
        (0, _classCallCheck3.default)(this, KeyboardManager);

        // keyCode to registered callback
        this._keyMap = new _map2.default();

        // down-up state for a key
        this._keyState = new _map2.default();

        this._started = false;
    }

    (0, _createClass3.default)(KeyboardManager, [{
        key: "start",
        value: function start(window) {
            var _this = this;

            if (this._started) {
                logger.logWarn("KeyboardManager is already started");
                return;
            }

            logger.logDbg("KeyboardManager is started");

            ['keydown', 'keyup'].forEach(function (eventName) {
                window.addEventListener(eventName, function (event) {
                    _this._handleEvent(event);
                });
            });
        }
    }, {
        key: "register",
        value: function register(key, callback) {
            this._keyMap.set(key, callback);
            // this._keyState.set(key, KEY_STATE_RELEASED);
        }
    }, {
        key: "_handleEvent",
        value: function _handleEvent(event) {
            var key = event.keyCode;

            var callback = this._keyMap.get(key);
            if (!callback) {
                // not interested in this key
                return;
            }

            // no browser's default action on any registered keys
            event.preventDefault();

            var newState = event.type === "keydown" ? KEY_STATE_PRESSED : KEY_STATE_RELEASED;
            if (this._keyState.get(key) !== newState) {
                callback(newState);
                this._keyState.set(key, newState);
            }
        }
    }]);
    return KeyboardManager;
}();

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(17);
__webpack_require__(23);
__webpack_require__(126);
__webpack_require__(130);
__webpack_require__(132);
__webpack_require__(133);
module.exports = __webpack_require__(2).Map;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(85);
var validate = __webpack_require__(58);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(86)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(15);
var IObject = __webpack_require__(47);
var toObject = __webpack_require__(29);
var toLength = __webpack_require__(36);
var asc = __webpack_require__(128);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(129);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var isArray = __webpack_require__(87);
var SPECIES = __webpack_require__(4)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(3);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(88)('Map') });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(30);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(89)('Map');


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(90)('Map');


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupMarioKeyboard = setupMarioKeyboard;
// constants for the keyboard control - these are keyCode 
var KEY_LEFT = 65; // A
var KEY_RIGHT = 68; // D
var KEY_TURBO = 79; // O
var KEY_JUMP = 80; // P

/**
 * 
 * @param {Entity} mario 
 * @param {KeyboardManager} keyboardManager 
 */
function setupMarioKeyboard(mario, keyboardManager) {
    keyboardManager.register(KEY_JUMP, function (keyState) {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    keyboardManager.register(KEY_LEFT, function (keyState) {
        mario.walk.left(!!keyState);
    });
    keyboardManager.register(KEY_RIGHT, function (keyState) {
        mario.walk.right(!!keyState);
    });
    keyboardManager.register(KEY_TURBO, function (keyState) {
        mario.walk.turbo(!!keyState);
    });
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(24);

var _promise2 = _interopRequireDefault(_promise);

var _getIterator2 = __webpack_require__(39);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = __webpack_require__(31);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = __webpack_require__(69);

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.createLoadLevel = createLoadLevel;

var _logger = __webpack_require__(20);

var logger = _interopRequireWildcard(_logger);

var _Tile = __webpack_require__(91);

var _Level = __webpack_require__(92);

var _math = __webpack_require__(55);

var _background = __webpack_require__(165);

var _entities = __webpack_require__(166);

var _utils = __webpack_require__(63);

var _sprites = __webpack_require__(41);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(expandSpan),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(expandRanges),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(expandTiles);

function expandSpan(xStart, xLen, yStart, yLen) {
    var xEnd, yEnd, x, y;
    return _regenerator2.default.wrap(function expandSpan$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    xEnd = xStart + xLen;
                    yEnd = yStart + yLen;
                    x = xStart;

                case 3:
                    if (!(x < xEnd)) {
                        _context.next = 14;
                        break;
                    }

                    y = yStart;

                case 5:
                    if (!(y < yEnd)) {
                        _context.next = 11;
                        break;
                    }

                    _context.next = 8;
                    return { x: x, y: y };

                case 8:
                    ++y;
                    _context.next = 5;
                    break;

                case 11:
                    ++x;
                    _context.next = 3;
                    break;

                case 14:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function expandRange(range) {
    if (range.length === 4) {
        var _range = (0, _slicedToArray3.default)(range, 4),
            xStart = _range[0],
            xLen = _range[1],
            yStart = _range[2],
            yLen = _range[3];

        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 3) {
        var _range2 = (0, _slicedToArray3.default)(range, 3),
            _xStart = _range2[0],
            _xLen = _range2[1],
            _yStart = _range2[2];

        return expandSpan(_xStart, _xLen, _yStart, 1);
    } else if (range.length === 2) {
        var _range3 = (0, _slicedToArray3.default)(range, 2),
            _xStart2 = _range3[0],
            _yStart2 = _range3[1];

        return expandSpan(_xStart2, 1, _yStart2, 1);
    }
    throw new Error('Unsupported range params length ' + range.length);
}

function expandRanges(ranges) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, range;

    return _regenerator2.default.wrap(function expandRanges$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    // for (const range of ranges) {
                    //     for (const item of expandRange(range)) {
                    //         yield item;
                    //     }
                    // }

                    // this is the same but with Yield Delegation construct
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context2.prev = 3;
                    _iterator = (0, _getIterator3.default)(ranges);

                case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context2.next = 11;
                        break;
                    }

                    range = _step.value;
                    return _context2.delegateYield(expandRange(range), 't0', 8);

                case 8:
                    _iteratorNormalCompletion = true;
                    _context2.next = 5;
                    break;

                case 11:
                    _context2.next = 17;
                    break;

                case 13:
                    _context2.prev = 13;
                    _context2.t1 = _context2['catch'](3);
                    _didIteratorError = true;
                    _iteratorError = _context2.t1;

                case 17:
                    _context2.prev = 17;
                    _context2.prev = 18;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 20:
                    _context2.prev = 20;

                    if (!_didIteratorError) {
                        _context2.next = 23;
                        break;
                    }

                    throw _iteratorError;

                case 23:
                    return _context2.finish(20);

                case 24:
                    return _context2.finish(17);

                case 25:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this, [[3, 13, 17, 25], [18,, 20, 24]]);
}

function expandTiles(tiles, patterns) {
    var _marked3, walkTiles;

    return _regenerator2.default.wrap(function expandTiles$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    walkTiles = function walkTiles(tiles, offsetX, offsetY) {
                        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, tile, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _ref2, x, y, realX, realY, patternName, patternSpec;

                        return _regenerator2.default.wrap(function walkTiles$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        _iteratorNormalCompletion2 = true;
                                        _didIteratorError2 = false;
                                        _iteratorError2 = undefined;
                                        _context3.prev = 3;
                                        _iterator2 = (0, _getIterator3.default)(tiles);

                                    case 5:
                                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                            _context3.next = 49;
                                            break;
                                        }

                                        tile = _step2.value;
                                        _iteratorNormalCompletion3 = true;
                                        _didIteratorError3 = false;
                                        _iteratorError3 = undefined;
                                        _context3.prev = 10;
                                        _iterator3 = (0, _getIterator3.default)(expandRanges(tile.ranges));

                                    case 12:
                                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                            _context3.next = 32;
                                            break;
                                        }

                                        _ref2 = _step3.value;
                                        x = _ref2.x, y = _ref2.y;

                                        // take in mind the 'offset'
                                        realX = x + offsetX;
                                        realY = y + offsetY;

                                        // check if want to draw a pattern (a block of predefined tiles)
                                        // e.g. like "little" backgrounds over the main

                                        patternName = tile.pattern;

                                        if (!patternName) {
                                            _context3.next = 27;
                                            break;
                                        }

                                        patternSpec = patterns[patternName];

                                        if (!patternSpec) {
                                            _context3.next = 24;
                                            break;
                                        }

                                        return _context3.delegateYield(walkTiles(patternSpec.tiles, realX, realY), 't0', 22);

                                    case 22:
                                        _context3.next = 25;
                                        break;

                                    case 24:
                                        logger.logWarn('No pattern defined with name ' + patternName);

                                    case 25:
                                        _context3.next = 29;
                                        break;

                                    case 27:
                                        _context3.next = 29;
                                        return {
                                            x: realX, y: realY, tile: new _Tile.Tile(tile)
                                        };

                                    case 29:
                                        _iteratorNormalCompletion3 = true;
                                        _context3.next = 12;
                                        break;

                                    case 32:
                                        _context3.next = 38;
                                        break;

                                    case 34:
                                        _context3.prev = 34;
                                        _context3.t1 = _context3['catch'](10);
                                        _didIteratorError3 = true;
                                        _iteratorError3 = _context3.t1;

                                    case 38:
                                        _context3.prev = 38;
                                        _context3.prev = 39;

                                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                            _iterator3.return();
                                        }

                                    case 41:
                                        _context3.prev = 41;

                                        if (!_didIteratorError3) {
                                            _context3.next = 44;
                                            break;
                                        }

                                        throw _iteratorError3;

                                    case 44:
                                        return _context3.finish(41);

                                    case 45:
                                        return _context3.finish(38);

                                    case 46:
                                        _iteratorNormalCompletion2 = true;
                                        _context3.next = 5;
                                        break;

                                    case 49:
                                        _context3.next = 55;
                                        break;

                                    case 51:
                                        _context3.prev = 51;
                                        _context3.t2 = _context3['catch'](3);
                                        _didIteratorError2 = true;
                                        _iteratorError2 = _context3.t2;

                                    case 55:
                                        _context3.prev = 55;
                                        _context3.prev = 56;

                                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                            _iterator2.return();
                                        }

                                    case 58:
                                        _context3.prev = 58;

                                        if (!_didIteratorError2) {
                                            _context3.next = 61;
                                            break;
                                        }

                                        throw _iteratorError2;

                                    case 61:
                                        return _context3.finish(58);

                                    case 62:
                                        return _context3.finish(55);

                                    case 63:
                                    case 'end':
                                        return _context3.stop();
                                }
                            }
                        }, _marked3, this, [[3, 51, 55, 63], [10, 34, 38, 46], [39,, 41, 45], [56,, 58, 62]]);
                    };

                    _marked3 = /*#__PURE__*/_regenerator2.default.mark(walkTiles);
                    return _context4.delegateYield(walkTiles(tiles, 0, 0), 't0', 3);

                case 3:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked4, this);
}

function createGrid(tiles, patterns) {
    var grid = new _math.Matrix();
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = (0, _getIterator3.default)(expandTiles(tiles, patterns)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _ref4 = _step4.value;
            var _x = _ref4.x,
                _y = _ref4.y,
                tile = _ref4.tile;

            grid.set(_x, _y, tile);
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return grid;
}

// in order to get the 'entityFactory' from main.js will wrap 'loadLevel' in
// another function that creates it
function createLoadLevel(entityFactory) {
    // now this entityFactory has multiple factory functions can be called multiple times
    // e.g. : entityFactory = {mario, goomba, koopa, ... }


    /**
     * @param {String} name 
     * @returns {Promise<Level>}
     */
    function loadLevel(name) {
        return (0, _utils.loadDataLevel)(name).then(function (levelSpec) {
            return _promise2.default.all([levelSpec, (0, _sprites.loadSprites)(levelSpec.sprites)]);
        }).then(function (_ref5) {
            var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                levelSpec = _ref6[0],
                backgroundSprites = _ref6[1];

            // parse the level's background tiles, entities and other props
            var layers = levelSpec.layers,
                patterns = levelSpec.patterns,
                entities = levelSpec.entities,
                props = levelSpec.props;

            // TODO: tileSize should be get from the backgroundSprites.getWidth()/getHeight()

            var tileSize = 16;

            // create the main collision grid
            var mergedTiles = layers.reduce(function (mergedTiles, layerSpec) {
                return mergedTiles.concat(layerSpec.tiles);
            }, []);
            var grid = createGrid(mergedTiles, patterns);

            // create the level
            var level = new _Level.Level(name, grid, tileSize, props);

            // create all background layers - the drawing ones
            layers.forEach(function (layerSpec) {
                var tiles = createGrid(layerSpec.tiles, patterns);
                level.addLayer((0, _background.createBackgroundLayer)(level, tiles, tileSize, backgroundSprites));
            });

            // attach entities to the Level
            // Note that Mario will be additionally attached in 'main.js'
            entities.forEach(function (entitySpec) {
                var name = entitySpec.name,
                    _entitySpec$pos = (0, _slicedToArray3.default)(entitySpec.pos, 2),
                    x = _entitySpec$pos[0],
                    y = _entitySpec$pos[1];

                var createEntity = entityFactory[name];
                var entity = createEntity();
                level.addEntity(entity);
                entity.pos.set(x, y);
            });

            // create and add the entity layer
            level.addLayer((0, _entities.createEntitiesLayer)(level));

            return level;
        });
    }
    return loadLevel;
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(17);
module.exports = __webpack_require__(137);


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(8);
var get = __webpack_require__(52);
module.exports = __webpack_require__(2).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(17);
module.exports = __webpack_require__(140);


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(38);
var ITERATOR = __webpack_require__(4)('iterator');
var Iterators = __webpack_require__(21);
module.exports = __webpack_require__(2).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
__webpack_require__(142);
module.exports = __webpack_require__(2).Array.from;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(15);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(29);
var call = __webpack_require__(76);
var isArrayIter = __webpack_require__(77);
var toLength = __webpack_require__(36);
var createProperty = __webpack_require__(143);
var getIterFn = __webpack_require__(52);

$export($export.S + $export.F * !__webpack_require__(83)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(6);
var createDesc = __webpack_require__(26);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(145);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(147);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(148) });


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(40);
var toObject = __webpack_require__(29);
var IObject = __webpack_require__(47);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(18)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(150), __esModule: true };

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(17);
__webpack_require__(23);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
module.exports = __webpack_require__(2).Set;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(85);
var validate = __webpack_require__(58);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(86)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(3);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(88)('Set') });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(89)('Set');


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(90)('Set');


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LayerManager = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayerManager = exports.LayerManager = function () {
    function LayerManager() {
        (0, _classCallCheck3.default)(this, LayerManager);

        this._layers = [];
    }

    /**
     * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
     */


    (0, _createClass3.default)(LayerManager, [{
        key: "add",
        value: function add(layer) {
            this._layers.push(layer);
        }

        /**
         * @param {CanvasRenderingContext2D} context 
         * @param {View} view 
         */

    }, {
        key: "draw",
        value: function draw(context, view) {
            this._layers.forEach(function (layer) {
                return layer(context, view);
            });
        }
    }]);
    return LayerManager;
}();

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(157);
__webpack_require__(32);
__webpack_require__(160);
__webpack_require__(161);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(5);
var has = __webpack_require__(19);
var DESCRIPTORS = __webpack_require__(10);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(71);
var META = __webpack_require__(57).KEY;
var $fails = __webpack_require__(18);
var shared = __webpack_require__(49);
var setToStringTag = __webpack_require__(28);
var uid = __webpack_require__(37);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(61);
var wksDefine = __webpack_require__(62);
var enumKeys = __webpack_require__(158);
var isArray = __webpack_require__(87);
var anObject = __webpack_require__(8);
var toIObject = __webpack_require__(22);
var toPrimitive = __webpack_require__(46);
var createDesc = __webpack_require__(26);
var _create = __webpack_require__(34);
var gOPNExt = __webpack_require__(159);
var $GOPD = __webpack_require__(96);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(35);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(95).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(40).f = $propertyIsEnumerable;
  __webpack_require__(59).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(33)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(40);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(22);
var gOPN = __webpack_require__(95).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62)('asyncIterator');


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62)('observable');


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Bounds = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bounds = exports.Bounds = function () {
    /**
     * 
     * @param {Vector} pos 
     * @param {Vector} size 
     * @param {Vector} offset 
     */
    function Bounds(pos, size, offset) {
        (0, _classCallCheck3.default)(this, Bounds);

        this.pos = pos;
        this.size = size;
        this.offset = offset;
    }

    (0, _createClass3.default)(Bounds, [{
        key: "overlaps",
        value: function overlaps(otherBounds) {
            return this.bottom > otherBounds.top && this.top < otherBounds.bottom && this.right > otherBounds.left && this.left < otherBounds.right;
        }
    }, {
        key: "bottom",
        get: function get() {
            return this.pos.y + this.size.y + this.offset.y;
        },
        set: function set(y) {
            this.pos.y = y - (this.size.y + this.offset.y);
        }
    }, {
        key: "top",
        get: function get() {
            return this.pos.y + this.offset.y;
        },
        set: function set(y) {
            this.pos.y = y - this.offset.y;
        }
    }, {
        key: "left",
        get: function get() {
            return this.pos.x + this.offset.x;
        },
        set: function set(x) {
            this.pos.x = x - this.offset.x;
        }
    }, {
        key: "right",
        get: function get() {
            return this.pos.x + this.size.x + this.offset.x;
        },
        set: function set(x) {
            this.pos.x = x - (this.size.x + this.offset.x);
        }
    }]);
    return Bounds;
}();

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileCollider = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Entity = __webpack_require__(7);

var _TileResolver = __webpack_require__(97);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TileCollider = exports.TileCollider = function () {
    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    function TileCollider(tiles, tileSize) {
        (0, _classCallCheck3.default)(this, TileCollider);

        this._tiles = new _TileResolver.TileResolver(tiles, tileSize);
    }

    /**
     * @returns {TileResolver}
     */


    (0, _createClass3.default)(TileCollider, [{
        key: 'getTileResolver',
        value: function getTileResolver() {
            return this._tiles;
        }

        /**
         * @param {Entity} entity 
         */

    }, {
        key: 'checkX',
        value: function checkX(entity) {
            // this will optimise to search for collisions only on the borders of the entity
            // not also inside it as we don't need them
            var posX = void 0;
            if (entity.vel.x === 0) {
                // we are not moving at all - don't do any checks
                return;
            } else if (entity.vel.x > 0) {
                // moving forward/right
                posX = entity.bounds.right;
            } else {
                // moving backwards/left
                posX = entity.bounds.left;
            }

            var matches = this._tiles.getByRange(posX, posX, entity.bounds.top, entity.bounds.bottom);

            matches.forEach(function (match) {
                // check if collided with a ground
                if (match.tile.type !== 'ground') {
                    return;
                }

                // check if the entity is going right
                if (entity.vel.x > 0) {
                    if (entity.bounds.right > match.x1) {
                        entity.obstructedBy(match, _Entity.Entity.COLLIDE_RIGHT);
                    }
                }
                // else if going left
                else if (entity.vel.x < 0) {
                        if (entity.bounds.left < match.x2) {
                            entity.obstructedBy(match, _Entity.Entity.COLLIDE_LEFT);
                        }
                    }
            });
        }

        /**
         * @param {Entity} entity 
         */

    }, {
        key: 'checkY',
        value: function checkY(entity) {
            var posY = void 0;
            if (entity.vel.y === 0) {
                // we are not moving at all - don't do any checks
                return;
            } else if (entity.vel.y > 0) {
                // moving down
                posY = entity.bounds.bottom;
            } else {
                // moving up
                posY = entity.bounds.top;
            }

            var matches = this._tiles.getByRange(entity.bounds.left, entity.bounds.right, posY, posY);

            matches.forEach(function (match) {
                // check if collided with a ground
                if (match.tile.type !== 'ground') {
                    return;
                }

                // check if the entity is going down (falling)
                if (entity.vel.y > 0) {
                    if (entity.bounds.bottom > match.y1) {
                        entity.obstructedBy(match, _Entity.Entity.COLLIDE_BOTTOM);
                    }
                }
                // else if going up (jumping)
                else if (entity.vel.y < 0) {
                        if (entity.bounds.top < match.y2) {
                            entity.obstructedBy(match, _Entity.Entity.COLLIDE_TOP);
                        }
                    }
            });
        }
    }]);
    return TileCollider;
}();

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EntityCollider = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Entity = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntityCollider = exports.EntityCollider = function () {
    /**
     * 
     * @param {Set<Entity>} entities 
     */
    function EntityCollider(entities) {
        (0, _classCallCheck3.default)(this, EntityCollider);

        this._entities = entities;
    }

    /**
     * 
     * @param {Entity} entity 
     */


    (0, _createClass3.default)(EntityCollider, [{
        key: 'check',
        value: function check(entity) {
            this._entities.forEach(function (candidate) {
                // skip the same entity
                if (candidate === entity) {
                    return;
                }

                if (entity.bounds.overlaps(candidate.bounds)) {
                    // notify both entities for the collision between them
                    entity.collidedWith(candidate);
                    candidate.collidedWith(entity);
                }
            });
        }
    }]);
    return EntityCollider;
}();

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.___createBackgroundLayer = ___createBackgroundLayer;
exports.__createBackgroundLayer = __createBackgroundLayer;
exports._createBackgroundLayer = _createBackgroundLayer;
exports.createBackgroundLayer = createBackgroundLayer;

var _logger = __webpack_require__(20);

var logger = _interopRequireWildcard(_logger);

var _config = __webpack_require__(84);

var _TileResolver = __webpack_require__(97);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Note - this will redraw the whole level every time
 * @param {Level} level 
 * @param {Matrix} tiles 
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function ___createBackgroundLayer(level, tiles, tileSize, sprites) {
    // create a static/cached background image buffer from the level's tiles
    var buffer = document.createElement('canvas');
    buffer.width = level.getWidth();
    buffer.height = level.getHeight();
    var imageContext = buffer.getContext('2d');

    tiles.forEach(function (x, y, tile) {
        sprites.drawTile(tile.name, imageContext, x, y);
    });

    return function (context, view) {
        logger.logDbg("Background layer");
        context.drawImage(buffer, -view.pos.x, -view.pos.y);
    };
}

/**
 * OPTIMIZATION - this will draw NEW columns only when only on demand (when needed while scrolling)
 * Note - old already drawn columns are already buffered
 * Note - with this case we still have a very huge buffer (as we've set the whole level's size) 
 * in memory.
 * @param {Level} level
 * @param {Matrix} tiles 
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function __createBackgroundLayer(level, tiles, tileSize, sprites) {
    var tileResolver = new _TileResolver.TileResolver(tiles, tileSize);

    // create a static/cached background image buffer from the level's tiles
    var buffer = document.createElement('canvas');
    buffer.width = level.getWidth();
    buffer.height = level.getHeight();
    var bufferContext = buffer.getContext('2d');

    function redraw(indexStart, indexEnd) {
        for (var x = indexStart; x <= indexEnd; x++) {
            tiles.forEachInColumn(x, function (x, y, tile) {
                sprites.drawTile(tile.name, bufferContext, x, y);
            });
        }
    }

    var drawnIndexEnd = 0;
    return function (context, view) {
        logger.logDbg("Background layer");

        // redraw just the needed view
        var drawWidth = tileResolver.toIndex(view.size.x);
        var drawIndexStart = tileResolver.toIndex(view.pos.x);
        var drawIndexEnd = drawIndexStart + drawWidth;
        if (drawnIndexEnd < drawIndexEnd) {
            drawnIndexEnd = drawIndexEnd;
            logger.logDbg("Background layer - draw news column up to ", drawnIndexEnd);
            redraw(drawIndexStart, drawIndexEnd);
        }

        context.drawImage(buffer, -view.pos.x, -view.pos.y);
    };
}

/**
 * OPTIMIZATION - keep a small buffer in memory - just as needed to draw the view
 * so a little wider than view's size
 * ALso - we can redraw ONLY when there's a change in view's position
 * @param {Level} level 
 * @param {Matrix} tiles
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function _createBackgroundLayer(level, tiles, tileSize, sprites) {
    var tileResolver = new _TileResolver.TileResolver(tiles, tileSize);

    // create a static/cached background image buffer from the level's tiles
    var buffer = document.createElement('canvas');
    buffer.width = _config.CONFIG.VIEW_WIDTH + tileSize;
    buffer.height = _config.CONFIG.VIEW_HEIGHT;
    var bufferContext = buffer.getContext('2d');

    function redraw(indexStart, indexEnd) {
        var hasTileAnimations = false;
        for (var x = indexStart; x <= indexEnd; x++) {
            tiles.forEachInColumn(x, function (x, y, tile) {
                var tileName = tile.name;
                if (sprites.isTileAnim(tileName)) {
                    // animate the tile
                    sprites.drawTileAnim(tileName, bufferContext, x - indexStart, y, level.getTotalTime());
                    hasTileAnimations = true;
                } else {
                    // normal tie tile draw
                    sprites.drawTile(tileName, bufferContext, x - indexStart, y);
                }
            });
        }
        return hasTileAnimations;
    }

    var lastIndexStart = void 0,
        lastIndexEnd = void 0,
        hasTileAnimations = void 0;

    return function (context, view) {
        logger.logDbg("Background layer");

        // redraw just the needed view an ONLY when needed
        var drawWidth = tileResolver.toIndex(view.size.x);
        var drawIndexStart = tileResolver.toIndex(view.pos.x);
        var drawIndexEnd = drawIndexStart + drawWidth;

        // redraw if there are animations or view's positions has changed
        if (hasTileAnimations || lastIndexStart !== drawIndexStart && lastIndexEnd !== drawIndexEnd) {
            logger.logDbg("Background layer redrawing");
            hasTileAnimations = redraw(drawIndexStart, drawIndexEnd);
            lastIndexStart = drawIndexStart;
            lastIndexEnd = drawIndexEnd;
        }

        context.drawImage(buffer, -view.pos.x % tileSize, -view.pos.y);
    };
}

/**
 * OPTIMIZATION - keep a small buffer in memory - just as needed to draw the view
 * so a little wider than view's size
 * ALso - we can redraw ONLY when there's a change in view's position
 * @param {Level} level 
 * @param {Matrix} tiles
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function createBackgroundLayer(level, tiles, tileSize, sprites) {
    var tileResolver = new _TileResolver.TileResolver(tiles, tileSize);

    // create a static/cached background image buffer from the level's tiles
    var buffer = document.createElement('canvas');
    buffer.width = _config.CONFIG.VIEW_WIDTH + tileSize;
    buffer.height = _config.CONFIG.VIEW_HEIGHT;
    var bufferContext = buffer.getContext('2d');

    function redraw(indexStart, indexEnd) {
        bufferContext.clearRect(0, 0, buffer.width, buffer.height);
        for (var x = indexStart; x <= indexEnd; x++) {
            tiles.forEachInColumn(x, function (x, y, tile) {
                var tileName = tile.name;
                if (sprites.isTileAnim(tileName)) {
                    // animate the tile
                    sprites.drawTileAnim(tileName, bufferContext, x - indexStart, y, level.getTotalTime());
                } else {
                    // normal tie tile draw
                    sprites.drawTile(tileName, bufferContext, x - indexStart, y);
                }
            });
        }
    }

    return function (context, view) {
        logger.logDbg("Background layer");

        // redraw just the needed view an ONLY when needed
        var drawWidth = tileResolver.toIndex(view.size.x);
        var drawIndexStart = tileResolver.toIndex(view.pos.x);
        var drawIndexEnd = drawIndexStart + drawWidth;

        logger.logDbg("Background layer redrawing");
        redraw(drawIndexStart, drawIndexEnd);

        context.drawImage(buffer, -view.pos.x % tileSize, -view.pos.y);
    };
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEntitiesLayer = createEntitiesLayer;

var _logger = __webpack_require__(20);

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param {Level} level 
 * @param {Number} maxEntityWidth 
 * @param {Number} maxEntityHeight
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function createEntitiesLayer(level) {
    var maxEntityWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 64;
    var maxEntityHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 64;

    // create a middle image buffer in which each entity will be drawn first
    var buffer = document.createElement('canvas');
    buffer.width = maxEntityWidth;
    buffer.height = maxEntityHeight;
    var bufferContext = buffer.getContext('2d');

    return function (context, view) {
        logger.logDbg("Entities layer");

        var _view$pos = view.pos,
            x = _view$pos.x,
            y = _view$pos.y;

        level.forEachEntity(function (entity) {
            // draw the entity tile in the buffer image after it's been cleared
            bufferContext.clearRect(0, 0, maxEntityWidth, maxEntityHeight);
            entity.draw(bufferContext, level);

            // draw the buffer image in the main canvas
            context.drawImage(buffer, entity.pos.x - x, entity.pos.y - y);
        });
    };
}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAnimation = createAnimation;
function createAnimation(frames) {
    var frameRate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

    // the frameRate is used to reduce the 'progress' if needed as otherwise the frames
    // will be changing too fast

    if (frames instanceof Array) {
        // progress - this has varios meangings depending on the context
        // it could be distance when walking
        // or simple time (seconds)
        return function (progress) {
            var frameIndex = Math.floor(progress / frameRate) % frames.length;
            return frames[frameIndex];
        };
    }

    // if just a single frame specified then return a "fixed" function
    return function () {
        return frames;
    };
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(24);

var _promise2 = _interopRequireDefault(_promise);

exports.loadEntities = loadEntities;

var _Mario = __webpack_require__(169);

var _Goomba = __webpack_require__(185);

var _Koopa = __webpack_require__(186);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadEntities() {

    // the aim is to have mfactory methods like:
    // entityFactory.mario()
    // entityFactory.goomba()
    // entityFactory.koopa()

    // I. simple version relying on the fact that each 'loadXXX' 
    // that resolves to a factory function that is named
    // specifically like this: "mari/goomba/koopa/...."
    var entityFactory = {};
    return _promise2.default.all([(0, _Mario.loadMario)(), (0, _Goomba.loadGoomba)(), (0, _Koopa.loadKoopa)()]).then(function (factories) {
        factories.forEach(function (factory) {
            return entityFactory[factory.name] = factory;
        });

        return entityFactory;
    });

    // II. a different solution - specifically name the factories
    // const entityFactory = {};
    // function addAs(name) {
    //     return factory => entityFactory[name] = factory;
    // }
    // return Promise.all([
    //     loadMario().then(addAs('mario')),
    //     loadGoomba().then(addAs('goomba')),
    //     loadKoopa().then(addAs('koopa'))]).
    //     then(() => entityFactory);
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMario = loadMario;

var _Entity = __webpack_require__(7);

var _Walk = __webpack_require__(170);

var _Jump = __webpack_require__(183);

var _BePhysics = __webpack_require__(65);

var _BeSolid = __webpack_require__(66);

var _BeStomper = __webpack_require__(184);

var _BeKillable = __webpack_require__(67);

var _sprites = __webpack_require__(41);

var _utils = __webpack_require__(68);

// loadMario() will be async
function loadMario() {
    return (0, _sprites.loadSprites)('mario', true).then(createMarioFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createMarioFactory(sprites) {
    // moved all the support/stateless functionality out of the createMario scope
    // as they are needed to be created only ones 

    // create the draw method - common/static/stateless for all Goomba entities
    var draw = (0, _utils.createDraw)(sprites, 'idle');

    // createMario() will be synchronous
    return function mario() {
        var entity = new _Entity.Entity('mario');
        entity.size.set(14, 16);

        entity.registerTrait(new _BePhysics.BePhysicsTrait());
        entity.registerTrait(new _BeSolid.BeSolidTrait());
        entity.registerTrait(new _BeStomper.BeStomperTrait());
        entity.registerTrait(new _BeKillable.BeKillableTrait(0));
        entity.registerTrait(new _Walk.WalkTrait());
        entity.registerTrait(new _Jump.JumpTrait());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WalkTrait = undefined;

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Trait2 = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DRAG_FACTOR_NORMAL = 1 / 1000;
var DRAG_FACTOR_TURBO = 1 / 5000;

var WalkTrait = exports.WalkTrait = function (_Trait) {
    (0, _inherits3.default)(WalkTrait, _Trait);

    function WalkTrait() {
        var accelerate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        (0, _classCallCheck3.default)(this, WalkTrait);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WalkTrait.__proto__ || (0, _getPrototypeOf2.default)(WalkTrait)).call(this, 'walk'));

        _this._accelerate = accelerate;

        _this._direction = 0;

        // used if WalkTrait.IS_ACCELERATING is false
        _this._velocity = 100;

        // used if WalkTrait.IS_ACCELERATING is true
        _this._acceleration = 400;
        _this._deacceleration = 300;
        _this._dragFactor = DRAG_FACTOR_NORMAL;

        // the distance "walked" when in single "walking" phase
        _this._distance = 0;

        // by default let the heading (last direction) be right
        _this._heading = 1;
        return _this;
    }

    /**
     * @returns {Number}
     */


    (0, _createClass3.default)(WalkTrait, [{
        key: 'left',


        /**
         * Starts or stops moving left
         * @param {boolean} startAction 
         */
        value: function left(startAction) {
            this._direction += startAction ? -1 : 1;
        }

        /**
         * Starts or stops moving right
         * @param {boolean} startAction 
         */

    }, {
        key: 'right',
        value: function right(startAction) {
            this._direction += startAction ? 1 : -1;
        }

        /**
         * Starts or stops "turbo" (faster running)
         * @param {boolean} startAction 
         */

    }, {
        key: 'turbo',
        value: function turbo(startAction) {
            this._dragFactor = startAction ? DRAG_FACTOR_TURBO : DRAG_FACTOR_NORMAL;
        }

        /**
         * @param {Entity} entity
         * @param {Number} rate
         * @param {Level} level  
         */

    }, {
        key: 'update',
        value: function update(entity, rate) {
            // update just the 'x' coordinate of the velocity/acceleration
            if (this._accelerate) {
                this._updateAcceleration(entity, rate);
            } else {
                this._updateConstantVelocity(entity, rate);
            }
        }
    }, {
        key: '_updateConstantVelocity',
        value: function _updateConstantVelocity(entity, rate) {
            // this will be with static velocity
            entity.vel.x = this._direction * this._velocity;

            if (this._direction !== 0) {
                // measure the distance "walked" after the last stop
                this._distance += Math.abs(entity.vel.x) * rate;
                // also remember where the entity is heading last
                this._heading = this._direction;
            } else {
                this._distance = 0;
            }
        }
    }, {
        key: '_updateAcceleration',
        value: function _updateAcceleration(entity, rate) {
            if (this._direction !== 0) {
                // this will be with incrementing speed - e.g. accelerating
                entity.vel.x += this._direction * (this._acceleration * rate);

                // also remember where the entity is heading last
                // but don't allow to turn while jumping
                if (!entity.jump || !entity.jump.falling) {
                    // check if there's Jump trait also
                    this._heading = this._direction;
                }
            } else if (entity.vel.x !== 0) {
                // if stopped walking (e.g. this._direction is 0)
                // but it's still moving because of the acceleration
                // then apply some DEacceleration that will stop him completely

                // this will in fact speed up the drag
                var deaccel = Math.min(Math.abs(entity.vel.x), this._deacceleration * rate);
                entity.vel.x -= entity.vel.x > 0 ? deaccel : -deaccel;
            } else {
                this._distance = 0;
            }

            if (entity.vel.x !== 0) {
                // this will add some drag - the higher the velocity the greater the drag
                // it will be always with the opposite sign (+/- ) the velocity, so we'll be always
                // subtracting from the velocity - so real drag

                // note - put the drag 
                // 1. while moving (e.g a slowing little by little and thus applying a max speed)
                // 2. even if stopped walking (e.g. this._direction is 0) - this will allow to "slide" a little as it has some inercia 
                var drag = this._dragFactor * entity.vel.x * Math.abs(entity.vel.x);
                entity.vel.x -= drag;
            }

            // measure the distance "walked" after the last stop
            this._distance += Math.abs(entity.vel.x) * rate;
        }

        /**
         * @param {Entity} entity 
         * @param {(progress: Number)} animation
         * @param {Number} levelTotalTime 
         */

    }, {
        key: 'animate',
        value: function animate(entity, animations, levelTotalTime) {
            var tile = void 0;
            if (this.distance > 0) {
                if (entity.vel.x > 0 && this.direction < 0 || entity.vel.x < 0 && this.direction > 0) {
                    // when "breaking" - e.g. changing the direction

                    // use the 'break' animation
                    var animation = animations.get('break');
                    if (animation) {
                        tile = animation(levelTotalTime);
                    }
                } else {
                    // use main animation - it for sure exists
                    var _animation = animations.get(this.NAME);
                    tile = _animation(this.distance);
                }
            }
            var mirrored = this.heading < 0;

            return { tile: tile, mirrored: mirrored };
        }
    }, {
        key: 'direction',
        get: function get() {
            return this._direction;
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'distance',
        get: function get() {
            return this._distance;
        }

        /**
         * The direction to where the entity is heading - "left or right" of course
         * @returns {Number}
         */

    }, {
        key: 'heading',
        get: function get() {
            return this._heading;
        }
    }]);
    return WalkTrait;
}(_Trait2.Trait);

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(172);
module.exports = __webpack_require__(2).Object.getPrototypeOf;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(29);
var $getPrototypeOf = __webpack_require__(74);

__webpack_require__(173)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(2);
var fails = __webpack_require__(18);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(175), __esModule: true };

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
__webpack_require__(23);
module.exports = __webpack_require__(61).f('iterator');


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(177), __esModule: true };

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(178);
module.exports = __webpack_require__(2).Object.setPrototypeOf;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(179).set });


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(9);
var anObject = __webpack_require__(8);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(15)(Function.call, __webpack_require__(96).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(181), __esModule: true };

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(182);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(34) });


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JumpTrait = undefined;

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Trait2 = __webpack_require__(14);

var _Entity = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JumpTrait = exports.JumpTrait = function (_Trait) {
    (0, _inherits3.default)(JumpTrait, _Trait);

    function JumpTrait() {
        (0, _classCallCheck3.default)(this, JumpTrait);

        var _this = (0, _possibleConstructorReturn3.default)(this, (JumpTrait.__proto__ || (0, _getPrototypeOf2.default)(JumpTrait)).call(this, 'jump'));

        _this._duration = 0.3;
        _this._velocity = 200;
        _this._engagedTime = 0;

        // state to indicate whether we can jump - it can only from when touched a 'ground'
        // this means that there will be needed a 2 step-update in order to animate
        _this._ready = 0;

        // allow a grace time in which we can jump, e.g.
        // next jump can occur while falling and start
        // is pressed when very close to the ground (allow a grace period)
        _this._requestTime = 0;
        _this._gracePeriod = 0.2; // seconds

        // the faster we walk/run the higher the jump
        _this._speedBoost = 0.3;
        return _this;
    }

    /**
     * @returns {boolean}
     */


    (0, _createClass3.default)(JumpTrait, [{
        key: 'start',
        value: function start() {
            this._requestTime = this._gracePeriod;
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this._engagedTime = 0;
            this._requestTime = 0;
        }

        /**
         * @param {Entity} entity
         * @param {Number} rate
         * @param {Level} level  
         */

    }, {
        key: 'update',
        value: function update(entity, rate) {
            // check if we've pressed to 'start'
            // then we'll start to look for an opportunaty to jump
            if (this._requestTime > 0) {
                if (this._ready > 0) {
                    this._engagedTime = this._duration;
                    this._requestTime = 0;
                } else {
                    this._requestTime -= rate;
                }
            }

            if (this._engagedTime > 0) {
                // update just the 'y' coordinate
                // the faster we run the more speed we gain and thus higher jump
                entity.vel.y = -(this._velocity + Math.abs(entity.vel.x) * this._speedBoost);
                this._engagedTime -= rate;
            }

            this._ready--;
        }
    }, {
        key: 'obstructed',
        value: function obstructed(entity, obstacle, direction) {
            switch (direction) {
                case _Entity.Entity.COLLIDE_BOTTOM:
                    // make ready to jump
                    this._ready = 1;
                    break;
                case _Entity.Entity.COLLIDE_TOP:
                    // stop the jumping 
                    this.cancel();
                    break;
            }
        }

        /**
         * @param {Entity} entity 
         * @param {Map<name:String, (progress: Number)>} animations
         * @param {Number} levelTotalTime 
         */

    }, {
        key: 'animate',
        value: function animate(entity, animations, levelTotalTime) {
            var tile = void 0;

            // catch the case when jumping
            if (this.falling) {
                // get the main animation - it for sure exists
                var animation = animations.get(this.NAME);
                tile = animation(levelTotalTime);
            }

            return { tile: tile };
        }
    }, {
        key: 'falling',
        get: function get() {
            return this._ready < 0;
        }
    }]);
    return JumpTrait;
}(_Trait2.Trait);

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BeStomperTrait = undefined;

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Trait2 = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BeStomperTrait = exports.BeStomperTrait = function (_Trait) {
    (0, _inherits3.default)(BeStomperTrait, _Trait);

    function BeStomperTrait() {
        (0, _classCallCheck3.default)(this, BeStomperTrait);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BeStomperTrait.__proto__ || (0, _getPrototypeOf2.default)(BeStomperTrait)).call(this, 'stomper', true));

        _this._bounceVelocity = 400;

        /**
         * @param {Function[]}
         */
        _this._stompListeners = [];
        return _this;
    }

    /**
     * 
     * @param {Function} callback 
     */


    (0, _createClass3.default)(BeStomperTrait, [{
        key: 'addListener',
        value: function addListener(callback) {
            this._stompListeners.push(callback);
        }

        /**
         * @param {Entity} us 
         * @param {Entity} otherEntity 
         */

    }, {
        key: 'collided',
        value: function collided(us, otherEntity) {
            if (!otherEntity.killable || otherEntity.killable.dead) {
                return;
            }

            if (us.pos.y < otherEntity.pos.y) {
                this.onStomp(us, otherEntity);
                this._stompListeners.forEach(function (callback) {
                    return callback(us, otherEntity);
                });
            }
        }

        /**
         * @param {Entity} us 
         * @param {Entity} otherEntity 
         */

    }, {
        key: 'onStomp',
        value: function onStomp(us, otherEntity) {
            // go to the top of the other entity, not to collide agin with it on the next check
            us.bounds.bottom = otherEntity.bounds.top;

            // make the stomper bounce
            us.vel.y = -this._bounceVelocity;
        }
    }]);
    return BeStomperTrait;
}(_Trait2.Trait);

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.loadGoomba = loadGoomba;

var _Entity = __webpack_require__(7);

var _Trait2 = __webpack_require__(14);

var _Wander = __webpack_require__(99);

var _BePhysics = __webpack_require__(65);

var _BeSolid = __webpack_require__(66);

var _BeKillable = __webpack_require__(67);

var _sprites = __webpack_require__(41);

var _utils = __webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadGoomba() {
    return (0, _sprites.loadSprites)('goomba', true).then(createGoombaFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createGoombaFactory(sprites) {

    // create the draw method - common/static/stateless for all Goomba entities
    var defDraw = (0, _utils.createDraw)(sprites, 'walk-1');
    var draw = function draw(context, level) {
        if (this.killable.dead) {
            sprites.draw('flat', context, 0, 0);
            return;
        }
        defDraw.call(this, context, level);
    };

    return function goomba() {
        var entity = new _Entity.Entity('goomba');
        entity.size.set(16, 16);

        entity.registerTrait(new Behavior());
        entity.registerTrait(new _BePhysics.BePhysicsTrait());
        entity.registerTrait(new _BeSolid.BeSolidTrait());
        entity.registerTrait(new _BeKillable.BeKillableTrait());
        entity.registerTrait(new _Wander.WanderTrait());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

var Behavior = function (_Trait) {
    (0, _inherits3.default)(Behavior, _Trait);

    function Behavior() {
        (0, _classCallCheck3.default)(this, Behavior);
        return (0, _possibleConstructorReturn3.default)(this, (Behavior.__proto__ || (0, _getPrototypeOf2.default)(Behavior)).call(this, 'behavior', true));
    }

    (0, _createClass3.default)(Behavior, [{
        key: 'collided',
        value: function collided(goomba, otherEntity) {
            if (goomba.killable.dead) {
                // we are already dead - don't interact again on next collisions
                return;
            }

            // don't check if the other entity is 'Mario'
            // but if the other entity has a special feature,
            // in this case for a trait named 'stomper'
            if (otherEntity.stomper) {
                // Goomba is killed only if the stomper (like Mario) is falling on it
                if (otherEntity.pos.y < goomba.pos.y) {
                    // make us stop moving
                    goomba.vel.x = 0;
                    goomba.wander.pause();

                    // make us killed
                    goomba.killable.kill();
                } else {
                    // make the stomper killed
                    if (otherEntity.killable) {
                        otherEntity.killable.kill();
                    }
                }
            }
        }
    }]);
    return Behavior;
}(_Trait2.Trait);

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sign = __webpack_require__(187);

var _sign2 = _interopRequireDefault(_sign);

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = __webpack_require__(60);

var _symbol2 = _interopRequireDefault(_symbol);

exports.loadKoopa = loadKoopa;

var _Entity = __webpack_require__(7);

var _Trait2 = __webpack_require__(14);

var _Wander = __webpack_require__(99);

var _BePhysics = __webpack_require__(65);

var _BeSolid = __webpack_require__(66);

var _BeKillable = __webpack_require__(67);

var _sprites = __webpack_require__(41);

var _utils = __webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadKoopa() {
    return (0, _sprites.loadSprites)('koopa', true).then(createKoopaFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createKoopaFactory(sprites) {

    // create the draw method - common/static/stateless for all Koopa entities
    var draw = (0, _utils.createDraw)(sprites, 'walk-1');

    return function koopa() {
        var entity = new _Entity.Entity('koopa');
        entity.size.set(16, 16);
        entity.offset.y = 8;

        entity.registerTrait(new Behavior());
        entity.registerTrait(new _BePhysics.BePhysicsTrait());
        entity.registerTrait(new _BeSolid.BeSolidTrait());
        entity.registerTrait(new _BeKillable.BeKillableTrait());
        entity.registerTrait(new _Wander.WanderTrait(30));

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

var STATE_WALKING = (0, _symbol2.default)();
var STATE_HIDING = (0, _symbol2.default)();
var STATE_PANICING = (0, _symbol2.default)();

var Behavior = function (_Trait) {
    (0, _inherits3.default)(Behavior, _Trait);

    function Behavior() {
        (0, _classCallCheck3.default)(this, Behavior);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Behavior.__proto__ || (0, _getPrototypeOf2.default)(Behavior)).call(this, 'behavior', true));

        _this._unhideTime = 5;
        _this._hidingTime = 0;

        _this._panicVelocity = 300;
        _this._wanderVelocity = null;

        _this._state = STATE_WALKING;
        return _this;
    }

    /**
     * @returns {Boolean}
     */


    (0, _createClass3.default)(Behavior, [{
        key: '_hide',
        value: function _hide(koopa) {
            koopa.vel.x = 0;
            koopa.wander.pause();
            if (this._wanderVelocity === null) {
                this._wanderVelocity = koopa.wander.velocity;
            }

            this._state = STATE_HIDING;
            this._hidingTime = 0;
        }
    }, {
        key: '_unhide',
        value: function _unhide(koopa) {
            koopa.wander.pause(false);
            if (this._wanderVelocity !== null) {
                koopa.wander.velocity = this._wanderVelocity;
            }
            this._state = STATE_WALKING;
        }
    }, {
        key: '_handleStopm',
        value: function _handleStopm(koopa, otherEntity) {
            if (this._state === STATE_WALKING || this._state === STATE_PANICING) {
                // make us hide
                this._hide(koopa);
            } else {
                // make us killed
                koopa.killable.kill();
                // make it not 'collidable'
                koopa.solid.disable();
                // make the koopa's shell bounce up a little and continue
                koopa.wander.pause(false);
                koopa.vel.y = -200;
            }
        }
    }, {
        key: '_handleNudge',
        value: function _handleNudge(koopa, otherEntity) {
            if (this._state === STATE_WALKING) {
                // make the stomper killed
                if (otherEntity.killable) {
                    otherEntity.killable.kill();
                }
            } else if (this._state === STATE_HIDING) {
                // make the stomper kick the koopa's shell
                koopa.wander.velocity = this._panicVelocity * (0, _sign2.default)(otherEntity.vel.x);
                koopa.wander.pause(false);
                this._state = STATE_PANICING;
            } else {
                // TODO: kill the stomper only if not in the same direction
                if (otherEntity.killable) {
                    otherEntity.killable.kill();
                }
            }
        }
    }, {
        key: 'collided',
        value: function collided(koopa, otherEntity) {
            if (koopa.killable.dead) {
                // we are already dead - don't interact again on next collisions
                return;
            }

            if (otherEntity.stomper) {
                // Koopa is hided first and after that killed
                if (otherEntity.pos.y < koopa.pos.y) {
                    this._handleStopm(koopa, otherEntity);
                } else {
                    this._handleNudge(koopa, otherEntity);
                }
            }
        }
    }, {
        key: 'update',
        value: function update(koopa, rate) {
            if (this._state === STATE_HIDING && !koopa.killable.dead) {
                this._hidingTime += rate;

                if (this._hidingTime >= this._unhideTime) {
                    this._unhide(koopa);
                }
            }
        }

        /**
         * @param {Entity} entity 
         * @param {(progress: Number)} animation
         */

    }, {
        key: 'animate',
        value: function animate(entity, animations) {
            var tile = this.hiding ? 'hiding' : undefined;
            if (this._state === STATE_HIDING) {
                if (this._hidingTime > 3) {
                    // use 'wake' animation - it for sure exists
                    var animation = animations.get('wake');
                    if (animation) {
                        tile = animation(this._hidingTime);
                    }
                }
            }

            return { tile: tile };
        }
    }, {
        key: 'hiding',
        get: function get() {
            return this._state === STATE_HIDING || this._state === STATE_PANICING;
        }
    }]);
    return Behavior;
}(_Trait2.Trait);

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(188), __esModule: true };

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(189);
module.exports = __webpack_require__(2).Math.sign;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(3);

$export($export.S, 'Math', { sign: __webpack_require__(190) });


/***/ }),
/* 190 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupMouseControl = setupMouseControl;

// debug utility
// 1. Reposition an entity to the clicked position when mouse Left button is pressed
// 2. Scroll the view when the RIGHT mouse button is pressed
function setupMouseControl(entity, canvas, view) {
    var lastMouseEvent = null;
    ['mousedown', 'mousemove'].forEach(function (eventName) {
        canvas.addEventListener(eventName, function (event) {
            if (event.buttons === 1) {
                // reposition the entity to the desired position
                entity.vel.set(0, 0);
                entity.pos.set(event.offsetX + view.pos.x, event.offsetY + view.pos.y);
            } else if (event.buttons === 2 && lastMouseEvent && lastMouseEvent.buttons === 2 && lastMouseEvent.type === 'mousemove') {
                // move the whole view
                view.pos.x -= event.offsetX - lastMouseEvent.offsetX;
            }

            lastMouseEvent = event;
        });
    });

    // prevent the context menu appear on the canvas
    canvas.addEventListener('contextmenu', function (event) {
        return event.preventDefault();
    });
}

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(31);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = __webpack_require__(93);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = __webpack_require__(39);

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.loadFont = loadFont;

var _Font = __webpack_require__(100);

var _SpriteSheet = __webpack_require__(64);

var _utils = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
var CHAR_SIZE = 8;

/**
 * @returns {Promise<Font>}
 */
function loadFont() {
    return (0, _utils.loadImage)('img/font.png').then(function (image) {
        var fontSprite = new _SpriteSheet.SpriteSheet(image, false, CHAR_SIZE, CHAR_SIZE);
        var rowLen = image.width;

        // register all characters ()
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)([].concat((0, _toConsumableArray3.default)(CHARS)).entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                    index = _step$value[0],
                    char = _step$value[1];

                var x = index * CHAR_SIZE % rowLen;
                var y = Math.floor(index * CHAR_SIZE / rowLen) * CHAR_SIZE;
                fontSprite.register(char, x, y);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return new _Font.Font(fontSprite, CHAR_SIZE);
    });
}

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDebugTileCollisionLayer = createDebugTileCollisionLayer;
exports.createDebugEntityLayer = createDebugEntityLayer;
exports.createDebugViewLayer = createDebugViewLayer;

var _logger = __webpack_require__(20);

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @param {Level} level
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function createDebugTileCollisionLayer(level) {
    var tileResolver = level.getTileCollider().getTileResolver();
    var tileSize = tileResolver.getTileSize();

    var collisionTiles = [];
    // create a SPY on the resolver method
    var getIndexByORIG = tileResolver.getByIndex;
    tileResolver.getByIndex = function (indexX, indexY) {
        collisionTiles.push({ indexX: indexX, indexY: indexY });
        return getIndexByORIG.call(this, indexX, indexY);
    };

    return function (context, view) {
        logger.logDbg("Debug tile-collision layer", collisionTiles.length);

        var _view$pos = view.pos,
            x = _view$pos.x,
            y = _view$pos.y;
        // draw a box around each collision-tile

        context.strokeStyle = 'green';
        collisionTiles.forEach(function (_ref) {
            var indexX = _ref.indexX,
                indexY = _ref.indexY;

            context.beginPath();
            context.rect(indexX * tileSize - x, indexY * tileSize - y, tileSize, tileSize);
            context.stroke();
        });
        collisionTiles.length = 0;
    };
}

/**
 * @param {Level} level
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function createDebugEntityLayer(level) {
    return function (context, view) {
        logger.logDbg("Debug entity layer");

        var _view$pos2 = view.pos,
            x = _view$pos2.x,
            y = _view$pos2.y;

        // draw a box around each entity
        // Note - the entity may not be perfectly fit in a grid tile

        context.strokeStyle = 'red';
        level.forEachEntity(function (entity) {
            context.beginPath();
            context.rect(entity.bounds.left - x, entity.bounds.top - y, entity.size.x, entity.size.y);
            context.stroke();
        });
    };
}

/**
 * @param {View} view
 * @returns {(context: CanvasRenderingContext2D, view: View) => void}
 */
function createDebugViewLayer(viewToDraw) {
    return function (context, view) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(viewToDraw.pos.x - view.pos.x, viewToDraw.pos.y - view.pos.y, view.size.x, view.size.y);
        context.stroke();
    };
}

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.createDashboardLayer = createDashboardLayer;

var _logger = __webpack_require__(20);

var logger = _interopRequireWildcard(_logger);

var _Font = __webpack_require__(100);

var _Level = __webpack_require__(92);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function pad(number) {
        var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

        return ('' + Math.floor(number)).padStart(len, '0');
}

/**
 * @param {Font} font
 * @param {Entity} playerEnv 
 * @param {Level} level 
 * @returns {(context: CanvasRenderingContext2D) => void} 
 */
function createDashboardLayer(font, playerEnv, level) {

        var LINE1 = font.lineHeight;
        var LINE2 = font.lineHeight * 2;

        /**
         * @param {CanvasRenderingContext2D} context
         */
        return function (context) {
                logger.logDbg("Dashboard layer");

                var _playerEnv$control = playerEnv.control,
                    score = _playerEnv$control.score,
                    coins = _playerEnv$control.coins,
                    remainTime = _playerEnv$control.remainTime;


                font.print('MARIO', context, 16, LINE1);
                font.print(pad(score, 6), context, 16, LINE2);

                // NOTE - the '@' and 'x' are replaced in the 'font.png'
                // similar trick like font-icon
                font.print('@x' + pad(coins, 2), context, 96, LINE2);

                font.print('WORLD', context, 152, LINE1);
                font.print(level.NAME, context, 160, LINE2);

                font.print('TIME', context, 208, LINE1);
                font.print(pad(remainTime, 3), context, 216, LINE2);
        };
}

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BePlayerControlTrait = undefined;

var _getPrototypeOf = __webpack_require__(11);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(12);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(13);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Trait2 = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BePlayerControlTrait = exports.BePlayerControlTrait = function (_Trait) {
    (0, _inherits3.default)(BePlayerControlTrait, _Trait);

    /**
     * @param {Entity} player
     * @param {Number} playerTime
     */
    function BePlayerControlTrait(player) {
        var playerTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        (0, _classCallCheck3.default)(this, BePlayerControlTrait);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BePlayerControlTrait.__proto__ || (0, _getPrototypeOf2.default)(BePlayerControlTrait)).call(this, 'control', true));

        _this._player = player;
        _this._checkpoint = _this._player.pos.clone();

        _this._playerTime = playerTime;
        _this._remainTime = _this._playerTime;
        _this._timeSpeed = 2;

        _this._score = 0;
        _this._coins = 0;

        // add a stomper listener
        _this._player.stomper.addListener(function () {
            return _this._score += 100;
        });
        return _this;
    }

    /**
     * @returns {Number}
     */


    (0, _createClass3.default)(BePlayerControlTrait, [{
        key: 'update',


        /**
         * @param {Entity} entity
         * @param {Number} rate
         * @param {Level} level  
         */
        value: function update(entity, rate, level) {
            // revive the killed entity
            if (!level.hasEntity(this._player)) {
                this._player.killable.revive();
                this._player.pos.set(this._checkpoint.x, this._checkpoint.y);
                level.addEntity(this._player);

                // reset again the player's remaining time
                this._remainTime = this._playerTime;
            } else {

                // update player's remaining time (if there's such a need)
                if (this._playerTime > 0) {
                    this._remainTime -= rate * this._timeSpeed;
                }
            }
        }
    }, {
        key: 'score',
        get: function get() {
            return this._score;
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'coins',
        get: function get() {
            return this._coins;
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'remainTime',
        get: function get() {
            return this._remainTime;
        }
    }]);
    return BePlayerControlTrait;
}(_Trait2.Trait);

/***/ }),
/* 196 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map