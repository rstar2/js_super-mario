import Trait from '../Trait.js';

export default class BeControl extends Trait {
    /**
     * @param {Entity} controllable
     */
    constructor(controllable) {
        super('control', true);

        this._controllable = controllable;
        this._checkpoint = this._controllable.pos.clone();
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, rate, level) {
        // revive the killed entity
        if (!level.hasEntity(this._controllable)) {
            this._controllable.killable.revive();
            this._controllable.pos.set(this._checkpoint.x, this._checkpoint.y);
            level.addEntity(this._controllable);
        }
    }

}