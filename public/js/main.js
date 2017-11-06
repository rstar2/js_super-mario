import CONFIG from './config.js';
import View from './View.js';
import Timer from './Timer.js';
import KeyboardManager from './KeyboardManager.js';
import { setupMarioKeyboard } from './keyboard.js';
import { createLoadLevel } from './Level.js';
import { loadEntities } from './entities/entities.js';
import { setupMouseControl } from './debug.js';
import { createDebugTileCollisionLayer, createDebugEntityLayer, createDebugViewLayer } from './layers.js';

async function main(canvas) {
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;

    const keyboardManager = new KeyboardManager();

    const entityFactory = await loadEntities();
    const loadLevel = createLoadLevel(entityFactory);
    const level = await loadLevel('1_1');

    const view = new View(CONFIG.VIEW_WIDTH, CONFIG.VIEW_HEIGHT);

    const mario = level.getMario();

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
}

const canvas = document.getElementById('screen');
main(canvas);