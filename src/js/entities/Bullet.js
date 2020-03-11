import { Entity } from '../Entity.js';
import { Trait } from '../Trait.js';
import { GravityTrait as Gravity } from '../traits/Gravity.js';
import { VelocityTrait as Velocity } from '../traits/Velocity.js';
import { BeKillableTrait as BeKillable } from '../traits/BeKillable.js';
import { loadEntity } from './utils.js';

/**
 * @param {AudioContext} audioContext 
 */
export function loadBullet(audioContext) {
    return loadEntity('bullet', audioContext).
        then(createBulletFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites
 * @param {AudioBoard} audioBoard
 */
function createBulletFactory({sprites, audioBoard}) {

    return function bullet() {
        const entity = new Entity('bullet', audioBoard);
        entity.size.set(16, 14);
        entity.vel.set(40, 0);

        entity.registerTrait(new Behavior());
        entity.registerTrait(new Velocity());
        entity.registerTrait(new BeKillable());

        entity.draw = function (context) {
            sprites.draw('bullet', context, 0, 0);
        };

        return entity;
    };
}

class Behavior extends Trait {
    constructor() {
        super('behavior', true);
        this._gravity = null;
    }

    collided(bullet, otherEntity) {
        if (bullet.killable.dead) {
            // we are already dead - don't interact again on next collisions
            return;
        }

        // don't check if the other entity is 'Mario'
        // but if the other entity has a special feature,
        // in this case for a trait named 'stomper'
        if (otherEntity.stomper) {
            // Bullet is killed only if the stomper (like Mario) is falling on it
            if (otherEntity.pos.y < bullet.pos.y) {
                // make us killed
                bullet.killable.kill();
                this._gravity = new Gravity();
            } else {
                // make the stomper killed
                if (otherEntity.killable) {
                    otherEntity.killable.kill();
                }
            }
        }
    }

    /**
     * @param {Entity} bullet
     * @param {{rate: Number, audioContext: AudioContext}} gameContext
     * @param {Level} level  
     */
    update(bullet, gameContext, level) {
        // if bullet is "dead", so it has gravity, then apply to it
        if (this._gravity) {
            this._gravity.update(bullet, gameContext, level);
        }
    }


}