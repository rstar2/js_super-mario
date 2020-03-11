import { Entity } from '../Entity.js';
import { Trait } from '../Trait.js';
import { EmitterTrait as Emitter } from '../traits/Emitter.js';
import { loadEntity } from './utils.js';

/**
 * @param {AudioContext} audioContext
 * @param {{[factory]: Function}} entityFactories 
 */
export function loadCannon(audioContext, entityFactories) {
    return loadEntity(null, audioContext, entityFactories).
        then(createCannonFactory);
}

/**
 * return a synchronous create function
 * @param {SpriteSheet} sprites
 * @param {AudioBoard} audioBoard
 * @param {{[factory]: Function}} entityFactories
 */
function createCannonFactory({sprites, audioBoard, entityFactories}) {

    return function cannon() {
        const entity = new Entity('cannon', audioBoard, false);

        entity.registerTrait(new Emitter());

        entity.emitter.add(function (/*Entity*/ent, gameContext, /*Level*/level) {
            const bullet = entityFactories.bullet();
            bullet.pos.set(ent.pos.x, ent.pos.y);
            
            level.addEntity(bullet);
        });

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