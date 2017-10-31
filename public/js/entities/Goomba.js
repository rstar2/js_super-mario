import Entity from '../Entity.js';
import Wander from '../traits/Wander.js';
import { loadSprites } from '../sprites.js';
import { createDraw } from './utils.js';

export function loadGoomba() {
    return loadSprites('goomba', true).
        then(createGoombaFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createGoombaFactory(sprites) {

    // create th draw method - common/static/stateless for all Goomba entities
    const draw = createDraw(sprites, 'walk-1');

    return function createGoomba() {
        const entity = new Entity();
        entity.size.set(16, 16);

        entity.registerTrait(new Wander());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}