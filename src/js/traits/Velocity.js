import { Trait } from '../Trait.js';

export class VelocityTrait extends Trait {
    constructor() {
        super('velocity');
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate) {
        entity.pos.x += entity.vel.x * rate;
        entity.pos.y += entity.vel.y * rate;
    }
}