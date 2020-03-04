import { Entity } from '../Entity.js';
import { WalkTrait as Walk } from '../traits/Walk.js';
import { JumpTrait as Jump } from '../traits/Jump.js';
import { BePhysicsTrait as BePhysics } from '../traits/BePhysics.js';
import { BeSolidTrait as BeSolid } from '../traits/BeSolid.js';
import { BeStomperTrait as BeStomper } from '../traits/BeStomper.js';
import { BeKillableTrait as BeKillable } from '../traits/BeKillable.js';
import { createDraw, loadEntity } from './utils.js';

// loadMario() will be async
/**
 * @param {AudioContext} audioContext 
 */
export function loadMario(audioContext) {
    return loadEntity('mario', audioContext).
        then(createMarioFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites
 * @param {AudioBoard} audioBoard
 */
function createMarioFactory({sprites, audioBoard}) {
    // moved all the support/stateless functionality out of the createMario scope
    // as they are needed to be created only ones 

    // create the draw method - common/static/stateless for all Mario entities
    const draw = createDraw(sprites, 'idle');

    // createMario() will be synchronous
    return function mario() {
        const entity = new Entity('mario', audioBoard);
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