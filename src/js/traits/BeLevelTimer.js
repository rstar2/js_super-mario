import { Trait } from '../Trait.js';

export class BeLevelTimerTrait extends Trait {

    static EVENT_TIMER_OK = Symbol('timer_ok');
    static EVENT_TIMER_HURRY = Symbol('timer_hurry');
     
    /**
     * @param {Number} totalTime
     * @param {Number} timeSpeed
     */
    constructor(totalTime = 400, timeSpeed = 2) {
        super('levelTimer', true);

        this._totalTime = totalTime;
        this._remainTime = totalTime;
        this._hurryTime = 100;

        // it has 3 states (null, false, true)
        this._hurryEventEmitted = null;

        this._timeSpeed = timeSpeed;
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
        this._remainTime -= rate * this._timeSpeed;
        if (this._hurryEventEmitted !== true && this._remainTime < this._hurryTime) {
            level.emit(BeLevelTimerTrait.EVENT_TIMER_HURRY);
            this._hurryEventEmitted = true;
        }
        if (this._hurryEventEmitted !== false && this._remainTime > this._hurryTime) {
            level.emit(BeLevelTimerTrait.EVENT_TIMER_OK);
            this._hurryEventEmitted = false;
        }
    }

}