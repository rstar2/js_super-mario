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

    return function createKoopa() {
        const entity = new Entity();

        entity.registerTrait(new Wander());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}