import Trait from '../Trait.js';

export default class VelocityTrait extends Trait {
    constructor() {
        super('velocity');
    }

    update(entity, rate) {
        entity.pos.updateBy(entity.vel.x * rate, entity.vel.y * rate);
    }
}