import { Trait } from '../Trait.js';

export class BePlayerControlTrait extends Trait {
    /**
     * @param {Entity} player
     */
    constructor(player) {
        super('control', true);

        this._player = player;
        this._checkpoint = this._player.pos.clone();
    }

    /**
     * @param {Entity} entity
     * @param {Level} level  
     */
    update(entity, context, level) {
        // revive the killed entity
        if (!level.hasEntity(this._player)) {
            this._player.killable.revive();
            this._player.pos.set(this._checkpoint.x, this._checkpoint.y);
            level.addEntity(this._player);
        }
    }

}