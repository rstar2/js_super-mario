import { KEY_SPACE, KEY_LEFT, KEY_RIGHT } from './KeyboardManager.js';
import Entity from './Entity.js';
import Walk from './traits/Walk.js';
import Jump from './traits/Jump.js';
import { loadData } from './utils.js';
import { loadSprites } from './sprites.js';
import { createAnimation } from './animation.js';


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

            mario.draw = function (context) {
                const { tile, mirrored } = this.animate();
                // if no tile to animate then draw the default "idle" one
                const tileSize = sprites.draw(tile || 'idle', context, 0, 0, mirrored);

                // TODO:  mario.size.set(...tileSize);
                mario.size.set(14, 16);
            };

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
