import Entity from '../Entity.js';
import Walk from '../traits/Walk.js';
import { loadSprites } from '../sprites.js';

/**
 * @param {String} entitiesName 
 * @param {String} marioName 
 */
export function loadGoomba(entitiesName) {
    return loadSprites(entitiesName, true).
        then(sprites => {
            const createMario = createGoombaFactory(sprites);
            // return a synchronous create function
            return createMario;
        });
}

/**
 * @param {SpriteSheet} sprites 
 */
function createGoombaFactory(sprites) {
    function draw(context, level) {
        const { tile, mirrored } = this.animate(level);
        // if no tile to animate then draw the default "idle" one,
        // tileSize is array with [width, height]
        const tileSize = sprites.draw(tile || 'walk-1', context, 0, 0, mirrored);

        // set the size of the entity to the size of the real drawn tile
        this.size.set(...tileSize);
    }

    return function createGoomba() {
        const goomba = new Entity();

        goomba.draw = draw;

        return goomba;
    };
}