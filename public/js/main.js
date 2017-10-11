import CONFIG from './config.js';
import Timer from './Timer.js';
import KeyboardManager from './KeyboardManager.js';
import { loadLevel } from './Level.js';
import { createMario, setupKeyboardMario } from './entities.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const keyboardManager = new KeyboardManager();

function setupDebugMario(mario) {
    // debug utility
    const canvas = document.getElementById('screen');
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos.set(event.offsetX, event.offsetY);
            }
        });
    });
}

Promise.all([createMario(), loadLevel('1_1')]).
    then(([mario, level]) => {
        // add Mario to the level
        level.addMario(mario);

        // setup the keyboard actions for Mario
        // adn start the keyboard manager
        setupKeyboardMario(mario, keyboardManager);
        keyboardManager.start(window);

        // DEBUG: add Mario easy replacement if needed
        if (CONFIG.DEBUG_MARIO) {
            setupDebugMario(mario);
        }

        const timer = new Timer(CONFIG.RATE);
        timer.update = function (rate) {
            level.update(rate);

            level.draw(context);
        };

        timer.start();
    });
