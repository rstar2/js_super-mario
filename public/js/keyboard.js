// constants for the keyboard control - these are keyCode 
const KEY_LEFT = 65;     // A
const KEY_RIGHT = 68;    // D
const KEY_TURBO = 79;    // O
const KEY_JUMP = 80;     // P

/**
 * 
 * @param {Entity} mario 
 * @param {KeyboardManager} keyboardManager 
 */
export function setupMarioKeyboard(mario, keyboardManager) {
    keyboardManager.register(KEY_JUMP, keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    keyboardManager.register(KEY_LEFT, keyState => {
        mario.walk.left(!!keyState);
    });
    keyboardManager.register(KEY_RIGHT, keyState => {
        mario.walk.right(!!keyState);
    });
    keyboardManager.register(KEY_TURBO, keyState => {
        mario.walk.turbo(!!keyState);
    });
}