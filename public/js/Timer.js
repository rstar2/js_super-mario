import { CONFIG } from './config.js';

export class Timer {
    constructor(rate = 1 / 60) {
        this._rate = rate;
        this._lastTime = 0;
        this._accumulatedTime = 0;
    }

    _updadeProxy(time) {
        this._accumulatedTime += (time - this._lastTime) / 1000;

        // temporary fix for not updating so often
        if (CONFIG.FIX_TIMER && this._accumulatedTime > 1) {
            this._accumulatedTime = 1;
        }

        while (this._accumulatedTime > this._rate) {
            this._accumulatedTime -= this._rate;

            this.update(this._rate);
        }
        this._lastTime = time;

        this.enqueue();
    }

    // eslint-disable-next-line no-unused-vars
    update(rate) {
        // users should overwrite it
        throw new Error("Users should attach a real update method");
    }

    start() {
        this.enqueue();
    }

    enqueue() {
        requestAnimationFrame(this._updadeProxy.bind(this));
    }

}