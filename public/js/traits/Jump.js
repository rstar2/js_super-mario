import Trait from '../Trait.js';

export default class JumpTrait extends Trait {
    constructor() {
        super('jump');

        this._duration = 0.5;
        this._velocity = 200;
        this._engagedTime = 0;
    }

    start() {
        this._engagedTime = this._duration;
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
    }

    collide(entity, obstacle, direction) {
        // keep empty , inheritors may overwrite it they need to
    }
}