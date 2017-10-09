export default class Timer {
    constructor(rate = 1 / 60) {
        this._rate = rate;
        this._lastTime = 0;
        this._accumulatedTime = 0;
    }

    _updadeProxy(time) {
        this._accumulatedTime = (time - this._lastTime) / 1000;

        while (this._accumulatedTime > this._rate) {
            this._accumulatedTime -= this._rate;

            this.update(this._rate);
        }
        this._lastTime = time;

        this.enqueue();
    }

    update(rate) {
        // users should overwrite it
    }

    start() {
        this.enqueue();
    }

    enqueue() {
        requestAnimationFrame(this._updadeProxy.bind(this));
    }

}