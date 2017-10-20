import Trait from '../Trait.js';
import Entity from '../Entity.js';

export default class JumpTrait extends Trait {
    constructor() {
        super('jump');

        this._duration = 0.5;
        this._velocity = 200;
        this._engagedTime = 0;

        // state to indicate whether it can jump - it can only from when touched a 'ground'
        // this means that there will be needed a 2 step-update in order to animate
        this._ready = 0;
    }

    start() {
        if (this._ready > 0) {
            this._engagedTime = this._duration;
        }
    }

    cancel() {
        this._engagedTime = 0;
    }

    update(entity, rate) {
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