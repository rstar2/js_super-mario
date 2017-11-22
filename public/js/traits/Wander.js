import Trait from '../Trait.js';
import Entity from '../Entity.js';

export default class WanderTrait extends Trait {
    constructor(velocity = -30) {
        super('wander');

        this._velocity = velocity;

        // the distance "walked" when in single "walking" phase
        this._distance = 0;
    }

    /**
     * @returns {Number}
     */
    get distance() {
        return this._distance;
    }

    stop() {
        this._velocity = 0;
    }

    update(entity, rate) {
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