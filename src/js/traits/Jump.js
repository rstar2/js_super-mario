import { Trait } from '../Trait.js';
import { Entity } from '../Entity.js';

export class JumpTrait extends Trait {
    constructor() {
        super('jump');

        this._duration = 0.3;
        this._velocity = 200;
        this._engagedTime = 0;

        // state to indicate whether we can jump - it can only from when touched a 'ground'
        // this means that there will be needed a 2 step-update in order to animate
        this._ready = 0;

        // allow a grace time in which we can jump, e.g.
        // next jump can occur while falling and start
        // is pressed when very close to the ground (allow a grace period)
        this._requestTime = 0;
        this._gracePeriod = 0.2; // seconds

        // the faster we walk/run the higher the jump
        this._speedBoost = 0.3;
    }

    /**
     * @returns {boolean}
     */
    get falling() {
        return this._ready < 0;
    }

    start() {
        this._requestTime = this._gracePeriod;
    }

    cancel() {
        this._engagedTime = 0;
        this._requestTime = 0;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
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
            // the faster we run the more speed we gain and thus higher jump
            entity.vel.y = -(this._velocity + Math.abs(entity.vel.x) * this._speedBoost);
            this._engagedTime -= rate;
        }

        this._ready--;
    }

    obstructed(entity, obstacle, direction) {
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
     * @param {Map<name:String, (progress: Number)>} animations
     * @param {Number} levelTotalTime 
     */
    animate(entity, animations, levelTotalTime) {
        let tile;

        // catch the case when jumping
        if (this.falling) {
            // get the main animation - it for sure exists
            const animation = animations.get(this.NAME);
            tile = animation(levelTotalTime);
        }

        return { tile };
    }
}