import { Scene } from './Scene.js';

export class ProgressScene extends Scene {

    /**
     * 
     * @param {String} name
     * @param {Number} countdown in seconds
     */
    constructor(name, countdown = 2) {
        super(name);
        this._countdown = countdown;
    }

    /**
     * @param {GameContext} gameContext
     */
    update(gameContext) {
        this._countdown -= gameContext.rate;
        if (this._countdown < 0) {
            this.emit(Scene.EVENT_COMPLETE);
        }
    }
}