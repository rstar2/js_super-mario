import * as logger from './logger.js';

export const KEY_STATE_RELEASED = 0;
export const KEY_STATE_PRESSED = 1;

export class KeyboardManager {
    constructor() {
        // keyCode to registered callback
        this._keyMap = new Map();

        // down-up state for a key
        this._keyState = new Map();

        this._started = false;
    }

    /**
     * 
     * @param {Window} window 
     */
    start(window) {
        if (this._started) {
            logger.logWarn("KeyboardManager is already started");
            return;
        }

        logger.logDbg("KeyboardManager is started");

        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this._handleEvent(event);
            });
        });
    }

    /**
     * 
     * @param {Number} key 
     * @param {Function} callback 
     */
    register(key, callback) {
        this._keyMap.set(key, callback);
        // this._keyState.set(key, KEY_STATE_RELEASED);
    }

    _handleEvent(event) {
        const key = event.keyCode;

        const callback = this._keyMap.get(key);
        if (!callback) {
            // not interested in this key
            return;
        }

        // no browser's default action on any registered keys
        event.preventDefault();

        const newState = event.type === "keydown" ? KEY_STATE_PRESSED : KEY_STATE_RELEASED;
        if (this._keyState.get(key) !== newState) {
            callback(newState);
            this._keyState.set(key, newState);
        }

    }

}