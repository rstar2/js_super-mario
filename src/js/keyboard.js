import { KeyboardManager } from "./KeyboardManager.js";

// constants for the keyboard control - these are keyCode 
const KEY_LEFT = 65;     // A
const KEY_RIGHT = 68;    // D
const KEY_TURBO = 79;    // O
const KEY_JUMP = 80;     // P


/**
 * 
 * @param {Window} window 
 */
export function setupMarioKeyboard(window) {
    const keyboardManager = new KeyboardManager();
    keyboardManager.start(window);

    const receivers = new Set();
    const notify = (callback) => {
        receivers.forEach(entity => callback(entity));
    };

    keyboardManager.register(KEY_JUMP, keyState => {
        if (keyState) {
            notify(entity => entity.jump.start());
        } else {
            notify(entity => entity.jump.cancel());
        }
    });
    keyboardManager.register(KEY_LEFT, keyState => {
        notify(entity => entity.walk.left(!!keyState));
    });
    keyboardManager.register(KEY_RIGHT, keyState => {
        notify(entity => entity.walk.right(!!keyState));
    });
    keyboardManager.register(KEY_TURBO, keyState => {
        notify(entity => entity.walk.turbo(!!keyState));
    });

    return {
        /**
         * Callback must be with 
         * @param {Entity} receiver 
         */
        addReceiver(receiver) {
            receivers.add(receiver);
        },

        /**
         * 
         * @param {Entity} receiver 
         */
        removeReceiver(receiver) {
            receivers.delete(receiver);
        }
    };
}