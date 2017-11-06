import Entity from '../Entity.js';
import Wander from '../traits/Wander.js';
import { loadSprites } from '../sprites.js';
import { createDraw } from './utils.js';

export function loadKoopa() {
    return loadSprites('koopa', true).
        then(createKoopaFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createKoopaFactory(sprites) {

    // create th draw method - common/static/stateless for all Koopa entities
    const draw = createDraw(sprites, 'walk-1');

    return function koopa() {
        const entity = new Entity();
        entity.size.set(16, 16);
        entity.offset.y = 8;

        entity.registerTrait(new Wander(30));

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}