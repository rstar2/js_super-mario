import { Trait } from '../Trait.js';
import { BeStomperTrait } from '../traits/BeStomper.js';

export class BePlayerTrait extends Trait {
    constructor() {
        super('player', true);
        this._score = 0;
        this._coins = 0;
        this._lives = 3;


        // add a stomper listener
        this.addListener(BeStomperTrait.STOMP_EVENT, () => this._score += 100);
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
    get lives() {
        return this._lives;
    }
}