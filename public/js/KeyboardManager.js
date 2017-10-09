export const KEY_STATE_RELEASED = 0;
export const KEY_STATE_PRESSED = 1;

export default class KeyboardManager {
    constructor() {
        // keyCode to registered callback
        this._keyMap = new Map();

        // down - up state fo a key
        this._keyState = new Map();
    }

    start(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this._handleEvent(event);
            });
        });
    }

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

export const KEY_SPACE = 32;
export const KEY_UP = 38;
export const KEY_RIGHT = 39;
export const KEY_DOWN = 40;
export const KEY_LEFT = 41;