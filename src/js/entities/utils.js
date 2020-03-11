import { loadSprites } from '../loaders/sprites.js';
import { loadSounds } from '../loaders/sounds.js';

/**
 * Common utility function that will be used when creating each entity.
 * It creates a 'draw' method that will be attached to each entity.
 * @param {SpriteSheet} sprites 
 * @param {String} defaultTile 
 */
export function createDraw(sprites, defaultTile) {

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

/**
 * 
 * @param {String} name
 * @param {AudioContext} audioContext
 * @param {{[factory]: Function}} entityFactories
 * @return {Promise<{sprites: SpriteSheet, audioBoard: AudioBoard, entityFactories: {[factory]: Function}}>}
 */
export function loadEntity(name, audioContext, entityFactories) {
    return Promise.all([loadSprites(name, true), loadSounds(name, audioContext)]).
        then(([sprites, audioBoard]) => ({sprites, audioBoard, entityFactories}));
        
}