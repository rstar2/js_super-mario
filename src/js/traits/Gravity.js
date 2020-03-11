import { Trait } from '../Trait.js';

export class GravityTrait extends Trait {
    constructor() {
        super('gravity');

        this._gravity = 2000;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, { rate }) {
        // add some gravity
        entity.vel.y += this._gravity * rate;
    }
}