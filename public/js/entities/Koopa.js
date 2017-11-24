import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Wander from '../traits/Wander.js';
import BeKillable from '../traits/BeKillable.js';
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

    // create the draw method - common/static/stateless for all Koopa entities
    const defDraw = createDraw(sprites, 'walk-1');
    const draw = function (context, level) {
        if (this.killable.dead) {
            sprites.draw('hiding', context, 0, 0);
            return;
        }
        defDraw.call(this, context, level);
    };

    return function koopa() {
        const entity = new Entity();
        entity.size.set(16, 16);
        entity.offset.y = 8;

        entity.registerTrait(new Wander(30));
        entity.registerTrait(new Behavior());
        entity.registerTrait(new BeKillable());

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

const STATE_WALKING = Symbol();
const STATE_HIDING = Symbol();

class Behavior extends Trait {
    constructor() {
        super('behavior', true);

        this._unhideTime = 2;
        this._hidingTime = 0;

        this._state = STATE_WALKING;
    }

    get tile() {

    }

    hide(us) {
        us.vel.x = 0;
        us.wander.pause();

        this._state = STATE_HIDING;
        this._hidingTime = 0;
    }

    unhide(us) {
        us.wander.unpause();
        this._state = STATE_WALKING;
    }

    collided(us, otherEntity) {
        if (us.killable.dead) {
            // we are already dead - don't interact again on next collisions
            return;
        }

        // don't check if the other entity is 'Mario'
        // but if the other entity has a special feature,
        // in this case for a trait named 'stomper'
        if (otherEntity.stomper) {

            if (this._state === STATE_WALKING) {
                // Goomba is killed only if te stomper (like Mario) is falling on it
                if (otherEntity.vel.y > us.vel.y) {
                    // make us hide
                    this.hide(us);

                    // make the stomper bounce
                    otherEntity.stomper.bounce();
                } else {
                    // make the stomper killed
                    if (otherEntity.killable) {
                        otherEntity.killable.kill();
                    }
                }
            } else {
                us.killable.kill();
            }
        }
    }

    update(us, rate) {
        if (this._state === STATE_HIDING) {
            this._hidingTime += rate;

            if (this._hidingTime >= this._unhideTime) {
                this.unhide(us);
            }
        }
    }


}