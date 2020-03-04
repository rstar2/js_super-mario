import { Trait } from '../Trait.js';

export class BePlayerControlTrait extends Trait {
    /**
     * @param {Entity} player
     * @param {Number} playerTime
     */
    constructor(player, playerTime = -1) {
        super('control', true);

        this._player = player;
        this._checkpoint = this._player.pos.clone();

        this._playerTime = playerTime;
        this._remainTime = this._playerTime;
        this._timeSpeed = 2;

        this._score = 0;
        this._coins = 0;

        // add a stomper listener
        this._player.stomper.addListener('stomp', () => this._score += 100);
    }

    /**
     * @returns {Number}
     */
    get score() {
        return this._score;
    }

    /**
     * @returns {Number}
     */
    get coins() {
        return this._coins;
    }

    /**
     * @returns {Number}
     */
    get remainTime() {
        return this._remainTime;
    }

    /**
     * @param {Entity} entity
     * @param {Number} rate
     * @param {Level} level  
     */
    update(entity, { rate }, level) {
        // revive the killed entity
        if (!level.hasEntity(this._player)) {
            this._player.killable.revive();
            this._player.pos.set(this._checkpoint.x, this._checkpoint.y);
            level.addEntity(this._player);

            // reset again the player's remaining time
            this._remainTime = this._playerTime;
        } else {

            // update player's remaining time (if there's such a need)
            if (this._playerTime > 0) {
                this._remainTime -= rate * this._timeSpeed;
            }
        }
    }

}