import Trait from '../Trait.js';

export default class VelocityTrait extends Trait {
    constructor() {
        super('gravity');
        
        this._gavity = 2000;
    }

    update(entity, rate) {
        // add some gravity
        entity.vel.y +=  this._gavity* rate;
    }
}