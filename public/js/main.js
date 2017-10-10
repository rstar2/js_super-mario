import CONFIG from './config.js';
import SpriteSheet from './SpriteSheet.js';
import LayerManager from './LayerManager.js';
import Timer from './Timer.js';
import KeyManager from './KeyboardManager.js';
import { loadLevel } from './Level.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([loadLevel('1_1')]).
    then(([level]) => {
        const keyManager = new KeyManager();
        keyManager.start(window);

        level.init(keyManager);

        const timer = new Timer(CONFIG.RATE);
        timer.update = function (rate) {
            level.update(rate);

            level.draw(context);

            level.updateAfter(rate);
        };

        timer.start();
    });
