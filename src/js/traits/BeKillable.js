import { Trait } from '../Trait.js';

export class BeKillableTrait extends Trait {
    /**
     * 
     * @param {Number} deadTimeRemove 2 seconds by default
     */
    constructor(deadTimeRemove = 2) {
        super('killable', true);
        this._dead = false;
        this._deadTimeRemove = deadTimeRemove;

        this._deadTime = 0;
    }

    get dead() {
        return this._dead;
    }

    kill() {
        this.queueTask(() => { 
            this._dead = true; 
        });
    }

    revive() {
        this.queueTask(() => {
            this._dead = false;
            this._deadTime = 0;
        });
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, { rate }, level) {
        // keep the entity for a while and then remove it from the level
        if (this._dead) {
            this._deadTime += rate;

            if (this._deadTime >= this._deadTimeRemove) {
                this.queueTask(() => {
                    level.removeEntity(entity);
                });
            }
        }
    }

}