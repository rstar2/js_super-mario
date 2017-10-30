import Entity from '../Entity.js';
import Walk from '../traits/Walk.js';
import Jump from '../traits/Jump.js';
import { loadSprites } from '../sprites.js';

// loadMario() will be async
/**
 * @param {String} entitiesName 
 */
export function loadMario(entitiesName) {
    return loadSprites(entitiesName, true).
        then(createMarioFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createMarioFactory(sprites) {
    // moved all the support/stateless functionality out of the createMario scope
    // as they are needed to be created only ones 

    function draw(context, level) {
        const { tile, mirrored } = this.animate(level);
        // if no tile to animate then draw the default "idle" one,
        // tileSize is array with [width, height]
        const tileSize = sprites.draw(tile || 'idle', context, 0, 0, mirrored);

        // set the size of the entity to the size of the real drawn tile
        this.size.set(...tileSize);
    }

    // createMario() will be synchronous
    return function createMario() {
        const mario = new Entity();

        mario.registerTrait(new Walk());
        mario.registerTrait(new Jump());

        sprites.forEachAnimation((animation, name) => {
            mario.registerAnimation(name, animation);
        });

        mario.draw = draw;

        return mario;
    };
}