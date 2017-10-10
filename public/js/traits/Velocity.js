import Trait from '../Trait.js';

export default class VelocityTrait extends Trait {
    constructor() {
        super('velocity');
    }

    update(entity, rate) {
        entity.pos.x += entity.vel.x * rate;
        entity.pos.y += entity.vel.y * rate;
    }
}