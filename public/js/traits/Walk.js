import Trait from '../Trait.js';

export default class WalkTrait extends Trait {
    constructor() {
        super('walk');

        this._direction = 0;
        this._velocity = 4000;
        this._distance = 0; // the distance "walked" when in single "walking" phase

        // by default let the heading (last direction) be right
        this._lastDirection = 1;
    }

    left() {
        this._lastDirection = this._direction = -1;
    }

    right() {
        this._lastDirection = this._direction = 1;
    }

    cancel() {
        this._direction = 0;
        this._distance = 0;
    }

    update(entity, rate) {
        // update just the 'x' coordinate of the velocity
        entity.vel.x = this._velocity * this._direction * rate;

        // the distance "walked" after the last stop
        this._distance += Math.abs(entity.vel.x) * rate;
    }

    get direction() {
        return this._direction;
    }

    get distance() {
        return this._distance;
    }

    /**
     * The direction to where the entity is heading - "left or right" of course
     */
    get heading() {
        return this._lastDirection;
    }

}