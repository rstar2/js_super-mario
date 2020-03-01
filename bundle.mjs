const CONFIG = {
    RATE: 1 / 60,

    VIEW_WIDTH: 256,
    VIEW_HEIGHT: 240,

    DEBUG_MARIO: false,
    DEBUG_TILE_COLLISION: false,
    DEBUG_VIEW_SCROLL: false
};

class Vector {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this._x = x;
        this._y = y;
    }

    clone() {
        return new Vector(this._x, this._y);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }


}

class Matrix {
    constructor() {
        this._grid = [];
    }

    set(x, y, value) {
        if (!this._grid[x]) {
            this._grid[x] = [];
        }
        this._grid[x][y] = value;
    }

    get(x, y) {
        const col = this._grid[x];
        return col ? col[y] : undefined;
    }

    forEach(callback) {
        this._grid.forEach((column, x) => {
            column.forEach((value, y) => callback(x, y, value));
        });
    }

    forEachInColumn(x, callback) {
        const column = this._grid[x];
        if (column) {
            column.forEach((value, y) => callback(x, y, value));
        }
    }

}

class View {
    constructor(width, height) {
        this._pos = new Vector(0, 0);
        this._size = new Vector(width, height);
    }

    /**
     * @returns {Vector}
     */
    get pos() {
        return this._pos;
    }

    /**
     * @returns {Vector}
     */
    get size() {
        return this._size;
    }
}

class Timer {
    constructor(rate = 1 / 60) {
        this._rate = rate;
        this._lastTime = 0;
        this._accumulatedTime = 0;
    }

    _updateProxy(time) {
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

    _enqueue() {
        requestAnimationFrame(this._updateProxy.bind(this));
    }

    // eslint-disable-next-line no-unused-vars
    update(rate) {
        // users should overwrite it
        throw new Error("Users should attach a real update method");
    }

    start() {
        this._enqueue();
    }

}

/* eslint-disable no-console */

const LEVEL_DEBUG = 0;
const LEVEL_WARN = 2;

// const level = LEVEL_DEBUG;
const level = LEVEL_WARN;

function isLog(levelNeeded) {
    return level <= levelNeeded;
}

function log(levelNeeded, logFunc, logFuncArguments) {
    if (isLog(levelNeeded)) {
        logFunc.apply(null, logFuncArguments);
    }
}

/* Log functions */

function logDbg() {
    log(LEVEL_DEBUG, console.log, arguments);
}
function logWarn() {
    log(LEVEL_WARN, console.warn, arguments);
}

const KEY_STATE_RELEASED = 0;
const KEY_STATE_PRESSED = 1;

class KeyboardManager {
    constructor() {
        // keyCode to registered callback
        this._keyMap = new Map();

        // down-up state for a key
        this._keyState = new Map();

        this._started = false;
    }

    start(window) {
        if (this._started) {
            logWarn("KeyboardManager is already started");
            return;
        }

        logDbg("KeyboardManager is started");

        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this._handleEvent(event);
            });
        });
    }

    register(key, callback) {
        this._keyMap.set(key, callback);
        // this._keyState.set(key, KEY_STATE_RELEASED);
    }

    _handleEvent(event) {
        const key = event.keyCode;

        const callback = this._keyMap.get(key);
        if (!callback) {
            // not interested in this key
            return;
        }

        // no browser's default action on any registered keys
        event.preventDefault();

        const newState = event.type === "keydown" ? KEY_STATE_PRESSED : KEY_STATE_RELEASED;
        if (this._keyState.get(key) !== newState) {
            callback(newState);
            this._keyState.set(key, newState);
        }

    }

}

// constants for the keyboard control - these are keyCode 
const KEY_LEFT = 65;     // A
const KEY_RIGHT = 68;    // D
const KEY_TURBO = 79;    // O
const KEY_JUMP = 80;     // P

/**
 * 
 * @param {Entity} mario 
 * @param {KeyboardManager} keyboardManager 
 */
function setupMarioKeyboard(mario, keyboardManager) {
    keyboardManager.register(KEY_JUMP, keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    keyboardManager.register(KEY_LEFT, keyState => {
        mario.walk.left(!!keyState);
    });
    keyboardManager.register(KEY_RIGHT, keyState => {
        mario.walk.right(!!keyState);
    });
    keyboardManager.register(KEY_TURBO, keyState => {
        mario.walk.turbo(!!keyState);
    });
}

class Tile {
    /**
     * @param {{tile: String, type: String}} tileSpec 
     */
    constructor(tileSpec) {
        this._name = tileSpec.name;
        this._type = tileSpec.type;
    }

    /**
     * @property
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    /**
     * @property
     * @returns {String}
     */
    get type() {
        return this._type;
    }
}

class LayerManager {
    constructor() {
        this._layers = [];
    }

    /**
     * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
     */
    add(layer) {
        this._layers.push(layer);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {View} view 
     */
    draw(context, view) {
        this._layers.forEach(layer => layer(context, view));
    }
}

class Bounds {
    /**
     * 
     * @param {Vector} pos 
     * @param {Vector} size 
     * @param {Vector} offset 
     */
    constructor(pos, size, offset) {
        this.pos = pos;
        this.size = size;
        this.offset = offset;
    }

    get bottom() {
        return this.pos.y + this.size.y + this.offset.y;
    }

    set bottom(y) {
        this.pos.y = y - (this.size.y + this.offset.y);
    }

    get top() {
        return this.pos.y + this.offset.y;
    }

    set top(y) {
        this.pos.y = y - this.offset.y;
    }

    get left() {
        return this.pos.x + this.offset.x;
    }

    set left(x) {
        this.pos.x = x - this.offset.x;
    }

    get right() {
        return this.pos.x + this.size.x + this.offset.x;
    }

    set right(x) {
        this.pos.x = x - (this.size.x + this.offset.x);
    }

    overlaps(otherBounds) {
        return this.bottom > otherBounds.top &&
            this.top < otherBounds.bottom &&
            this.right > otherBounds.left &&
            this.left < otherBounds.right;
    }
}

class Entity {
    constructor(name) {
        this.NAME = name;
        // current possition
        this._pos = new Vector(0, 0);
        // current velocity
        this._vel = new Vector(0, 0);
        // current size
        this._size = new Vector(0, 0);
        // current offset (allow drawn size to be different that the real size)
        this._offset = new Vector(0, 0);

        // it wil make all calculations 
        this._bounds = new Bounds(this._pos, this._size, this._offset);

        this._lifetime = 0;

        this._traits = [];

        this._animations = new Map();
    }

    /**
     * @returns {Bounds}
     */
    get bounds() {
        return this._bounds;
    }

    /**
     * @returns {Vector}
     */
    get pos() {
        return this._pos;
    }

    /**
     * @returns {Vector}
     */
    get vel() {
        return this._vel;
    }

    /**
     * @returns {Vector}
     */
    get size() {
        return this._size;
    }

    /**
     * @returns {Vector}
     */
    get offset() {
        return this._offset;
    }

    /**
     * @returns {Number}
     */
    get lifetime() {
        return this._lifetime;
    }

    /**
     * 
     * @param {Trait} trait 
     */
    registerTrait(trait) {
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
    registerAnimation(animName, animation) {
        const idx = animName.indexOf('-');
        let mainName = animName;
        let subName = animName;
        if (idx > 0) {
            mainName = animName.substring(0, idx);
            subName = animName.substring(idx + 1);
        }
        let animations = this._animations.get(mainName);
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
    registerAnimationsFromSprites(sprites) {
        sprites.forEachAnimation((animation, name) => {
            this.registerAnimation(name, animation);
        });
    }

    /**
     * 
     * @param {Level} level 
     */
    animate(level) {
        return Array.from(this._animations).reduce((accum, [animName, animations]) => {
            // check to see if there's such Trait registered and if there is then
            // call it's animation method,
            // if not then use the level's total time as a progress for a animation
            // that is not connected to a Trait

            const trait = this[animName];
            if (trait) {
                let { tile, mirrored } = trait.animate(this, animations, level.getTotalTime());
                if (accum.tile === undefined) {
                    accum.tile = tile;
                }
                if (accum.mirrored === undefined) {
                    accum.mirrored = mirrored;
                }
            } else {
                throw new Error(`Unsupported standalone animation ${animName}`);
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
    update(rate, level) {
        this._traits.forEach(trait => trait.update(this, rate, level));

        // increase also the overall lifetime of the entity
        this._lifetime += rate;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {Level} level 
     */
    // eslint-disable-next-line no-unused-vars
    draw(context, level) {
        throw new Error("Each Entity should overwrite this abstract method");
    }

    finalize() {
        this._traits.forEach(trait => trait.finalize());
    }

    /**
     * Called when the entity was "obstructed" by a "ground" tile
     * @param {{tile:Tile, x1:Number, x2:Number, y1:Number, y2:Number}} obstacle
     * @param {Number} direction 
     */
    obstructedBy(obstacle, direction) {
        this._traits.forEach(trait => trait.obstructed(this, obstacle, direction));
    }

    /**
     * Called when the entity has "collided" with another entity.
     * @param {Entity} other 
     */
    collidedWith(other) {
        this._traits.forEach(trait => trait.collided(this, other));
    }

}

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

class TileResolver {
    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    constructor(tiles, tileSize) {
        this._tiles = tiles;
        this._tileSize = tileSize;
    }

    /**
     * @returns {Number}
     */
    getTileSize() {
        return this._tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this._tileSize);
    }

    toIndexRange(pos1, pos2) {
        // this method is axis agnostic
        const posMax = Math.ceil(pos2 / this._tileSize) * this._tileSize;

        const indexRange = [];
        let pos = pos1;
        do {
            indexRange.push(this.toIndex(pos));
            pos += this._tileSize;
        } while (pos < posMax);

        return indexRange;
    }

    getByIndex(indexX, indexY) {
        const tile = this._tiles.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * this._tileSize;
            const x2 = x1 + this._tileSize;
            const y1 = indexY * this._tileSize;
            const y2 = y1 + this._tileSize;
            return {
                tile, x1, x2, y1, y2
            };
        }
        return null;
    }

    getByPosition(posX, posY) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }

    getByRange(posX1, posX2, posY1, posY2) {
        const tiles = [];

        this.toIndexRange(posX1, posX2).forEach(indexX => {
            this.toIndexRange(posY1, posY2).forEach(indexY => {
                const tile = this.getByIndex(indexX, indexY);
                if (tile) {
                    tiles.push(tile);
                }
            });
        });

        return tiles;
    }

}

class TileCollider {
    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    constructor(tiles, tileSize) {
        this._tiles = new TileResolver(tiles, tileSize);
    }

    /**
     * @returns {TileResolver}
     */
    getTileResolver() {
        return this._tiles;
    }

    /**
     * @param {Entity} entity 
     */
    checkX(entity) {
        // this will optimise to search for collisions only on the borders of the entity
        // not also inside it as we don't need them
        let posX;
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

        const matches = this._tiles.getByRange(posX, posX,
            entity.bounds.top, entity.bounds.bottom);

        matches.forEach(match => {
            // check if collided with a ground
            if (match.tile.type !== 'ground') {
                return;
            }

            // check if the entity is going right
            if (entity.vel.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.obstructedBy(match, Entity.COLLIDE_RIGHT);
                }
            }
            // else if going left
            else if (entity.vel.x < 0) {
                if (entity.bounds.left < match.x2) {
                    entity.obstructedBy(match, Entity.COLLIDE_LEFT);
                }
            }
        });
    }

    /**
     * @param {Entity} entity 
     */
    checkY(entity) {
        let posY;
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

        const matches = this._tiles.getByRange(entity.bounds.left, entity.bounds.right,
            posY, posY);

        matches.forEach(match => {
            // check if collided with a ground
            if (match.tile.type !== 'ground') {
                return;
            }

            // check if the entity is going down (falling)
            if (entity.vel.y > 0) {
                if (entity.bounds.bottom > match.y1) {
                    entity.obstructedBy(match, Entity.COLLIDE_BOTTOM);
                }
            }
            // else if going up (jumping)
            else if (entity.vel.y < 0) {
                if (entity.bounds.top < match.y2) {
                    entity.obstructedBy(match, Entity.COLLIDE_TOP);
                }
            }
        });
    }
}

class EntityCollider {
    /**
     * 
     * @param {Set<Entity>} entities 
     */
    constructor(entities) {
        this._entities = entities;
    }

    /**
     * 
     * @param {Entity} entity 
     */
    check(entity) {
        this._entities.forEach(candidate => {
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

}

const PROPS_DEFAULT = { gravity: 0, time: 300 };

class Level {
    /**
     * 
     * @param {String} name 
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     * @param {{gravity:Number, time:Number, ...}} props 
     */
    constructor(name, tiles, tileSize, props = {}) {
        this.NAME = name;
        this._tileCollider = new TileCollider(tiles, tileSize);
        this._layerManager = new LayerManager();
        this._entities = new Set();

        this._entityCollider = new EntityCollider(this._entities);

        this._props = { ...PROPS_DEFAULT, ...props };

        // compute the width and height from the tiles and tileSize
        let maxX = 0, maxY = 0;
        tiles.forEach((x, y, tile) => {
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
    getTileCollider() {
        return this._tileCollider;
    }

    /**
     * 
     * @param {(progress: Entity)} callback 
     */
    forEachEntity(callback) {
        this._entities.forEach(entity => callback(entity));
    }

    /**
     * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
     */
    addLayer(layer) {
        this._layerManager.add(layer);
    }

    /**
     * @param {Entity} entity 
     */
    addEntity(entity) {
        this._entities.add(entity);
    }

    /**
     * @param {Entity} entity
     * @returns {Boolean} 
     */
    removeEntity(entity) {
        return this._entities.delete(entity);
    }

    /**
     * 
     * @param {Entity} entity
     * @returns {Boolean} 
     */
    hasEntity(entity) {
        return this._entities.has(entity);
    }

    getMario() {
        return [...this._entities].find(entity => entity.NAME === 'mario');
    }

    /**
     * 
     * @param {*} name 
     */
    getProp(name) {
        return this._props[name];
    }

    /**
     * @returns {Number}
     */
    getTotalTime() {
        return this._totalTime;
    }

    /**
     * @returns {Number}
     */
    getWidth() {
        return this._width;
    }

    /**
     * @returns {Number}
     */
    getHeight() {
        return this._height;
    }

    /**
     * @param {Number} rate 
     */
    update(rate) {
        this._entities.forEach(entity => {
            entity.update(rate, this);

            // add some gravity to all entities
            // NOTE !!! : applying the gravity SHOULD be after the tile collision check have been made
            if (this._props.gravity) {
                entity.vel.y += this._props.gravity * rate;
            }
        });

        // check if entities collide with each other
        // NOTE !!! : it SHOULD be after all entities have been passed through the first loop
        this._entities.forEach(entity => {
            this._entityCollider.check(entity);
        });

        // finally execute all queued tasks,
        // in order to avoid updates in from the traits depending on the order they are registered
        this._entities.forEach(entity => entity.finalize());

        this._totalTime += rate;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {View} view 
     */
    draw(context, view) {
        this._layerManager.draw(context, view);
    }

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
    const tileResolver = new TileResolver(tiles, tileSize);

    // create a static/cached background image buffer from the level's tiles
    const buffer = document.createElement('canvas');
    buffer.width = CONFIG.VIEW_WIDTH + tileSize;
    buffer.height = CONFIG.VIEW_HEIGHT;
    const bufferContext = buffer.getContext('2d');


    function redraw(indexStart, indexEnd) {
        bufferContext.clearRect(0, 0, buffer.width, buffer.height);
        for (let x = indexStart; x <= indexEnd; x++) {
            tiles.forEachInColumn(x, (x, y, tile) => {
                const tileName = tile.name;
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
        logDbg("Background layer");

        // redraw just the needed view an ONLY when needed
        const drawWidth = tileResolver.toIndex(view.size.x);
        const drawIndexStart = tileResolver.toIndex(view.pos.x);
        const drawIndexEnd = drawIndexStart + drawWidth;

        logDbg("Background layer redrawing");
        redraw(drawIndexStart, drawIndexEnd);

        context.drawImage(buffer, -view.pos.x % tileSize, -view.pos.y);
    };
}

/**
 * @param {Level} level 
 * @param {Number} maxEntityWidth 
 * @param {Number} maxEntityHeight
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function createEntitiesLayer(level, maxEntityWidth = 64, maxEntityHeight = 64) {
    // create a middle image buffer in which each entity will be drawn first
    const buffer = document.createElement('canvas');
    buffer.width = maxEntityWidth;
    buffer.height = maxEntityHeight;
    const bufferContext = buffer.getContext('2d');

    return function (context, view) {
        logDbg("Entities layer");

        const { x, y } = view.pos;
        level.forEachEntity(entity => {
            // draw the entity tile in the buffer image after it's been cleared
            bufferContext.clearRect(0, 0, maxEntityWidth, maxEntityHeight);
            entity.draw(bufferContext, level);

            // draw the buffer image in the main canvas
            context.drawImage(buffer, entity.pos.x - x, entity.pos.y - y);
        });
    };
}

function loadImage(name) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', () => reject(image));
        image.src = name;
    });
}

const loadJson = (url) => {
    return fetch(url).then(r => r.json());
};

function loadDataLevel(name) {
    return loadData(`levels/${name}`);
}

function loadData(name) {
    return loadJson(`data/${name}.json`);
}

class SpriteSheet {

    constructor(image, mirrored = false, tileWidth, tileHeight) {
        this._image = image;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;
        this._mirrored = mirrored;

        this._tiles = new Map();
        this._animations = new Map();
    }

    register(tile, x, y, width, height) {
        const mirrors = this._mirrored ? [false, true] : [false];

        const tileImages = mirrors.map(mirrored => {
            const tileImage = document.createElement('canvas');
            width = width || this._tileWidth;
            height = height || this._tileHeight;
            tileImage.width = width;
            tileImage.height = height;

            const tileImageCtx = tileImage.getContext('2d');

            // flip the image
            if (mirrored) {
                tileImageCtx.scale(-1, 1);
                tileImageCtx.translate(-width, 0);
            }

            tileImageCtx.drawImage(this._image,
                x, y,
                width, height,
                0, 0,
                width, height);
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

    registerTile(tile, indexX, indexY) {
        this.register(tile, indexX * this._tileWidth, indexY * this._tileHeight);
    }

    registerAnimation(tile, animation) {
        this._animations.set(tile, animation);
    }

    /**
     * @param {(animation:Function, name:String)=>void} callback 
     */
    forEachAnimation(callback) {
        this._animations.forEach(callback);
    }

    draw(tile, context, x, y, mirrored = false) {
        const tileImage = this._tiles.get(tile);
        if (tileImage) {
            let image = tileImage;
            if (this._mirrored) {
                // if sprites is mirror this means that 2 image tiles are registered for each name
                // so we have to draw the desired one
                image = tileImage[mirrored ? 1 : 0];
            }
            context.drawImage(image, x, y);

            return [image.width, image.height];
        }
        
        logWarn(`No tile set for ${tile}`);
        return [0, 0];
    }

    drawTile(tile, context, indexX, indexY, mirrored) {
        this.draw(tile, context, indexX * this._tileWidth, indexY * this._tileHeight, mirrored);
    }

    drawTileAnim(tile, context, indexX, indexY, progress, mirrored) {
        const animation = this._animations.get(tile);
        if (animation) {
            tile = animation(progress);
        } else {
            logWarn(`No animation set for ${tile}`);
        }
        this.draw(tile, context, indexX * this._tileWidth, indexY * this._tileHeight, mirrored);
    }

    isTileAnim(tile) {
        return this._animations.has(tile);
    }

}

function createAnimation(frames, frameRate = 5) {
    // the frameRate is used to reduce the 'progress' if needed as otherwise the frames
    // will be changing too fast

    if (frames instanceof Array) {
        // progress - this has various meanings depending on the context
        // it could be distance when walking
        // or simple time (seconds)
        return function (progress) {
            const frameIndex = Math.floor(progress / frameRate) % frames.length;
            return frames[frameIndex];
        };
    }

    // if just a single frame specified then return a "fixed" function
    return function (/*progress*/) {
        return frames;
    };

}

/**
 * @param {String} name 
 * @param {Boolean} mirrored
 * @returns {Promise<SpriteSheet>}
 */
function loadSprites(name, mirrored = false) {
    return loadData(`sprites/${name}`).
        then(spritesSpec => Promise.all([spritesSpec, loadImage(spritesSpec.spritesURL)])).
        then(([spritesSpec, spritesImage]) => {
            const sprites = new SpriteSheet(spritesImage, mirrored,
                spritesSpec.tileWidth, spritesSpec.tileHeight);

            spritesSpec.tiles.forEach(tileSpec => {
                // the specific tile's width and height are optional in the tileSpec
                // if missing then the global spritesSpec.tileWidth/spritesSpec.tileHeight will be used

                // a tile can be specified by index (when sprite is with fixed size grid)
                // or by pos and size (optional)
                const { name, index } = tileSpec;

                if (index) {
                    const [indexX, indexY] = index;
                    sprites.registerTile(name, indexX, indexY);
                } else {
                    // pos is obligatory then, but size is again optional
                    const [x, y] = tileSpec.pos;

                    let width, height;
                    if (tileSpec.size) {
                        width = tileSpec.size[0];
                        height = tileSpec.size[1];
                    }
                    sprites.register(name, x, y, width, height);
                }


            });

            // if defined animations for any tile
            if (spritesSpec.animations) {
                spritesSpec.animations.forEach(animSpec => {
                    const animation = createAnimation(animSpec.frames, animSpec.frameRate);
                    sprites.registerAnimation(animSpec.name, animation);
                });
            }

            return sprites;
        });
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield { x, y };
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);

    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);

    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
    throw new Error(`Unsupported range params length ${range.length}`);
}

function* expandRanges(ranges) {
    // for (const range of ranges) {
    //     for (const item of expandRange(range)) {
    //         yield item;
    //     }
    // }

    // this is the same but with Yield Delegation construct
    for (const range of ranges) {
        yield* expandRange(range);
    }
}


function* expandTiles(tiles, patterns) {

    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                // take in mind the 'offset'
                const realX = x + offsetX;
                const realY = y + offsetY;

                // check if want to draw a pattern (a block of predefined tiles)
                // e.g. like "little" backgrounds over the main
                const patternName = tile.pattern;
                if (patternName) {
                    const patternSpec = patterns[patternName];
                    if (patternSpec) {
                        // Note - patterns can have patterns - e.g. recursion
                        yield* walkTiles(patternSpec.tiles, realX, realY);
                    } else {
                        logWarn(`No pattern defined with name ${patternName}`);
                    }
                } else {
                    yield {
                        x: realX, y: realY, tile: new Tile(tile)
                    };
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
}

function createGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const { x, y, tile } of expandTiles(tiles, patterns)) {
        grid.set(x, y, tile);
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
        return loadDataLevel(name).
            then(levelSpec => Promise.all([levelSpec, loadSprites(levelSpec.sprites)])).
            then(([levelSpec, backgroundSprites]) => {
                // parse the level's background tiles, entities and other props
                const { layers, patterns, entities, props } = levelSpec;

                // TODO: tileSize should be get from the backgroundSprites.getWidth()/getHeight()
                const tileSize = 16;

                // create the main collision grid
                const mergedTiles = layers.reduce((mergedTiles, layerSpec) => {
                    return mergedTiles.concat(layerSpec.tiles);
                }, []);
                const grid = createGrid(mergedTiles, patterns);

                // create the level
                const level = new Level(name, grid, tileSize, props);

                // create all background layers - the drawing ones
                layers.forEach(layerSpec => {
                    const tiles = createGrid(layerSpec.tiles, patterns);
                    level.addLayer(createBackgroundLayer(level, tiles, tileSize, backgroundSprites));
                });


                // attach entities to the Level
                // Note that Mario will be additionally attached in 'main.js'
                entities.forEach(entitySpec => {
                    const { name, pos: [x, y] } = entitySpec;
                    const createEntity = entityFactory[name];
                    const entity = createEntity();
                    level.addEntity(entity);
                    entity.pos.set(x, y);
                });

                // create and add the entity layer
                level.addLayer(createEntitiesLayer(level));

                return level;
            });
    }
    return loadLevel;
}

class Trait {
    constructor(name, isBehavior = false) {
        this.NAME = name;
        this._isBehavior = isBehavior;
        this._queuedTasks = [];
    }

    finalize() {
        // perform each queued tasks
        this._queuedTasks.forEach(task => task());
        this._queuedTasks.length = 0;
    }

    /**
     * Queue up a task to be executed when the {@see finalize} method is called
     * @param {Function} task 
     */
    queueTask(task) {
        this._queuedTasks.push(task);
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} rate
     * @param {Level} level 
     */
    // eslint-disable-next-line no-unused-vars
    update(entity, rate, level) {
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
    animate(entity, animations, levelTotalTime) {
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
    obstructed(entity, obstacle, direction) {
        // keep empty , inheritors may overwrite it they need to
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Entity} otherEntity 
     */
    // eslint-disable-next-line no-unused-vars
    collided(entity, otherEntity) {
        // keep empty , inheritors may overwrite it they need to
    }
}

const DRAG_FACTOR_NORMAL = 1 / 1000;
const DRAG_FACTOR_TURBO = 1 / 5000;

class WalkTrait extends Trait {
    constructor(accelerate = true) {
        super('walk');

        this._accelerate = accelerate;

        this._direction = 0;

        // used if WalkTrait.IS_ACCELERATING is false
        this._velocity = 100;

        // used if WalkTrait.IS_ACCELERATING is true
        this._acceleration = 400;
        this._deacceleration = 300;
        this._dragFactor = DRAG_FACTOR_NORMAL;

        // the distance "walked" when in single "walking" phase
        this._distance = 0;

        // by default let the heading (last direction) be right
        this._heading = 1;
    }

    /**
     * @returns {Number}
     */
    get direction() {
        return this._direction;
    }

    /**
     * @returns {Number}
     */
    get distance() {
        return this._distance;
    }

    /**
     * The direction to where the entity is heading - "left or right" of course
     * @returns {Number}
     */
    get heading() {
        return this._heading;
    }

    /**
     * Starts or stops moving left
     * @param {boolean} startAction 
     */
    left(startAction) {
        this._direction += startAction ? -1 : 1;
    }

    /**
     * Starts or stops moving right
     * @param {boolean} startAction 
     */
    right(startAction) {
        this._direction += startAction ? 1 : -1;
    }

    /**
     * Starts or stops "turbo" (faster running)
     * @param {boolean} startAction 
     */
    turbo(startAction) {
        this._dragFactor = startAction ? DRAG_FACTOR_TURBO : DRAG_FACTOR_NORMAL;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate) {
        // update just the 'x' coordinate of the velocity/acceleration
        if (this._accelerate) {
            this._updateAcceleration(entity, rate);
        } else {
            this._updateConstantVelocity(entity, rate);
        }
    }

    _updateConstantVelocity(entity, rate) {
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

    _updateAcceleration(entity, rate) {
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
            const deaccel = Math.min(Math.abs(entity.vel.x), this._deacceleration * rate);
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
            const drag = this._dragFactor * entity.vel.x * Math.abs(entity.vel.x);
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
    animate(entity, animations, levelTotalTime) {
        let tile;
        if (this.distance > 0) {
            if ((entity.vel.x > 0 && this.direction < 0) ||
                (entity.vel.x < 0 && this.direction > 0)) {
                // when "breaking" - e.g. changing the direction

                // use the 'break' animation
                const animation = animations.get('break');
                if (animation) {
                    tile = animation(levelTotalTime);
                }
            } else {
                // use main animation - it for sure exists
                const animation = animations.get(this.NAME);
                tile = animation(this.distance);
            }
        }
        const mirrored = this.heading < 0;

        return { tile, mirrored };

    }

}

class JumpTrait extends Trait {
    constructor() {
        super('jump');

        this._duration = 0.3;
        this._velocity = 200;
        this._engagedTime = 0;

        // state to indicate whether we can jump - it can only from when touched a 'ground'
        // this means that there will be needed a 2 step-update in order to animate
        this._ready = 0;

        // allow a grace time in which we can jump, e.g.
        // next jump can occur while falling and start
        // is pressed when very close to the ground (allow a grace period)
        this._requestTime = 0;
        this._gracePeriod = 0.2; // seconds

        // the faster we walk/run the higher the jump
        this._speedBoost = 0.3;
    }

    /**
     * @returns {boolean}
     */
    get falling() {
        return this._ready < 0;
    }

    start() {
        this._requestTime = this._gracePeriod;
    }

    cancel() {
        this._engagedTime = 0;
        this._requestTime = 0;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate) {
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

    obstructed(entity, obstacle, direction) {
        switch (direction) {
            case Entity.COLLIDE_BOTTOM:
                // make ready to jump
                this._ready = 1;
                break;
            case Entity.COLLIDE_TOP:
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
    animate(entity, animations, levelTotalTime) {
        let tile;

        // catch the case when jumping
        if (this.falling) {
            // get the main animation - it for sure exists
            const animation = animations.get(this.NAME);
            tile = animation(levelTotalTime);
        }

        return { tile };
    }
}

class BePhysicsTrait extends Trait {
    constructor(gravity = 1500) {
        super('physics');

        this._gravity = gravity;
        this._enabled = true;
    }

    disable() {
        this._enabled = false;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate, level) {
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

}

class BeSolidTrait extends Trait {
    constructor() {
        super('solid', true);

        this._enabled = true;
    }

    disable() {
        this._enabled = false;
    }

    obstructed(entity, obstacle, direction) {
        if (!this._enabled) {
            return;
        }

        switch (direction) {
            case Entity.COLLIDE_BOTTOM:
                entity.bounds.bottom = obstacle.y1;
                entity.vel.y = 0;
                break;
            case Entity.COLLIDE_TOP:
                entity.bounds.top = obstacle.y2;
                entity.vel.y = 0;
                break;
            case Entity.COLLIDE_RIGHT:
                entity.bounds.right = obstacle.x1;
                entity.vel.x = 0;
                break;
            case Entity.COLLIDE_LEFT:
                entity.bounds.left = obstacle.x2;
                entity.vel.x = 0;
                break;
        }
    }

}

class BeStomperTrait extends Trait {
    constructor() {
        super('stomper', true);

        this._bounceVelocity = 400;

        /**
         * @param {Function[]}
         */
        this._stompListeners = [];
    }

    /**
     * 
     * @param {Function} callback 
     */
    addListener(callback) {
        this._stompListeners.push(callback);
    }

    /**
     * @param {Entity} us 
     * @param {Entity} otherEntity 
     */
    collided(us, otherEntity) {
        if (!otherEntity.killable || otherEntity.killable.dead) {
            return;
        }

        if (us.pos.y < otherEntity.pos.y) {
            this.onStomp(us, otherEntity);
            this._stompListeners.forEach(callback => callback(us, otherEntity));
        }
    }

    /**
     * @param {Entity} us 
     * @param {Entity} otherEntity 
     */
    onStomp(us, otherEntity) {
        // go to the top of the other entity, not to collide agin with it on the next check
        us.bounds.bottom = otherEntity.bounds.top;

        // make the stomper bounce
        us.vel.y = -this._bounceVelocity;
    }

}

class BeKillableTrait extends Trait {
    /**
     * 
     * @param {Number} deadTimeRemove 2 seconds by default
     */
    constructor(deadTimeRemove = 2) {
        super('killable', true);
        this._dead = false;
        this._deadTimeRemove = deadTimeRemove;

        this._deadTime = 0;
    }

    get dead() {
        return this._dead;
    }

    kill() {
        this.queueTask(() => { 
            this._dead = true; 
        });
    }

    revive() {
        this.queueTask(() => {
            this._dead = false;
            this._deadTime = 0;
        });
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate, level) {
        // keep the entity for a while and then remove it from the level
        if (this._dead) {
            this._deadTime += rate;

            if (this._deadTime >= this._deadTimeRemove) {
                this.queueTask(() => {
                    level.removeEntity(entity);
                });
            }
        }
    }

}

/**
 * Common utility function that will be used when creating each entity.
 * It creates a 'draw' method that will be attached to each entity.
 * @param {SpriteSheet} sprites 
 * @param {String} defaultTile 
 */
function createDraw(sprites, defaultTile) {

    // the real draw function that will bve attached the entities
    return function draw(context, level) {
        const { tile, mirrored } = this.animate(level);
        // if no tile to animate then draw the default "idle" one,
        // tileSize is array with [width, height]
        const tileSize = sprites.draw(tile || defaultTile, context, 0, 0, mirrored);

        // TODO: The drawn tile size is not necessary the "real" size of the entity
        // set the size of the entity to the size of the real drawn tile
        // this.size.set(...tileSize);
    };

}

// loadMario() will be async
function loadMario() {
    return loadSprites('mario', true).
        then(createMarioFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createMarioFactory(sprites) {
    // moved all the support/stateless functionality out of the createMario scope
    // as they are needed to be created only ones 

    // create the draw method - common/static/stateless for all Goomba entities
    const draw = createDraw(sprites, 'idle');

    // createMario() will be synchronous
    return function mario() {
        const entity = new Entity('mario');
        entity.size.set(14, 16);

        entity.registerTrait(new BePhysicsTrait());
        entity.registerTrait(new BeSolidTrait());
        entity.registerTrait(new BeStomperTrait());
        entity.registerTrait(new BeKillableTrait(0));
        entity.registerTrait(new WalkTrait());
        entity.registerTrait(new JumpTrait());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

class WanderTrait extends Trait {
    constructor(velocity = -30, panicVelocity = 90) {
        super('wander');
        if (velocity === 0) {
            throw new Error('Cannot have wander trait with 0 velocity');
        }

        this._paused = false;

        this._velocity = velocity;
        this._panicVelocity = Math.abs(panicVelocity); // prevent if passed negative number

        // the distance "walked" when in single "walking" phase
        this._distance = 0;
    }

    /**
    * @returns {Number}
    */
    get velocity() {
        return this._velocity;
    }

    /**
     * @param {Number} velocity
     */
    set velocity(velocity) {
        this._velocity = velocity;
    }

    /**
     * @returns {Number}
     */
    get distance() {
        return this._distance;
    }

    /**
     * @param {Boolean} paused 
     */
    pause(paused = true) {
        this._paused = paused;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate) {
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
    animate(entity, animations) {
        let tile;
        if (this.distance > 0) {
            // use main animation - it for sure exists
            const animation = animations.get(this.NAME);
            tile = animation(entity.lifetime);
        }

        return { tile, mirrored: entity.vel.x < 0 };
    }

    obstructed(entity, obstacle, direction) {
        switch (direction) {
            case Entity.COLLIDE_LEFT:
            case Entity.COLLIDE_RIGHT:
                this._distance = 0;
                this._velocity = -this._velocity;
                break;
        }
    }
}

function loadGoomba() {
    return loadSprites('goomba', true).
        then(createGoombaFactory);
}


/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createGoombaFactory(sprites) {

    // create the draw method - common/static/stateless for all Goomba entities
    const defDraw = createDraw(sprites, 'walk-1');
    const draw = function (context, level) {
        if (this.killable.dead) {
            sprites.draw('flat', context, 0, 0);
            return;
        }
        defDraw.call(this, context, level);
    };

    return function goomba() {
        const entity = new Entity('goomba');
        entity.size.set(16, 16);

        entity.registerTrait(new Behavior());
        entity.registerTrait(new BePhysicsTrait());
        entity.registerTrait(new BeSolidTrait());
        entity.registerTrait(new BeKillableTrait());
        entity.registerTrait(new WanderTrait());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

class Behavior extends Trait {
    constructor() {
        super('behavior', true);
    }

    collided(goomba, otherEntity) {
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

}

function loadKoopa() {
    return loadSprites('koopa', true).
        then(createKoopaFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createKoopaFactory(sprites) {

    // create the draw method - common/static/stateless for all Koopa entities
    const draw = createDraw(sprites, 'walk-1');

    return function koopa() {
        const entity = new Entity('koopa');
        entity.size.set(16, 16);
        entity.offset.y = 8;

        entity.registerTrait(new Behavior$1());
        entity.registerTrait(new BePhysicsTrait());
        entity.registerTrait(new BeSolidTrait());
        entity.registerTrait(new BeKillableTrait());
        entity.registerTrait(new WanderTrait(30));

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

const STATE_WALKING = Symbol();
const STATE_HIDING = Symbol();
const STATE_PANICING = Symbol();

class Behavior$1 extends Trait {
    constructor() {
        super('behavior', true);

        this._unhideTime = 5;
        this._hidingTime = 0;

        this._panicVelocity = 300;
        this._wanderVelocity = null;

        this._state = STATE_WALKING;
    }

    /**
     * @returns {Boolean}
     */
    get hiding() {
        return this._state === STATE_HIDING ||
            this._state === STATE_PANICING;
    }

    _hide(koopa) {
        koopa.vel.x = 0;
        koopa.wander.pause();
        if (this._wanderVelocity === null) {
            this._wanderVelocity = koopa.wander.velocity;
        }

        this._state = STATE_HIDING;
        this._hidingTime = 0;
    }

    _unhide(koopa) {
        koopa.wander.pause(false);
        if (this._wanderVelocity !== null) {
            koopa.wander.velocity = this._wanderVelocity;
        }
        this._state = STATE_WALKING;
    }

    _handleStopm(koopa, otherEntity) {
        if (this._state === STATE_WALKING ||
            this._state === STATE_PANICING) {
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

    _handleNudge(koopa, otherEntity) {
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

    collided(koopa, otherEntity) {
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

    update(koopa, rate) {
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
    animate(entity, animations) {
        let tile = this.hiding ? 'hiding' : undefined;
        if (this._state === STATE_HIDING) {
            if (this._hidingTime > 3) {
                // use 'wake' animation - it for sure exists
                const animation = animations.get('wake');
                if (animation) {
                    tile = animation(this._hidingTime);
                }
            }
        }

        return { tile };
    }

}

function loadEntities() {

    // the aim is to have mfactory methods like:
    // entityFactory.mario()
    // entityFactory.goomba()
    // entityFactory.koopa()

    // I. simple version relying on the fact that each 'loadXXX' 
    // that resolves to a factory function that is named
    // specifically like this: "mari/goomba/koopa/...."
    const entityFactory = {};
    return Promise.all([loadMario(), loadGoomba(), loadKoopa()]).
        then(factories => {
            factories.forEach(factory => entityFactory[factory.name] = factory);

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

class Font {

    /**
     * 
     * @param {SpriteSheet} sprites 
     * @param {Number} lineHeight 
     */
    constructor(sprites, lineHeight) {
        this._sprites = sprites;
        this._lineHeight = lineHeight;
    }

    /**
     * @returns {Number}
     */
    get lineHeight() {
        return this._lineHeight;
    }

    /**
     * 
     * @param {Sting} text 
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} x 
     * @param {Number} y 
     */
    print(text, context, x, y) {
        let offsetX = 0;
        for (let char of text) {
            const [charWidth] = this._sprites.draw(char, context, x + offsetX, y);
            offsetX += charWidth;
        }
    }

}

const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const CHAR_SIZE = 8;

/**
 * @returns {Promise<Font>}
 */
function loadFont() {
    return loadImage('img/font.png')
        .then(image => {
            const fontSprite = new SpriteSheet(image, false, CHAR_SIZE, CHAR_SIZE);
            const rowLen = image.width;

            // register all characters ()
            for (let [index, char] of [...CHARS].entries()) {
                const x = (index * CHAR_SIZE) % rowLen;
                const y = Math.floor(index * CHAR_SIZE / rowLen) * CHAR_SIZE;
                fontSprite.register(char, x, y);
            }

            return new Font(fontSprite, CHAR_SIZE);
        });
}

function pad(number, len = 6) {
    return ('' + Math.floor(number)).padStart(len, '0');
}

/**
 * @param {Font} font
 * @param {Entity} playerEnv 
 * @param {Level} level 
 * @returns {(context: CanvasRenderingContext2D) => void} 
 */
function createDashboardLayer(font, playerEnv, level) {

    const LINE1 = font.lineHeight;
    const LINE2 = font.lineHeight * 2;

    /**
     * @param {CanvasRenderingContext2D} context
     */
    return function (context) {
        logDbg("Dashboard layer");

        const { score, coins, remainTime } = playerEnv.control;

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

class BePlayerControlTrait extends Trait {
    /**
     * @param {Entity} player
     * @param {Number} playerTime
     */
    constructor(player, playerTime = -1) {
        super('control', true);

        this._player = player;
        this._checkpoint = this._player.pos.clone();

        this._playerTime = playerTime;
        this._remainTime = this._playerTime;
        this._timeSpeed = 2;

        this._score = 0;
        this._coins = 0;

        // add a stomper listener
        this._player.stomper.addListener(() => this._score += 100);
    }

    /**
     * @returns {Number}
     */
    get score() {
        return this._score;
    }

    /**
     * @returns {Number}
     */
    get coins() {
        return this._coins;
    }

    /**
     * @returns {Number}
     */
    get remainTime() {
        return this._remainTime;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate, level) {
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

}

// FIXME: temporary this is here
/**
 * 
 * @param {Entity} player 
 * @param {Level} level
 * @returns {Entity}
 */
function createPlayerEnvironment(player, level) {
    // create a fictitious entity
    const playerEnv = new Entity();
    playerEnv.draw = () => { };
    playerEnv.registerTrait(new BePlayerControlTrait(player, level.getProp('time')));
    level.addEntity(playerEnv);
    return playerEnv;
}

async function main(canvas) {
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;

    const keyboardManager = new KeyboardManager();

    const entityFactory = await loadEntities();
    const loadLevel = createLoadLevel(entityFactory);
    const level = await loadLevel('1_1');

    const view = new View(CONFIG.VIEW_WIDTH, CONFIG.VIEW_HEIGHT);

    const mario = level.getMario();

    // setup the keyboard actions for Mario
    // adn start the keyboard manager
    setupMarioKeyboard(mario, keyboardManager);
    keyboardManager.start(window);

    // FIXME: temporary this is here
    const playerEnv = createPlayerEnvironment(mario, level);

    const font = await loadFont();
    level.addLayer(createDashboardLayer(font, playerEnv, level));

    const timer = new Timer(CONFIG.RATE);
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
}

const canvas = document.getElementById('screen');
main(canvas);
//# sourceMappingURL=bundle.mjs.map
