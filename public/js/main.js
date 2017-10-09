import CONFIG from './config.js';
import SpriteSheet from './SpriteSheet.js';
import LayerManager from './LayerManager.js';
import { loadLevel } from './utils.js';
import { loadBackgroudSprites } from './sprites.js';
import { createBackgroundLayer, createEntityLayer } from './layers.js';
import { createEntityMario } from './entities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([loadBackgroudSprites(), loadLevel('1_1'), createEntityMario()]).
    then(([backgroundSprites, level, mario]) => {

        const gravity = 30;
        mario.position.set(64, 180);
        mario.velocity.set(200, -600);

        const layers = new LayerManager();
        layers.add(createBackgroundLayer(backgroundSprites, level));
        layers.add(createEntityLayer(mario));

        let deltaTime = 0;
        let lastTime = 0;

        function update(time) {
            deltaTime = (time - lastTime) / 1000;
            layers.draw(context);

            mario.update(deltaTime);
            // add some gravity
            mario.velocity.update(0, gravity);

            requestAnimationFrame(update);

            lastTime = time;
        }
        update(0);
    });
