import { KEY_SPACE, KEY_LEFT, KEY_RIGHT } from './KeyboardManager.js';
import Entity from './Entity.js';
import Walk from './traits/Walk.js';
import Jump from './traits/Jump.js';
import { loadSprites } from './sprites.js';
import { createAnimation } from './animation.js';


export function createMario(entitiesName) {
    return loadSprites(entitiesName, true).
        then(sprites => {
            const mario = new Entity();

            // TODO: use the mario.json
            mario.size.set(14, 16);
            const walkAnimation = createAnimation(["run-1", "run-2", "run-3"], 10);

            mario.draw = function (context) {
                let tile = !this.walk.distance ? "idle" : walkAnimation(this.walk.distance);
                const mirrored = this.walk.heading < 0;
                sprites.draw(tile, context, 0, 0, mirrored);
            };

            mario.registerTrait(new Walk());
            mario.registerTrait(new Jump());

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
