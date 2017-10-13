import { KEY_SPACE, KEY_LEFT, KEY_RIGHT } from './KeyboardManager.js';
import Entity from './Entity.js';
import Walk from './traits/Walk.js';
import Jump from './traits/Jump.js';
import { loadSprites } from './sprites.js';

export function createMario(entitiesName) {
    return loadSprites(entitiesName).
        then(sprites => {
            const mario = new Entity();
            mario.size.set(14, 16);

            mario.draw = function (context) {
                sprites.draw('idle', context, 0, 0);
            };

            mario.registerTrait(new Walk());
            mario.registerTrait(new Jump());

            // these will be applied on the whole Level
            // mario.registerTrait(new Gravity());
            // mario.registerTrait(new Velocity());

            return mario;
        });
}

export function setupKeyboardControl(mario, keyboardManager) {
    keyboardManager.register(KEY_SPACE, keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    keyboardManager.register(KEY_LEFT, keyState => {
        if (keyState) {
            mario.walk.left();
        } else {
            mario.walk.cancel();
        }
    });
    keyboardManager.register(KEY_RIGHT, keyState => {
        if (keyState) {
            mario.walk.right();
        } else {
            mario.walk.cancel();
        }
    });
}
