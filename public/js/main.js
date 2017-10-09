import CONFIG from './config.js'
import SpriteSheet from './SpriteSheet.js'
import LayerManager from './LayerManager.js'
import { loadLevel } from './utils.js'
import { loadBackgroudSprites, loadCharacterSprites } from './sprites.js'
import { createBackgroundLayer, createTileLayer } from './layers.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([loadBackgroudSprites(), loadCharacterSprites(), loadLevel('1_1')]).
    then(([backgroundSprites, charSprites, level]) => {

        let pos = {x:64, y:64};

        const layers = new LayerManager();
        layers.add(createBackgroundLayer(backgroundSprites, level));
        layers.add(createTileLayer(charSprites, 'idle', pos));

        function update() {
            layers.draw(context);
            pos.x += 2;
            pos.y += 2;
            requestAnimationFrame(update);
        }
        update();
    });
