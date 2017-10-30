import CONFIG from './config.js';
import View from './View.js';
import Timer from './Timer.js';
import KeyboardManager from './KeyboardManager.js';
import { setupMarioKeyboard } from './keyboard.js';
import { loadLevel } from './Level.js';
import { loadMario } from './entities/Mario.js';
import { loadGoomba } from './entities/Goomba.js';
import { loadKoopa } from './entities/Koopa.js';
import { setupMouseControl } from './debug.js';
import { createDebugTileCollisionLayer, createDebugEntityLayer, createDebugViewLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
// context.scale(2, 2);
context.imageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;


const keyboardManager = new KeyboardManager();

Promise.all([loadMario('mario'), loadGoomba('goomba'), loadKoopa('koopa'), 
loadLevel('1_1')]).
    then(([createMario, createGoomba, createKoopa, level]) => {
        const view = new View(CONFIG.VIEW_WIDTH, CONFIG.VIEW_HEIGHT);

        // now this createMario function can be called multiple times
        const mario = createMario();

        // add Mario to the level
        level.addMario(mario);

        const goomba = createGoomba();
        goomba.pos.x = 260;
        level.addEntity(goomba);

        const koopa = createKoopa();
        koopa.pos.x = 320;
        level.addEntity(koopa);

        // setup the keyboard actions for Mario
        // adn start the keyboard manager
        setupMarioKeyboard(mario, keyboardManager);
        keyboardManager.start(window);

        // DEBUG: add Mario easy replacement if needed
        if (CONFIG.DEBUG_MARIO) {
            setupMouseControl(mario, canvas, view);
        }

        // DEBUG: add visual collisions if needed
        if (CONFIG.DEBUG_TILE_COLLISION) {
            level.addLayer(createDebugTileCollisionLayer(level));
            level.addLayer(createDebugEntityLayer(level));
        }

        if (CONFIG.DEBUG_VIEW_SCROLL) {
            level.addLayer(createDebugViewLayer(view));
        }


        const timer = new Timer(CONFIG.RATE);
        timer.update = function (rate) {
            // update all level entities (including Mario)
            level.update(rate);


            // move the camera/view together with Mario
            // TODO: Don't position Mario always in the center, allow some margin left and right
            if (mario.pos.x > view.size.x / 2) {
                view.pos.x = mario.pos.x - view.size.x / 2;
            }

            // draw next frame
            level.draw(context, view);
        };

        timer.start();
    });
