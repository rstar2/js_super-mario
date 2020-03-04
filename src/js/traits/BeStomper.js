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
     * @param {Entity} us 
     * @param {Entity} otherEntity 
     */
    collided(us, otherEntity) {
        if (!otherEntity.killable || otherEntity.killable.dead) {
            return;
        }

        if (us.pos.y < otherEntity.pos.y) {
            // go to the top of the other entity, not to collide again with it on the next check
            us.bounds.bottom = otherEntity.bounds.top;
            // make the stomper bounce
            us.vel.y = -this._bounceVelocity;

            this._emit('stomp', us, otherEntity);

            this.sound('stomp');
        }
    }

}