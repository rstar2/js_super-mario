import Trait from '../Trait.js';

export default class VelocityTrait extends Trait {
    constructor() {
        super('gravity');

        this._gravity = 2000;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate) {
        // add some gravity
        entity.vel.y += this._gravity * rate;
    }
}