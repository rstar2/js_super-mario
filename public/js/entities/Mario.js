import { Entity } from '../Entity.js';
import { WalkTrait as Walk } from '../traits/Walk.js';
import { JumpTrait as Jump } from '../traits/Jump.js';
import { BePhysicsTrait as BePhysics } from '../traits/BePhysics.js';
import { BeSolidTrait as BeSolid } from '../traits/BeSolid.js';
import { BeStomperTrait as BeStomper } from '../traits/BeStomper.js';
import { BeKillableTrait as BeKillable } from '../traits/BeKillable.js';
import { loadSprites } from '../loaders/sprites.js';
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

    // create the draw method - common/static/stateless for all Goomba entities
    const draw = createDraw(sprites, 'idle');

    // createMario() will be synchronous
    return function mario() {
        const entity = new Entity('mario');
        entity.size.set(14, 16);

        entity.registerTrait(new BePhysics());
        entity.registerTrait(new BeSolid());
        entity.registerTrait(new BeStomper());
        entity.registerTrait(new BeKillable(0));
        entity.registerTrait(new Walk());
        entity.registerTrait(new Jump());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}