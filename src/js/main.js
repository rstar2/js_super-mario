import { CONFIG } from "./config.js";
import { View } from "./View.js";
import { Timer } from "./Timer.js";
import { KeyboardManager } from "./KeyboardManager.js";
import { setupMarioKeyboard } from "./keyboard.js";
import { createLoadLevel } from "./loaders/level.js";
import { loadEntities } from "./entities/entities.js";
import { setupMouseControl } from "./debug.js";
import { loadFont } from "./loaders/font.js";
import {
    createDebugTileCollisionLayer,
    createDebugEntityLayer,
    createDebugViewLayer
} from "./layers/debug.js";
import { createDashboardLayer } from "./layers/dashboard.js";
import { createPlayer, createPlayerEnvironment } from "./player.js";

async function main(canvas) {
    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;

    const audioContext = new AudioContext();

    const keyboardManager = new KeyboardManager();

    const entityFactory = await loadEntities(audioContext);
    const loadLevel = createLoadLevel(entityFactory);
    const level = await loadLevel("1_1");

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

    // FIXME: temporary this is here
    createPlayer(mario);
    const playerEnv = createPlayerEnvironment(mario, level);

    const font = await loadFont();
    level.addLayer(createDashboardLayer(font, playerEnv, level));

    // the game context that will hold different properties
    const gameContext = {
        /*AudioContext*/ audioContext,
        /*Object*/ entityFactory,
        /*Number*/ rate: 0,
    };

    const timer = new Timer(CONFIG.RATE);
    timer.update = function(rate) {
        gameContext.rate = rate;

        // update all level entities (including Mario)
        level.update(gameContext);

        // move the camera/view together with Mario
        // TODO: Don't position Mario always in the center, allow some margin left and right
        view.pos.x = Math.max(0, mario.pos.x - view.size.x / 2);

        // draw next frame
        level.draw(context, view);
    };

    timer.start();

    level.getMusicPlayer().play('main');
}

const canvas = document.getElementById("screen");
main(canvas);
