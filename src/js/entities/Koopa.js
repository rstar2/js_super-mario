import { Entity } from '../Entity.js';
import { Trait } from '../Trait.js';
import { WanderTrait as Wander } from '../traits/Wander.js';
import { BePhysicsTrait as BePhysics } from '../traits/BePhysics.js';
import { BeSolidTrait as BeSolid } from '../traits/BeSolid.js';
import { BeKillableTrait as BeKillable } from '../traits/BeKillable.js';
import { loadSprites } from '../loaders/sprites.js';
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
    const draw = createDraw(sprites, 'walk-1');

    return function koopa() {
        const entity = new Entity('koopa');
        entity.size.set(16, 16);
        entity.offset.y = 8;

        entity.registerTrait(new Behavior());
        entity.registerTrait(new BePhysics());
        entity.registerTrait(new BeSolid());
        entity.registerTrait(new BeKillable());
        entity.registerTrait(new Wander(30));

        entity.registerAnimationsFromSprites(sprites);

        entity.draw = draw;

        return entity;
    };
}

const STATE_WALKING = Symbol();
const STATE_HIDING = Symbol();
const STATE_PANICING = Symbol();

class Behavior extends Trait {
    constructor() {
        super('behavior', true);

        this._unhideTime = 5;
        this._hidingTime = 0;

        this._panicVelocity = 300;
        this._wanderVelocity = null;

        this._state = STATE_WALKING;
    }

    /**
     * @returns {Boolean}
     */
    get hiding() {
        return this._state === STATE_HIDING ||
            this._state === STATE_PANICING;
    }

    _hide(koopa) {
        koopa.vel.x = 0;
        koopa.wander.pause();
        if (this._wanderVelocity === null) {
            this._wanderVelocity = koopa.wander.velocity;
        }

        this._state = STATE_HIDING;
        this._hidingTime = 0;
    }

    _unhide(koopa) {
        koopa.wander.pause(false);
        if (this._wanderVelocity !== null) {
            koopa.wander.velocity = this._wanderVelocity;
        }
        this._state = STATE_WALKING;
    }

    _handleStopm(koopa, otherEntity) {
        if (this._state === STATE_WALKING ||
            this._state === STATE_PANICING) {
            // make us hide
            this._hide(koopa);
        } else {
            // make us killed
            koopa.killable.kill();
            // make it not 'collidable'
            koopa.solid.disable();
            // make the koopa's shell bounce up a little and continue
            koopa.wander.pause(false);
            koopa.vel.y = -200;
        }
    }

    _handleNudge(koopa, otherEntity) {
        if (this._state === STATE_WALKING) {
            // make the stomper killed
            if (otherEntity.killable) {
                otherEntity.killable.kill();
            }
        } else if (this._state === STATE_HIDING) {
            // make the stomper kick the koopa's shell
            koopa.wander.velocity = this._panicVelocity * Math.sign(otherEntity.vel.x);
            koopa.wander.pause(false);
            this._state = STATE_PANICING;
        } else {
            // TODO: kill the stomper only if not in the same direction
            if (otherEntity.killable) {
                otherEntity.killable.kill();
            }
        }
    }

    collided(koopa, otherEntity) {
        if (koopa.killable.dead) {
            // we are already dead - don't interact again on next collisions
            return;
        }

        if (otherEntity.stomper) {
            // Koopa is hided first and after that killed
            if (otherEntity.pos.y < koopa.pos.y) {
                this._handleStopm(koopa, otherEntity);
            } else {
                this._handleNudge(koopa, otherEntity);
            }
        }
    }

    update(koopa, rate) {
        if (this._state === STATE_HIDING && !koopa.killable.dead) {
            this._hidingTime += rate;

            if (this._hidingTime >= this._unhideTime) {
                this._unhide(koopa);
            }
        }
    }

    /**
     * @param {Entity} entity 
     * @param {(progress: Number)} animation
     */
    animate(entity, animations) {
        let tile = this.hiding ? 'hiding' : undefined;
        if (this._state === STATE_HIDING) {
            if (this._hidingTime > 3) {
                // use 'wake' animation - it for sure exists
                const animation = animations.get('wake');
                if (animation) {
                    tile = animation(this._hidingTime);
                }
            }
        }

        return { tile };
    }

}