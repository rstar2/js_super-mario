import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Wander from '../traits/Wander.js';
import BehaviorKillable from '../traits/BehaviorKillable.js';
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
        // don't check if the other entity is 'Mario'
        // but if the other entity has a special feature,
        // in this case for a trait named 'stopper'
        if (otherEntity.stopper) {
            goomba.wander.stop();
            goomba.killable.kill();
        }
    }
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites 
 */
function createGoombaFactory(sprites) {

    // create th draw method - common/static/stateless for all Goomba entities
    const draw = createDraw(sprites, 'walk-1', (goomba) => {
        if (goomba.killable && goomba.killable.dead) {
            return { tile: 'flat' };
        }
        return undefined;
    });

    return function goomba() {
        const entity = new Entity();
        entity.size.set(16, 16);

        entity.registerTrait(new Behavior());
        entity.registerTrait(new BehaviorKillable());
        entity.registerTrait(new Wander());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}