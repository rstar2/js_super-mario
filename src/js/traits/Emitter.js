import { Trait } from '../Trait.js';

export class EmitterTrait extends Trait {
    /**
     * 
     * @param {Number} interval (secs)
     */
    constructor(interval = 2) {
        super('emitter');

        this._interval = interval;
        this._countdown = interval;

        this._funcs = [];

        this._reset();
    }

    _reset() {
        this._countdown = this._interval;
    }

    /**
     * 
     * @param {Function} func 
     */
    add(func) {
        this._funcs.push(func);
    }

    /**
     * @param {Entity} entity
     * @param {{rate: Number, audioContext: AudioContext}} gameContext
     * @param {Level} level  
     */
    update(entity, gameContext, level) {
        // update the countdown
        this._countdown -= gameContext.rate;

        // if the time has come emit/call the registered functions
        if (this._countdown <= 0) {
            this._reset();
            this._funcs.forEach(func => func(entity, gameContext, level));
        }
    }
}