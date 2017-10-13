import CONFIG from './config.js';
import View from './view.js';
import Timer from './Timer.js';
import KeyboardManager from './KeyboardManager.js';
import { loadLevel } from './Level.js';
import { createMario, setupKeyboardControl } from './entities.js';
import { setupMouseControl } from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const keyboardManager = new KeyboardManager();
const view = new View();
window.view = view;

Promise.all([createMario('characters'), loadLevel('1_1')]).
    then(([mario, level]) => {
        // add Mario to the level
        level.addMario(mario);

        // setup the keyboard actions for Mario
        // adn start the keyboard manager
        setupKeyboardControl(mario, keyboardManager);
        keyboardManager.start(window);

        // DEBUG: add Mario easy replacement if needed
        if (CONFIG.DEBUG_MARIO) {
            setupMouseControl(mario, canvas, view);
        }

        const timer = new Timer(CONFIG.RATE);
        timer.update = function (rate) {
            // update all level entities (including Mario)
            level.update(rate);
            // draw next frame
            level.draw(context, view);
        };

        timer.start();
    });
