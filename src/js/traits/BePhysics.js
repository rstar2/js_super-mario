import { Trait } from '../Trait.js';

export class BePhysicsTrait extends Trait {
    constructor(gravity = 1500) {
        super('physics');

        this._gravity = gravity;
        this._enabled = true;
    }

    disable() {
        this._enabled = false;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, { rate }, level) {
        // NOTE !!! : the x an y positions SHOULD be updated separately
        // before checking for collisions 
        entity.pos.x += entity.vel.x * rate;
        level.getTileCollider().checkX(entity);

        entity.pos.y += entity.vel.y * rate;
        level.getTileCollider().checkY(entity);

        if (this._gravity) {
            // NOTE !!! : applying the gravity SHOULD be after the tile collision check have been made
            entity.vel.y += this._gravity * rate;
        }
    }

}