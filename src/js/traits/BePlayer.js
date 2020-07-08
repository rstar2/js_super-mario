import { Trait } from "../Trait.js";
import { BeStomperTrait } from "../traits/BeStomper.js";

const EXTRA_LIFE_COINS = 1000;

export class BePlayerTrait extends Trait {
    /**
     * 
     * @param {String} name name of the player
     */
    constructor(name) {
        super("player", true);

        this._name = name;
        this._score = 0;
        this._coins = 0;
        this._lives = 3;

        // add a stomper listener
        this.addListener(BeStomperTrait.STOMP_EVENT, () => (this._score += 100));
    }

    /**
     * @returns {String}
     */
    get name() {
        return this._name;
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

    /**
   *
   * @param {Number} count
   */
    addCoins(count) {
        this._coins += count;

        // when 1000 coins ara collected increase the lives
        if (this._coins >= EXTRA_LIFE_COINS) {
            const extraLives = Math.floor(this._coins / EXTRA_LIFE_COINS);
            this._coins = this._coins % EXTRA_LIFE_COINS;
            this.addLives(extraLives);
        }

        // play a sound
        this.queueTask((entity) => {
            entity.sound('coin');
        });
    }
    /**
   *
   * @param {Number} count
   */
    addLives(count) {
        this._lives += count;
    }
}
