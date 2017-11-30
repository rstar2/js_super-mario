import * as logger from '../logger.js';
import Tile from '../Tile.js';
import Entity from '../Entity.js';
import Level from '../Level.js';
import { Matrix } from '../math.js';
import { createBackgroundLayer } from '../layers/background.js';
import { createEntitiesLayer } from '../layers/entities.js';
import { loadDataLevel } from './utils.js';
import { loadSprites } from './sprites.js';

import BeControl from '../traits/BeControl.js';

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
                        logger.logWarn(`No pattern defined with name ${patternName}`);
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
export function createLoadLevel(entityFactory) {
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
                const gridCollision = createGrid(mergedTiles, patterns);

                // create the level
                const level = new Level(gridCollision, tileSize, props);

                // create all background layers - the drawing ones
                layers.forEach(layerSpec => {
                    const grid = createGrid(layerSpec.tiles, patterns);
                    level.addLayer(createBackgroundLayer(level, grid, tileSize, backgroundSprites));
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

                createEntityControllable(level.getMario(), level);

                return level;
            });
    }
    return loadLevel;
}

// FIXME: temporary this is here
function createEntityControllable(controllable, level) {
    // create a fictitious entity
    const control = new Entity();
    control.draw = () => { };
    control.registerTrait(new BeControl(controllable));
    level.addEntity(control);
}