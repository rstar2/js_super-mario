import Trait from '../Trait.js';

export default class JumpTrait extends Trait {
    constructor() {
        super('jump');

        this._duration = 0.5;
        this._velocity = 200;
        this._engagedTime = 0;
    }

    start() {
        console.log('jump start');
        this._engagedTime = this._duration;
    }

    cancel() {
        console.log('jump cancel');
        this._engagedTime = 0;
    }

    update(entity, rate) {
        if (this._engagedTime > 0) {
            console.log('jumping');
            // update just the 'y' coordinate
            entity.vel.y = -this._velocity;
            this._engagedTime -= rate;
        }
        
    }
}