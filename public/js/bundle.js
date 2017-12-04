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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Entity = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = __webpack_require__(4);

var _Bounds = __webpack_require__(24);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = exports.Entity = function () {
    function Entity(name) {
        _classCallCheck(this, Entity);

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

        this._animations = new Map();
    }

    /**
     * @returns {Bounds}
     */


    _createClass(Entity, [{
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
                animations = new Map();
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

            return Array.from(this._animations).reduce(function (accum, _ref) {
                var _ref2 = _slicedToArray(_ref, 2),
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


Entity.COLLIDE_TOP = Symbol(1);
/**
 * Collide directon BOTTOM
 * @constant
 * @static
 */
Entity.COLLIDE_BOTTOM = Symbol(2);
/**
 * Collide directon LEFT
 * @constant
 * @static
 */
Entity.COLLIDE_LEFT = Symbol(3);
/**
 * Collide directon RIGHT
 * @constant
 * @static
 */
Entity.COLLIDE_RIGHT = Symbol(4);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tile = __webpack_require__(12);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trait = exports.Trait = function () {
    function Trait(name) {
        var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, Trait);

        this.NAME = name;
        this._isBehavior = isBehavior;
        this._queuedTasks = [];
    }

    _createClass(Trait, [{
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.loadSprites = loadSprites;

var _SpriteSheet = __webpack_require__(6);

var _utils = __webpack_require__(5);

var _animation = __webpack_require__(29);

/**
 * @param {String} name 
 * @param {Boolean} mirrored
 * @returns {Promise<SpriteSheet>}
 */
function loadSprites(name) {
    var mirrored = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return (0, _utils.loadData)('sprites/' + name).then(function (spritesSpec) {
        return Promise.all([spritesSpec, (0, _utils.loadImage)(spritesSpec.spritesURL)]);
    }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
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
                var _index = _slicedToArray(index, 2),
                    indexX = _index[0],
                    indexY = _index[1];

                sprites.registerTile(name, indexX, indexY);
            } else {
                // pos is obligatory then, but size is again optional
                var _tileSpec$pos = _slicedToArray(tileSpec.pos, 2),
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = exports.Vector = function () {
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this.set(x, y);
    }

    _createClass(Vector, [{
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
        _classCallCheck(this, Matrix);

        this._grid = [];
    }

    _createClass(Matrix, [{
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadImage = loadImage;
exports.loadDataLevel = loadDataLevel;
exports.loadData = loadData;
function loadImage(name) {
    return new Promise(function (resolve, reject) {
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpriteSheet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = __webpack_require__(2);

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpriteSheet = exports.SpriteSheet = function () {
    function SpriteSheet(image) {
        var mirrored = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var tileWidth = arguments[2];
        var tileHeight = arguments[3];

        _classCallCheck(this, SpriteSheet);

        this._image = image;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;
        this._mirrored = mirrored;

        this._tiles = new Map();
        this._animations = new Map();
    }

    _createClass(SpriteSheet, [{
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BePhysicsTrait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = __webpack_require__(1);

var _Entity = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BePhysicsTrait = exports.BePhysicsTrait = function (_Trait) {
    _inherits(BePhysicsTrait, _Trait);

    function BePhysicsTrait() {
        var gravity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1500;

        _classCallCheck(this, BePhysicsTrait);

        var _this = _possibleConstructorReturn(this, (BePhysicsTrait.__proto__ || Object.getPrototypeOf(BePhysicsTrait)).call(this, 'physics'));

        _this._gravity = gravity;
        _this._enabled = true;
        return _this;
    }

    _createClass(BePhysicsTrait, [{
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BeSolidTrait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = __webpack_require__(1);

var _Entity = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BeSolidTrait = exports.BeSolidTrait = function (_Trait) {
    _inherits(BeSolidTrait, _Trait);

    function BeSolidTrait() {
        _classCallCheck(this, BeSolidTrait);

        var _this = _possibleConstructorReturn(this, (BeSolidTrait.__proto__ || Object.getPrototypeOf(BeSolidTrait)).call(this, 'solid', true));

        _this._enabled = true;
        return _this;
    }

    _createClass(BeSolidTrait, [{
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BeKillableTrait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BeKillableTrait = exports.BeKillableTrait = function (_Trait) {
    _inherits(BeKillableTrait, _Trait);

    /**
     * 
     * @param {Number} deadTimeRemove 2 seconds by default
     */
    function BeKillableTrait() {
        var deadTimeRemove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

        _classCallCheck(this, BeKillableTrait);

        var _this = _possibleConstructorReturn(this, (BeKillableTrait.__proto__ || Object.getPrototypeOf(BeKillableTrait)).call(this, 'killable', true));

        _this._dead = false;
        _this._deadTimeRemove = deadTimeRemove;

        _this._deadTime = 0;
        return _this;
    }

    _createClass(BeKillableTrait, [{
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
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = exports.Tile = function () {
    /**
     * @param {{tile: String, type: String}} tileSpec 
     */
    function Tile(tileSpec) {
        _classCallCheck(this, Tile);

        this._name = tileSpec.name;
        this._type = tileSpec.type;
    }

    /**
     * @property
     * @returns {String}
     */


    _createClass(Tile, [{
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Level = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LayerManager = __webpack_require__(23);

var _Entity = __webpack_require__(0);

var _TileCollider = __webpack_require__(25);

var _EntityCollider = __webpack_require__(26);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        _classCallCheck(this, Level);

        this.NAME = name;
        this._tileCollider = new _TileCollider.TileCollider(tiles, tileSize);
        this._layerManager = new _LayerManager.LayerManager();
        this._entities = new Set();

        this._entityCollider = new _EntityCollider.EntityCollider(this._entities);

        this._props = _extends({}, PROPS_DEFAULT, props);

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


    _createClass(Level, [{
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
            return [].concat(_toConsumableArray(this._entities)).find(function (entity) {
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileResolver = exports.TileResolver = function () {
    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    function TileResolver(tiles, tileSize) {
        _classCallCheck(this, TileResolver);

        this._tiles = tiles;
        this._tileSize = tileSize;
    }

    /**
     * @returns {Number}
     */


    _createClass(TileResolver, [{
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WanderTrait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = __webpack_require__(1);

var _Entity = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WanderTrait = exports.WanderTrait = function (_Trait) {
    _inherits(WanderTrait, _Trait);

    function WanderTrait() {
        var velocity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -30;
        var panicVelocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 90;

        _classCallCheck(this, WanderTrait);

        var _this = _possibleConstructorReturn(this, (WanderTrait.__proto__ || Object.getPrototypeOf(WanderTrait)).call(this, 'wander'));

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


    _createClass(WanderTrait, [{
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Font = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SpriteSheet = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Font = exports.Font = function () {

    /**
     * 
     * @param {SpriteSheet} sprites 
     * @param {Number} lineHeight 
     */
    function Font(sprites, lineHeight) {
        _classCallCheck(this, Font);

        this._sprites = sprites;
        this._lineHeight = lineHeight;
    }

    /**
     * @returns {Number}
     */


    _createClass(Font, [{
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
                for (var _iterator = text[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var char = _step.value;

                    var _sprites$draw = this._sprites.draw(char, context, x + offsetX, y),
                        _sprites$draw2 = _slicedToArray(_sprites$draw, 1),
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var main = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(canvas) {
        var context, keyboardManager, entityFactory, loadLevel, level, view, mario, playerEnv, font, timer;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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

var _config = __webpack_require__(11);

var _View = __webpack_require__(18);

var _Timer = __webpack_require__(19);

var _KeyboardManager = __webpack_require__(20);

var _keyboard = __webpack_require__(21);

var _level = __webpack_require__(22);

var _entities = __webpack_require__(30);

var _debug = __webpack_require__(37);

var _font = __webpack_require__(38);

var _debug2 = __webpack_require__(39);

var _dashboard = __webpack_require__(40);

var _Entity = __webpack_require__(0);

var _BePlayerControl = __webpack_require__(41);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.View = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = exports.View = function () {
    function View(width, height) {
        _classCallCheck(this, View);

        this._pos = new _math.Vector(0, 0);
        this._size = new _math.Vector(width, height);
    }

    /**
     * @returns {Vector}
     */


    _createClass(View, [{
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = exports.Timer = function () {
    function Timer() {
        var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1 / 60;

        _classCallCheck(this, Timer);

        this._rate = rate;
        this._lastTime = 0;
        this._accumulatedTime = 0;
    }

    _createClass(Timer, [{
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyboardManager = exports.KEY_STATE_PRESSED = exports.KEY_STATE_RELEASED = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = __webpack_require__(2);

var logger = _interopRequireWildcard(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_STATE_RELEASED = exports.KEY_STATE_RELEASED = 0;
var KEY_STATE_PRESSED = exports.KEY_STATE_PRESSED = 1;

var KeyboardManager = exports.KeyboardManager = function () {
    function KeyboardManager() {
        _classCallCheck(this, KeyboardManager);

        // keyCode to registered callback
        this._keyMap = new Map();

        // down-up state for a key
        this._keyState = new Map();

        this._started = false;
    }

    _createClass(KeyboardManager, [{
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createLoadLevel = createLoadLevel;

var _logger = __webpack_require__(2);

var logger = _interopRequireWildcard(_logger);

var _Tile = __webpack_require__(12);

var _Level = __webpack_require__(13);

var _math = __webpack_require__(4);

var _background = __webpack_require__(27);

var _entities = __webpack_require__(28);

var _utils = __webpack_require__(5);

var _sprites = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(expandSpan),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(expandRanges),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(expandTiles);

function expandSpan(xStart, xLen, yStart, yLen) {
    var xEnd, yEnd, x, y;
    return regeneratorRuntime.wrap(function expandSpan$(_context) {
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
        var _range = _slicedToArray(range, 4),
            xStart = _range[0],
            xLen = _range[1],
            yStart = _range[2],
            yLen = _range[3];

        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 3) {
        var _range2 = _slicedToArray(range, 3),
            _xStart = _range2[0],
            _xLen = _range2[1],
            _yStart = _range2[2];

        return expandSpan(_xStart, _xLen, _yStart, 1);
    } else if (range.length === 2) {
        var _range3 = _slicedToArray(range, 2),
            _xStart2 = _range3[0],
            _yStart2 = _range3[1];

        return expandSpan(_xStart2, 1, _yStart2, 1);
    }
    throw new Error('Unsupported range params length ' + range.length);
}

function expandRanges(ranges) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, range;

    return regeneratorRuntime.wrap(function expandRanges$(_context2) {
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
                    _iterator = ranges[Symbol.iterator]();

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

    return regeneratorRuntime.wrap(function expandTiles$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    walkTiles = function walkTiles(tiles, offsetX, offsetY) {
                        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, tile, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _ref, x, y, realX, realY, patternName, patternSpec;

                        return regeneratorRuntime.wrap(function walkTiles$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        _iteratorNormalCompletion2 = true;
                                        _didIteratorError2 = false;
                                        _iteratorError2 = undefined;
                                        _context3.prev = 3;
                                        _iterator2 = tiles[Symbol.iterator]();

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
                                        _iterator3 = expandRanges(tile.ranges)[Symbol.iterator]();

                                    case 12:
                                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                            _context3.next = 32;
                                            break;
                                        }

                                        _ref = _step3.value;
                                        x = _ref.x, y = _ref.y;

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

                    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(walkTiles);
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
        for (var _iterator4 = expandTiles(tiles, patterns)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _ref2 = _step4.value;
            var x = _ref2.x,
                y = _ref2.y,
                tile = _ref2.tile;

            grid.set(x, y, tile);
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
            return Promise.all([levelSpec, (0, _sprites.loadSprites)(levelSpec.sprites)]);
        }).then(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                levelSpec = _ref4[0],
                backgroundSprites = _ref4[1];

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
                    _entitySpec$pos = _slicedToArray(entitySpec.pos, 2),
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayerManager = exports.LayerManager = function () {
    function LayerManager() {
        _classCallCheck(this, LayerManager);

        this._layers = [];
    }

    /**
     * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
     */


    _createClass(LayerManager, [{
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bounds = exports.Bounds = function () {
    /**
     * 
     * @param {Vector} pos 
     * @param {Vector} size 
     * @param {Vector} offset 
     */
    function Bounds(pos, size, offset) {
        _classCallCheck(this, Bounds);

        this.pos = pos;
        this.size = size;
        this.offset = offset;
    }

    _createClass(Bounds, [{
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileCollider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity = __webpack_require__(0);

var _TileResolver = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TileCollider = exports.TileCollider = function () {
    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    function TileCollider(tiles, tileSize) {
        _classCallCheck(this, TileCollider);

        this._tiles = new _TileResolver.TileResolver(tiles, tileSize);
    }

    /**
     * @returns {TileResolver}
     */


    _createClass(TileCollider, [{
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EntityCollider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityCollider = exports.EntityCollider = function () {
    /**
     * 
     * @param {Set<Entity>} entities 
     */
    function EntityCollider(entities) {
        _classCallCheck(this, EntityCollider);

        this._entities = entities;
    }

    /**
     * 
     * @param {Entity} entity 
     */


    _createClass(EntityCollider, [{
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.___createBackgroundLayer = ___createBackgroundLayer;
exports.__createBackgroundLayer = __createBackgroundLayer;
exports._createBackgroundLayer = _createBackgroundLayer;
exports.createBackgroundLayer = createBackgroundLayer;

var _logger = __webpack_require__(2);

var logger = _interopRequireWildcard(_logger);

var _config = __webpack_require__(11);

var _TileResolver = __webpack_require__(14);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEntitiesLayer = createEntitiesLayer;

var _logger = __webpack_require__(2);

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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadEntities = loadEntities;

var _Mario = __webpack_require__(31);

var _Goomba = __webpack_require__(35);

var _Koopa = __webpack_require__(36);

function loadEntities() {

    // the aim is to have mfactory methods like:
    // entityFactory.mario()
    // entityFactory.goomba()
    // entityFactory.koopa()

    // I. simple version relying on the fact that each 'loadXXX' 
    // that resolves to a factory function that is named
    // specifically like this: "mari/goomba/koopa/...."
    var entityFactory = {};
    return Promise.all([(0, _Mario.loadMario)(), (0, _Goomba.loadGoomba)(), (0, _Koopa.loadKoopa)()]).then(function (factories) {
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMario = loadMario;

var _Entity = __webpack_require__(0);

var _Walk = __webpack_require__(32);

var _Jump = __webpack_require__(33);

var _BePhysics = __webpack_require__(7);

var _BeSolid = __webpack_require__(8);

var _BeStomper = __webpack_require__(34);

var _BeKillable = __webpack_require__(9);

var _sprites = __webpack_require__(3);

var _utils = __webpack_require__(10);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WalkTrait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DRAG_FACTOR_NORMAL = 1 / 1000;
var DRAG_FACTOR_TURBO = 1 / 5000;

var WalkTrait = exports.WalkTrait = function (_Trait) {
    _inherits(WalkTrait, _Trait);

    function WalkTrait() {
        var accelerate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        _classCallCheck(this, WalkTrait);

        var _this = _possibleConstructorReturn(this, (WalkTrait.__proto__ || Object.getPrototypeOf(WalkTrait)).call(this, 'walk'));

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


    _createClass(WalkTrait, [{
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JumpTrait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = __webpack_require__(1);

var _Entity = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JumpTrait = exports.JumpTrait = function (_Trait) {
    _inherits(JumpTrait, _Trait);

    function JumpTrait() {
        _classCallCheck(this, JumpTrait);

        var _this = _possibleConstructorReturn(this, (JumpTrait.__proto__ || Object.getPrototypeOf(JumpTrait)).call(this, 'jump'));

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


    _createClass(JumpTrait, [{
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BeStomperTrait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BeStomperTrait = exports.BeStomperTrait = function (_Trait) {
    _inherits(BeStomperTrait, _Trait);

    function BeStomperTrait() {
        _classCallCheck(this, BeStomperTrait);

        var _this = _possibleConstructorReturn(this, (BeStomperTrait.__proto__ || Object.getPrototypeOf(BeStomperTrait)).call(this, 'stomper', true));

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


    _createClass(BeStomperTrait, [{
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.loadGoomba = loadGoomba;

var _Entity = __webpack_require__(0);

var _Trait2 = __webpack_require__(1);

var _Wander = __webpack_require__(15);

var _BePhysics = __webpack_require__(7);

var _BeSolid = __webpack_require__(8);

var _BeKillable = __webpack_require__(9);

var _sprites = __webpack_require__(3);

var _utils = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _inherits(Behavior, _Trait);

    function Behavior() {
        _classCallCheck(this, Behavior);

        return _possibleConstructorReturn(this, (Behavior.__proto__ || Object.getPrototypeOf(Behavior)).call(this, 'behavior', true));
    }

    _createClass(Behavior, [{
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.loadKoopa = loadKoopa;

var _Entity = __webpack_require__(0);

var _Trait2 = __webpack_require__(1);

var _Wander = __webpack_require__(15);

var _BePhysics = __webpack_require__(7);

var _BeSolid = __webpack_require__(8);

var _BeKillable = __webpack_require__(9);

var _sprites = __webpack_require__(3);

var _utils = __webpack_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var STATE_WALKING = Symbol();
var STATE_HIDING = Symbol();
var STATE_PANICING = Symbol();

var Behavior = function (_Trait) {
    _inherits(Behavior, _Trait);

    function Behavior() {
        _classCallCheck(this, Behavior);

        var _this = _possibleConstructorReturn(this, (Behavior.__proto__ || Object.getPrototypeOf(Behavior)).call(this, 'behavior', true));

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


    _createClass(Behavior, [{
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
                koopa.wander.velocity = this._panicVelocity * Math.sign(otherEntity.vel.x);
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
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.loadFont = loadFont;

var _Font = __webpack_require__(16);

var _SpriteSheet = __webpack_require__(6);

var _utils = __webpack_require__(5);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
            for (var _iterator = [].concat(_toConsumableArray(CHARS)).entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref = _step.value;

                var _ref2 = _slicedToArray(_ref, 2);

                var index = _ref2[0];
                var char = _ref2[1];

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDebugTileCollisionLayer = createDebugTileCollisionLayer;
exports.createDebugEntityLayer = createDebugEntityLayer;
exports.createDebugViewLayer = createDebugViewLayer;

var _logger = __webpack_require__(2);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.createDashboardLayer = createDashboardLayer;

var _logger = __webpack_require__(2);

var logger = _interopRequireWildcard(_logger);

var _Font = __webpack_require__(16);

var _Level = __webpack_require__(13);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BePlayerControlTrait = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Trait2 = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BePlayerControlTrait = exports.BePlayerControlTrait = function (_Trait) {
    _inherits(BePlayerControlTrait, _Trait);

    /**
     * @param {Entity} player
     * @param {Number} playerTime
     */
    function BePlayerControlTrait(player) {
        var playerTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        _classCallCheck(this, BePlayerControlTrait);

        var _this = _possibleConstructorReturn(this, (BePlayerControlTrait.__proto__ || Object.getPrototypeOf(BePlayerControlTrait)).call(this, 'control', true));

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


    _createClass(BePlayerControlTrait, [{
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map