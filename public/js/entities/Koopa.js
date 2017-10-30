import Entity from '../Entity.js';
import Wander from '../traits/Wander.js';
import { loadSprites } from '../sprites.js';

/**
 * @param {String} entitiesName 
 */
export function loadKoopa(entitiesName) {
    return loadSprites(entitiesName, true).
        then(createKoopaFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createKoopaFactory(sprites) {
    function draw(context, level) {
        const { tile, mirrored } = this.animate(level);
        // if no tile to animate then draw the default "idle" one,
        // tileSize is array with [width, height]
        const tileSize = sprites.draw(tile || 'walk-1', context, 0, 0, mirrored);

        // set the size of the entity to the size of the real drawn tile
        this.size.set(...tileSize);
    }

    return function createKoopa() {
        const goomba = new Entity();

        goomba.registerTrait(new Wander());

        sprites.forEachAnimation((animation, name) => {
            goomba.registerAnimation(name, animation);
        });

        goomba.draw = draw;

        return goomba;
    };
}