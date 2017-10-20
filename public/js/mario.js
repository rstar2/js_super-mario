import KeyboardManager from './KeyboardManager.js';
import Entity from './Entity.js';
import Walk from './traits/Walk.js';
import Jump from './traits/Jump.js';
import { loadData } from './utils.js';
import { loadSprites } from './sprites.js';
import { createAnimation } from './animation.js';

// constants for the keyboarad control - these are keyCode 
const KEY_LEFT = 65;     // A
const KEY_RIGHT = 68;    // D
const KEY_TURBO = 79;    // O
const KEY_JUMP = 80;     // P

export function createMario(entitiesName, marioName) {
    return Promise.all([loadSprites(entitiesName, true), loadData(marioName)]).
        then(([sprites, marioSpec]) => {
            const mario = new Entity();

            mario.registerTrait(new Walk());
            mario.registerTrait(new Jump());

            if (marioSpec.animations) {
                marioSpec.animations.forEach(animSpec => {
                    const animation = createAnimation(animSpec.frames, animSpec.frameRate);
                    mario.registerAnimatation(animSpec.name, animation);
                });
            }

            mario.draw = function (context, level) {
                const { tile, mirrored } = this.animate(level);
                // if no tile to animate then draw the default "idle" one,
                // tileSize is array with [width, height]
                const tileSize = sprites.draw(tile || 'idle', context, 0, 0, mirrored);

                // set the size of the entity to the size of the real drawn tile
                mario.size.set(...tileSize);
            };

            return mario;
        });
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
