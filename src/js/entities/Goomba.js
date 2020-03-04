import { Entity } from '../Entity.js';
import { Trait } from '../Trait.js';
import { WanderTrait as Wander } from '../traits/Wander.js';
import { BePhysicsTrait as BePhysics } from '../traits/BePhysics.js';
import { BeSolidTrait as BeSolid } from '../traits/BeSolid.js';
import { BeKillableTrait as BeKillable } from '../traits/BeKillable.js';
import { createDraw, loadEntity } from './utils.js';

/**
 * @param {AudioContext} audioContext 
 */
export function loadGoomba(audioContext) {
    return loadEntity('goomba', audioContext).
        then(createGoombaFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites
 * @param {AudioBoard} audioBoard
 */
function createGoombaFactory({sprites, audioBoard}) {

    // create the draw method - common/static/stateless for all Goomba entities
    const defDraw = createDraw(sprites, 'walk-1');
    const draw = function (context, level) {
        if (this.killable.dead) {
            sprites.draw('flat', context, 0, 0);
            return;
        }
        defDraw.call(this, context, level);
    };

    return function goomba() {
        const entity = new Entity('goomba', audioBoard);
        entity.size.set(16, 16);

        entity.registerTrait(new Behavior());
        entity.registerTrait(new BePhysics());
        entity.registerTrait(new BeSolid());
        entity.registerTrait(new BeKillable());
        entity.registerTrait(new Wander());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

class Behavior extends Trait {
    constructor() {
        super('behavior', true);
    }

    collided(goomba, otherEntity) {
        if (goomba.killable.dead) {
            // we are already dead - don't interact again on next collisions
            return;
        }

        // don't check if the other entity is 'Mario'
        // but if the other entity has a special feature,
        // in this case for a trait named 'stomper'
        if (otherEntity.stomper) {
            // Goomba is killed only if the stomper (like Mario) is falling on it
            if (otherEntity.pos.y < goomba.pos.y) {
                // make us stop moving
                goomba.vel.x = 0;
                goomba.wander.pause();

                // make us killed
                goomba.killable.kill();
            } else {
                // make the stomper killed
                if (otherEntity.killable) {
                    otherEntity.killable.kill();
                }
            }
        }
    }

}