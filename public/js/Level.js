import Entity from './Entity.js';
import LayerManager from './LayerManager.js';
import TileCollider from './TileCollider.js';
import { Matrix } from './math.js';
import { loadLevel as _loadLevel } from './utils.js';
import { loadSprites } from './sprites.js';
import { createBackgroundLayer, createEntitiesLayer } from './layers.js';


export default class Level {
    constructor(tiles, tileSize, { gravity = 2000, marioPos = [10, 0] }) {
        this._tiles = tiles;
        this._layerManager = new LayerManager();
        this._entities = new Set();
        this._tileCollider = new TileCollider(this._tiles, tileSize);

        // the gravity should be on the level - thus applied to all entities
        this._gavity = gravity;
        this._marioPos = marioPos;

        // compute the width and height from the tiles and tileSize
        let maxX = 0, maxY = 0;
        this.forEachTile((x, y) => {
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        });
        this._width = maxX * tileSize;
        this._height = maxY * tileSize;

        this._totalTime = 0;
    }

    /**
     * 
     * @param {Function} callback 
     */
    forEachTile(callback) {
        this._tiles.forEach(callback);
    }

    /**
     * @param {Number} x
     * @param {Function} callback 
     */
    forEachTileInColumn(x, callback) {
        this._tiles.forEachInColumn(x, callback);
    }

    /**
     * 
     * @param {Function} callback 
     */
    forEachEntity(callback) {
        this._entities.forEach(entity => callback(entity));
    }

    /**
     * 
     * @param {Function} layer 
     */
    addLayer(layer) {
        this._layerManager.add(layer);
    }

    /**
     * 
     * @param {Entity} entity 
     */
    addEntity(entity) {
        this._entities.add(entity);
    }

    /**
     * Utility method to do all all 'Mario' related stuff in one place.
     * @param {Entity} mario 
     */
    addMario(mario) {
        this.addEntity(mario);

        // set Mario's initial pos depending on the level
        mario.pos.set(...this._marioPos);
    }

    /**
     * @returns {Number}
     */
    getTotalTime() {
        return this._totalTime;
    }

    /**
     * @returns {TileCollider}
     */
    getTileCollider() {
        return this._tileCollider;
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
     * @returns {Number}
     */
    getGravity() {
        return this._gravity;
    }

    /**
     * 
     * @param {Number} rate 
     */
    update(rate) {
        this._entities.forEach(entity => {
            entity.update(rate);

            // NOTE !!! : the x an y positions SHOULD be updated separately
            // before checking for collisions 
            entity.pos.x += entity.vel.x * rate;
            this._tileCollider.checkX(entity);
            entity.pos.y += entity.vel.y * rate;
            this._tileCollider.checkY(entity);

            // add some gravity to all entities
            // Note - it should be added finally after the tile-collision checks
            entity.vel.y += this._gavity * rate;
        });

        this._totalTime += rate;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {View} view 
     */
    draw(context, view) {
        this._layerManager.draw(context, view);
    }

}

export class Tile {
    constructor(tileSpec) {
        this._name = tileSpec.tile;
        this._type = tileSpec.type;
    }

    /**
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    /**
     * @returns {String}
     */
    get type() {
        return this._type;
    }
}

function createTiles(backgrounds) {
    const tiles = new Matrix();

    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {
                tiles.set(x, y, new Tile(background));
            }
        }
    }

    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);

            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1);

            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            }
        });
    });

    return tiles;
}

export function loadLevel(levelName) {
    return _loadLevel(levelName).
        then(levelSpec => Promise.all([levelSpec, loadSprites(levelSpec.sprites),])).
        then(([levelSpec, backgroundSprites]) => {
            // parse the level's background tiles, entities and other props
            const { backgrounds, entities, props } = levelSpec;

            // create the tiles grid
            const tiles = createTiles(backgrounds);

            // create the level
            // TODO: tileSize should be get from the backgroundSprites.getWidth()/getHeight()
            const level = new Level(tiles, 16, props);

            // attach entities to the Level
            // Note that Mario will be additioanlly attached in 'main.js'
            // eslint-disable-next-line no-unused-vars
            entities.forEach(entity => {
                const e = new Entity();
                level.addEntity(e);
            });

            level.addLayer(createBackgroundLayer(level, backgroundSprites));
            level.addLayer(createEntitiesLayer(level));

            return level;
        });
}