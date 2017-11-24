import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Wander from '../traits/Wander.js';
import BeKillable from '../traits/BeKillable.js';
import { loadSprites } from '../sprites.js';
import { createDraw } from './utils.js';

export function loadGoomba() {
    return loadSprites('goomba', true).
        then(createGoombaFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior', true);
        // Note: finally we could use the trait like this:
        // const goomba = ...;
        //goomba.behavior.xxxx();
    }

    collided(goomba, otherEntity) {
        if (goomba.killable.dead) {
            // the Goomba is already dead - don't interact again on next collisions
            return;
        }

        // don't check if the other entity is 'Mario'
        // but if the other entity has a special feature,
        // in this case for a trait named 'stomper'
        if (otherEntity.stomper) {

            // Goomba is killed only if te stomper (like Mario) is falling on it
            if (otherEntity.vel.y > goomba.vel.y) {
                goomba.wander.stop();
                goomba.killable.kill();

                // make the stomper bounce
                otherEntity.stomper.bounce();
            } else {
                // make the stomper be killed
                if (otherEntity.killable) {
                    otherEntity.killable.kill();
                }
            }
        }
    }
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createGoombaFactory(sprites) {

    // create th draw method - common/static/stateless for all Goomba entities
    const defDraw = createDraw(sprites, 'walk-1');
    const draw = function (context, level) {
        if (this.killable && this.killable.dead) {
            sprites.draw('flat', context, 0, 0);
            return;
        }
        defDraw.call(this, context, level);
    };

    return function goomba() {
        const entity = new Entity();
        entity.size.set(16, 16);

        entity.registerTrait(new Behavior());
        entity.registerTrait(new BeKillable());
        entity.registerTrait(new Wander());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}