import Trait from '../Trait.js';

export default class WalkTrait extends Trait {
    constructor() {
        super('walk');

        this._direction = 0;
        this._velocity = 4000;
    }


    left() {
        this._direction = -1;
    }

    right() {
        this._direction = 1;
    }

    cancel() {
        this._direction = 0;
    }

    update(entity, rate) {
        // update just the 'x' coordinate
        entity.vel.x = this._velocity * this._direction * rate;
    }
}