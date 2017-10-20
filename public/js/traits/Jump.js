import Trait from '../Trait.js';
import Entity from '../Entity.js';

export default class JumpTrait extends Trait {
    constructor() {
        super('jump');

        this._duration = 1.3;
        this._velocity = 200;
        this._engagedTime = 0;

        // state to indicate whether it can jump - it can only from when touched a 'ground'
        // this means that there will be needed a 2 step-update in order to animate
        this._ready = 0;

        // allow a grace time in which we can jump, e.g.
        // next jump can occur while falling and start
        // is pressed when very close to the ground (allow a grace period)
        this._requestTime = 0;
        this._gracePeriod = 1.5; // seconds
    }

    start() {
        this._requestTime = this._gracePeriod;
    }

    cancel() {
        this._engagedTime = 0;
        this._requestTime = 0;
    }

    update(entity, rate) {
        // check if we've pressed to 'start'
        // then we'll start to look for an opportunaty to jump
        if (this._requestTime > 0) {
            if (this._ready > 0) {
                this._engagedTime = this._duration;
                this._requestTime = 0;
            } else {
                this._requestTime -= rate;
            }
        }
        
        if (this._engagedTime > 0) {
            // update just the 'y' coordinate
            entity.vel.y = -this._velocity;
            this._engagedTime -= rate;
        }

        this._ready--;
    }

    collide(entity, obstacle, direction) {
        switch (direction) {
            case Entity.COLLIDE_BOTTOM:
                // make ready to jump
                this._ready = 1;
                break;
            case Entity.COLLIDE_TOP:
                // stop the jumping 
                this.cancel();
                break;
        }
    }

    /**
     * @param {Entity} entity 
     * @param {(progress: Number)} animation
     * @param {Number} levelTotalTime 
     */
    animate(entity, animation, levelTotalTime) {
        let tile;

        // catch the case when jumping
        if (this._ready < 0) {
            tile = animation(levelTotalTime);
        }

        return {tile};
    }
}