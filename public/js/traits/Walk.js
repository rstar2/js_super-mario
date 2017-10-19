import Trait from '../Trait.js';

export default class WalkTrait extends Trait {
    constructor(accelerate = true) {
        super('walk');

        this._accelerate = accelerate;

        this._direction = 0;

        // used if WalkTrait.IS_ACCELERATING is false
        this._velocity = 100;

        // used if WalkTrait.IS_ACCELERATING is true
        this._acceleration = 400;
        this._dragFactor = 1 / 5000;

        // the distance "walked" when in single "walking" phase
        this._distance = 0;

        // by default let the heading (last direction) be right
        this._lastDirection = 1;
    }

    /**
     * Starts or stops moving left
     * @param {boolean} startAction 
     */
    left(startAction) {
        this._direction += startAction ? -1 : 1;
    }

    /**
     * Starts or stops moving right
     * @param {boolean} startAction 
     */
    right(startAction) {
        this._direction += startAction ? 1 : -1;
    }

    update(entity, rate) {
        // update just the 'x' coordinate of the velocity/acceleration
        if (this._accelerate) {
            this._updateAcceleration(entity, rate);
        } else {
            this._updateConstantVelocity(entity, rate);
        }
    }

    _updateConstantVelocity(entity, rate) {
        // this will be with static velocity
        entity.vel.x = this._direction * this._velocity;

        if (this._direction !== 0) {
            // meassure the distance "walked" after the last stop
            this._distance += Math.abs(entity.vel.x) * rate;
            // also remember where the entity is heading last
            this._lastDirection = this._direction;
        } else {
            this._distance = 0;
        }
    }

    _updateAcceleration(entity, rate) {
        if (this._direction !== 0) {
            // this will be with incrementing speed - e.g. accelerating
            entity.vel.x += this._direction * (this._acceleration * rate);

            // meassure the distance "walked" after the last stop
            this._distance += Math.abs(entity.vel.x) * rate;
            // also remember where the entity is heading last
            this._lastDirection = this._direction;
        } else {
            this._distance = 0;
        }

        const drag = this._dragFactor * entity.vel.x * Math.abs(entity.vel.x);
        entity.vel.x -= drag;
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

    animate(entity, animation) {
        let tile = this.distance ? animation(this.distance) : undefined;
        const mirrored = this.heading < 0;

        return { tile, mirrored };

    }

}