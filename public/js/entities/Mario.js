import KeyboardManager from '../KeyboardManager.js';
import Entity from '../Entity.js';
import Walk from '../traits/Walk.js';
import Jump from '../traits/Jump.js';
import { loadSprites } from '../sprites.js';

// constants for the keyboarad control - these are keyCode 
const KEY_LEFT = 65;     // A
const KEY_RIGHT = 68;    // D
const KEY_TURBO = 79;    // O
const KEY_JUMP = 80;     // P

// loadMario() will be async
/**
 * @param {String} entitiesName 
 * @param {String} marioName 
 */
export function loadMario(entitiesName) {
    return loadSprites(entitiesName, true).
        then(sprites => {
            const createMario = createMarioFactory(sprites);
            // return a synchronous create function
            return createMario;
        });
}

/**
 * @param {SpriteSheet} sprites 
 */
function createMarioFactory(sprites) {
    // moved all the support/stateless funcionality out of the createMario scope
    // as they are needed to be created only ones 

    function draw(context, level) {
        const { tile, mirrored } = this.animate(level);
        // if no tile to animate then draw the default "idle" one,
        // tileSize is array with [width, height]
        const tileSize = sprites.draw(tile || 'idle', context, 0, 0, mirrored);

        // set the size of the entity to the size of the real drawn tile
        this.size.set(...tileSize);
    }

    // createMario() will be synchronous
    return function createMario() {
        const mario = new Entity();

        mario.registerTrait(new Walk());
        mario.registerTrait(new Jump());

        sprites.forEachAnimation((animation, name) => {
            mario.registerAnimatation(name, animation);
        });

        mario.draw = draw;

        return mario;
    };
}

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
