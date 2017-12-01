import { Trait } from '../Trait.js';
import { Entity } from '../Entity.js';

export class WanderTrait extends Trait {
    constructor(velocity = -30, panicVelocity = 90) {
        super('wander');
        if (velocity === 0) {
            throw new Error('Cannot have wander trait with 0 velocity');
        }

        this._paused = false;

        this._velocity = velocity;
        this._panicVelocity = Math.abs(panicVelocity); // prevent if passed negative number

        // the distance "walked" when in single "walking" phase
        this._distance = 0;
    }

    /**
    * @returns {Number}
    */
    get velocity() {
        return this._velocity;
    }

    /**
     * @param {Number} velocity
     */
    set velocity(velocity) {
        this._velocity = velocity;
    }

    /**
     * @returns {Number}
     */
    get distance() {
        return this._distance;
    }

    /**
     * @param {Boolean} paused 
     */
    pause(paused = true) {
        this._paused = paused;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate) {
        if (this._paused) {
            return;
        }

        // update just the 'x' coordinate of the velocity
        entity.vel.x = this._velocity;

        // measure the distance "walked" after the last stop
        this._distance += Math.abs(entity.vel.x) * rate;
    }

    /**
     * @param {Entity} entity 
     * @param {(progress: Number)} animation
     */
    animate(entity, animations) {
        let tile;
        if (this.distance > 0) {
            // use main animation - it for sure exists
            const animation = animations.get(this.NAME);
            tile = animation(entity.lifetime);
        }

        return { tile, mirrored: entity.vel.x < 0 };
    }

    obstructed(entity, obstacle, direction) {
        switch (direction) {
            case Entity.COLLIDE_LEFT:
            case Entity.COLLIDE_RIGHT:
                this._distance = 0;
                this._velocity = -this._velocity;
                break;
        }
    }
}