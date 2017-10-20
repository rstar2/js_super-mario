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
        this._deacceleration = 300;
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

            // also remember where the entity is heading last
            this._lastDirection = this._direction;
        } else if (entity.vel.x !== 0) {
            // if stopped walking (e.g. this._direction is 0)
            // but it's stil moving because of the acceleration
            // then apply some DEacceleration that will stop him completely

            // this will in fact speed up the drag
            const deaccel = Math.min(Math.abs(entity.vel.x), this._deacceleration * rate);
            entity.vel.x -= entity.vel.x > 0 ? deaccel : -deaccel;
        } else {
            this._distance = 0;
        }

        if (entity.vel.x !== 0) {
            // this will add some drag - the higher the velocity the grater the drag
            // it will be always with the "sign +/-" s the velocity, so we'll be always
            // subsctractig late from the velocity - so real drag

            // note - put the drag 
            // 1. while moving (e.g a slowing little by little and thus applying a max speed)
            // 2. even if stopped walking (e.g. this._direction is 0) - this will allow to "slide" a little as it has some inercia 
            const drag = this._dragFactor * entity.vel.x * Math.abs(entity.vel.x);
            entity.vel.x -= drag;
        }

        // meassure the distance "walked" after the last stop
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

    /**
     * 
     * @param {Entity} entity 
     * @param {(progress: Number)} animation
     */
    animate(entity, animation) {
        // TODO: Don't hardcore the  'break' tile like that
        // For this allow each trait to have multiple animations for fifferent purposes
        // "run" -> ["run-1", "run-2", "run-3"]
        // "break" -> ["break", ...]
        let tile;
        if (this.distance > 0) {
            if ((entity.vel.x > 0 && this.direction < 0) ||
                (entity.vel.x < 0 && this.direction > 0)) {
                // when "breaking" - e.g. changing the direction
                tile = 'break';
            } else {
                tile = animation(this.distance);
            }
        }
        const mirrored = this.heading < 0;

        return { tile, mirrored };

    }

}