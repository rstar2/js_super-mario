import CONFIG from './config.js';
import SpriteSheet from './SpriteSheet.js';
import LayerManager from './LayerManager.js';
import Timer from './Timer.js';
import KeyManager, { KEY_SPACE } from './KeyboardManager.js';
import { loadLevel } from './utils.js';
import { loadBackgroudSprites } from './sprites.js';
import { createBackgroundLayer, createEntityLayer } from './layers.js';
import { createEntityMario } from './entities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([loadBackgroudSprites(), loadLevel('1_1'), createEntityMario()]).
    then(([backgroundSprites, level, mario]) => {
        const gravity = 2000;
        mario.pos.set(64, 180);
        mario.vel.set(200, -600);
    

        const layers = new LayerManager();
        // layers.add(createBackgroundLayer(backgroundSprites, level));
        layers.add(createEntityLayer(mario));


        const keyManager = new KeyManager();
        keyManager.register(KEY_SPACE, keyState => {
            console.log(keyState);
            if (keyState) {
                mario.jump.start();
            } else {
                mario.jump.cancel();
            }
        });
        keyManager.start(window);


        const timer = new Timer();
        timer.update = (rate) => {
            mario.update(rate);

            layers.draw(context);

            // add some gravity
            mario.vel.y += gravity * rate;
        };

        timer.start();
    });
