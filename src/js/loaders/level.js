import * as logger from '../logger.js';
import { Tile } from '../tiles/Tile.js';
import { Level } from '../Level.js';
import { Matrix } from '../math.js';
import { createBackgroundLayer } from '../layers/background.js';
import { createEntitiesLayer } from '../layers/entities.js';
import { loadDataLevel, loadDataPatterns } from './utils.js';
import { loadSprites } from './sprites.js';
import { loadMusic } from './music.js';
import { MusicController } from '../MusicController.js';
import { Entity } from '../Entity.js';
import { BeLevelTimerTrait as LevelTimer } from '../traits/BeLevelTimer.js';
import { TriggerTrait } from '../traits/Trigger.js';

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

/**
 * @param {Level} level
 */
function setupLevel(level) {
    // create a "Level Entity" that will control the music and etc...
    const levelEntity = new Entity('level', null, false);
    levelEntity.registerTrait(new LevelTimer(level.getProp("time")));
    
    level.addEntity(levelEntity);
}

/**
 * @param {Level} level
 * @param {MusicController} musicPlayer
 */
function setupMusic(level, musicPlayer) {
    level.setMusicController(new MusicController(musicPlayer));

    // start the music
    level.addListener(LevelTimer.EVENT_TIMER_OK, () => {
        level.getMusicController().playThemeMain();
    });
    level.addListener(LevelTimer.EVENT_TIMER_HURRY, () => {
        level.getMusicController().playThemeHurry();
    });
}

/**
 * @param {Level} level
 * @param {[]} triggerSpecs
 */
function setupTriggers(level, triggerSpecs) {
    for (const triggerSpec of triggerSpecs) {
        
        const triggerTrait = new TriggerTrait();

        triggerTrait.addTrigger((entity, touches) => {
            level.emit(Level.EVENT_TRIGGER, triggerSpec, entity, touches);
        });

        const triggerEntity = new Entity('trigger', null, false);
        level.addEntity(triggerEntity);

        triggerEntity.registerTrait(triggerTrait);
        triggerEntity.pos.set(triggerSpec.pos[0], triggerSpec.pos[1]);

        // TODO - set in triggerSpec
        triggerEntity.size.set(64, 64);
    }
    
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
            then(levelSpec => Promise.all([levelSpec, loadDataPatterns(levelSpec.patterns),
                loadSprites(levelSpec.sprites), loadMusic(levelSpec.music)])).
            then(([levelSpec, patterns, sprites, musicPlayer]) => {
                // parse the level's background tiles, entities and other props
                const { layers, entities, props, triggers } = levelSpec;

                // TODO: tileSize should be get from the backgroundSprites.getWidth()/getHeight()
                const tileSize = 16;

                // calculate properly the width and height of the level
                // create the main collision grid
                const mergedTiles = layers.reduce((mergedTiles, layerSpec) => {
                    return mergedTiles.concat(layerSpec.tiles);
                }, []);
                const grid = createGrid(mergedTiles, patterns);
                // compute the width and height from the tiles and tileSize
                let maxX = 0, maxY = 0;
                grid.forEach((x, y) => {
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                });

                // create the level
                const level = new Level(name, maxX * tileSize, maxY * tileSize, props);
                
                // create all background layers - the drawing ones
                layers.forEach(layerSpec => {
                    const tilesGrid = createGrid(layerSpec.tiles, patterns);
                    level.addLayer(createBackgroundLayer(level, tilesGrid, tileSize, sprites));
                    level.getTileCollider().addTilesGrid(tilesGrid, tileSize);
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


                if (triggers) {
                    setupTriggers(level, triggers);
                }

                // create and add the entity layer
                level.addLayer(createEntitiesLayer(level));

                setupLevel(level);

                setupMusic(level, musicPlayer);

                return level;
            });
    }
    return loadLevel;
}