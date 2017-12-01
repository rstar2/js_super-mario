import { Trait } from '../Trait.js';

export class BeStomperTrait extends Trait {
    constructor() {
        super('stomper', true);

        this._bounceVelocity = 400;

        /**
         * @param {Function[]}
         */
        this._stompListeners = [];
    }

    /**
     * 
     * @param {Function} callback 
     */
    addListener(callback) {
        this._stompListeners.push(callback);
    }

    /**
     * @param {Entity} us 
     * @param {Entity} otherEntity 
     */
    collided(us, otherEntity) {
        if (!otherEntity.killable || otherEntity.killable.dead) {
            return;
        }

        if (us.pos.y < otherEntity.pos.y) {
            this.onStomp(us, otherEntity);
            this._stompListeners.forEach(callback => callback(us, otherEntity));
        }
    }

    /**
     * @param {Entity} us 
     * @param {Entity} otherEntity 
     */
    onStomp(us, otherEntity) {
        // go to the top of the other entity, not to collide agin with it on the next check
        us.bounds.bottom = otherEntity.bounds.top;

        // make the stomper bounce
        us.vel.y = -this._bounceVelocity;
    }

}