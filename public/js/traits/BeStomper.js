import Trait from '../Trait.js';

export default class BeStomper extends Trait {
    constructor() {
        super('stomper', true);
        // Note: finally we could use the trait like this:
        // const entity = ...;
        // entity.stopper;

        this._bounceVelocity = 400;
        this._bounce = false;
    }

    bounce() {
        this._bounce = true;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity) {
        if (this._bounce) {
            this._bounce = false;

            entity.vel.y = -this._bounceVelocity; 
        }
    }

}