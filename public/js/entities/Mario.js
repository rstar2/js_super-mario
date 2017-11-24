import Entity from '../Entity.js';
import Walk from '../traits/Walk.js';
import Jump from '../traits/Jump.js';
import BeStomper from '../traits/BeStomper.js';
import BeKillable from '../traits/BeKillable.js';
import { loadSprites } from '../sprites.js';
import { createDraw } from './utils.js';

// loadMario() will be async
export function loadMario() {
    return loadSprites('mario', true).
        then(createMarioFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createMarioFactory(sprites) {
    // moved all the support/stateless functionality out of the createMario scope
    // as they are needed to be created only ones 

    // create th draw method - common/static/stateless for all Goomba entities
    const draw = createDraw(sprites, 'idle');

    // createMario() will be synchronous
    return function mario() {
        const entity = new Entity();
        entity.size.set(14, 16);

        entity.registerTrait(new Walk());
        entity.registerTrait(new Jump());
        entity.registerTrait(new BeStomper());
        entity.registerTrait(new BeKillable(0));

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}