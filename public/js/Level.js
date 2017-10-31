import * as logger from './logger.js';
import Entity from './Entity.js';
import LayerManager from './LayerManager.js';
import Tile from './Tile.js';
import TileCollider from './TileCollider.js';
import { Matrix } from './math.js';
import { loadLevel as _loadLevel } from './utils.js';
import { loadSprites } from './sprites.js';
import { createBackgroundLayer, createEntitiesLayer } from './layers.js';


export default class Level {
    /**
     * 
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     * @param {{gravity:Number}} param2 
     */
    constructor(tiles, tileSize, { gravity = 2000 }) {
        this._tileCollider = new TileCollider(tiles, tileSize);
        this._layerManager = new LayerManager();
        this._entities = new Set();


        // the gravity should be on the level - thus applied to all entities
        this._gavity = gravity;

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
     * 
     * @param {Entity} entity 
     */
    addEntity(entity) {
        this._entities.add(entity);
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
     * @returns {Number}
     */
    getGravity() {
        return this._gravity;
    }

    /**
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
     * @param {CanvasRenderingContext2D} context 
     * @param {View} view 
     */
    draw(context, view) {
        this._layerManager.draw(context, view);
    }

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
    throw new Error(`Unsupported range params legnth ${range.length}`);
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        for (const item of expandRange(range)) {
            yield item;
        }
    }
}


function expandTiles(tiles, patterns) {
    const expandedTiles = [];
    function walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                // take in mind the 'offset'
                const realX = x + offsetX;
                const realY = y + offsetY;

                // check if want to draw a pattern (a block of predifined tiles)
                // e.g. like "little" backgrounds over the main
                const patternName = tile.pattern;
                if (patternName) {
                    const patternSpec = patterns[patternName];
                    if (patternSpec) {
                        // Note - patterns can have patterns - e.g. recursion
                        walkTiles(patternSpec.tiles, realX, realY);
                    } else {
                        logger.logWarn(`No pattern defined with name ${patternName}`);
                    }
                } else {
                    expandedTiles.push({
                        x: realX, y: realY, tile: new Tile(tile)
                    });
                }
            }
        }
    }

    walkTiles(tiles, 0, 0);

    return expandedTiles;
}

function createGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const { x, y, tile } of expandTiles(tiles, patterns)) {
        grid.set(x, y, tile);
    }

    return grid;
}

export function loadLevel(levelName) {
    return _loadLevel(levelName).
        then(levelSpec => Promise.all([levelSpec, loadSprites(levelSpec.sprites),])).
        then(([levelSpec, backgroundSprites]) => {
            // parse the level's background tiles, entities and other props
            const { layers, patterns, entities, props } = levelSpec;

            // TODO: tileSize should be get from the backgroundSprites.getWidth()/getHeight()
            const tileSize = 16;

            // create the main collision grid
            const mergedTiles = layers.reduce((mergedTiles, layerSpec) => {
                return mergedTiles.concat(layerSpec.tiles);
            }, []);
            const gridCollision = createGrid(mergedTiles, patterns);

            // create the level
            const level = new Level(gridCollision, tileSize, props);

            // create all background layers - the drawing ones
            layers.forEach(layerSpec => {
                const grid = createGrid(layerSpec.tiles, patterns);
                level.addLayer(createBackgroundLayer(level, grid, tileSize, backgroundSprites));
            });


            // attach entities to the Level
            // Note that Mario will be additioanlly attached in 'main.js'
            // eslint-disable-next-line no-unused-vars
            entities.forEach(entity => {
                const e = new Entity();
                level.addEntity(e);
            });

            // creaate and add the entity layer
            level.addLayer(createEntitiesLayer(level));

            return level;
        });
}