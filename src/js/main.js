import { CONFIG } from "./config.js";
import { Timer } from "./Timer.js";
import { setupMarioKeyboard } from "./keyboard.js";
import { createLoadLevel } from "./loaders/level.js";
import { loadEntities } from "./loaders/entities.js";
import { setupMouseControl } from "./debug.js";
import { loadFont } from "./loaders/font.js";
import {
    createDebugTileCollisionsLayer,
    createDebugEntityLayer,
    createDebugViewLayer
} from "./layers/debug.js";
import { createDashboardLayer } from "./layers/dashboard.js";
import { createPlayerProgressLayer } from "./layers/playerProgress.js";
import { createBackgroundColorLayer } from "./layers/backgroundColor.js";
import { createTextLayer } from "./layers/text.js";
import { makePlayer, createPlayerEnvironment } from "./player.js";
import { Level } from "./Level.js";
import { Scene } from "./Scene.js";
import { SceneRunner } from "./SceneRunner.js";
import { ProgressScene } from "./ProgressScene.js";

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
async function main(canvas) {
    const videoContext = canvas.getContext("2d");
    videoContext.imageSmoothingEnabled = false;
    videoContext.mozImageSmoothingEnabled = false;
    videoContext.webkitImageSmoothingEnabled = false;

    const audioContext = new AudioContext();

    const entityFactory = await loadEntities(audioContext);
    const font = await loadFont();

    const player = makePlayer(entityFactory.mario(), 'MARIO');

    // setup the keyboard actions for Mario
    // adn start the keyboard manager
    const keyboard = setupMarioKeyboard(window);
    keyboard.addReceiver(player);

    const loadLevel = createLoadLevel(entityFactory);

    async function runLevel(name) {
        const loadingScene = new Scene('loading');
        loadingScene.addLayer(createTextLayer(font, `Loading level ${name}...`));
        sceneRunner.addScene(loadingScene);
        // this will show immediately the "loading" scene , but it will not show the 'level' scene
        // until "await loadLevel()" completes
        sceneRunner.next();

        const level = await loadLevel(name);

        level.addListener(Level.EVENT_TRIGGER, (triggerSpec, entity, touches) => {
            // for the "goto" trigger
            if (triggerSpec.type === "goto") {
                // check if any of the touch-entities is not the player
                for (const entityTouch of touches) {
                    if (entityTouch.player) {
                        // go to the specified level
                        runLevel(triggerSpec.name);
                        return;
                    }
                }
            }
        });

        // DEBUG: add Mario easy replacement if needed
        if (CONFIG.DEBUG_MARIO) {
            setupMouseControl(player, canvas, level);
        }

        // DEBUG: add visual collisions if needed
        if (CONFIG.DEBUG_TILE_COLLISION) {
            level.addLayer(createDebugTileCollisionsLayer(level));
            level.addLayer(createDebugEntityLayer(level));
        }

        if (CONFIG.DEBUG_VIEW_SCROLL) {
            level.addLayer(createDebugViewLayer());
        }

        level.addEntity(player);

        // FIXME: will be removed 
        level.addEntity(createPlayerEnvironment(player));
    
        const dashboardLayer = createDashboardLayer(font, level);
        level.addLayer(dashboardLayer);
    
        const waitScene = new ProgressScene('start', 2);
        waitScene.addLayer(createBackgroundColorLayer('#000'));
        waitScene.addLayer(dashboardLayer);
        waitScene.addLayer(createPlayerProgressLayer(font, level));
    
        sceneRunner.addScene(waitScene);
        sceneRunner.addScene(level);
        sceneRunner.next();
    }


    // the game context that will hold different properties
    const gameContext = {
        /*CanvasRenderingContext2D*/ videoContext,
        /*AudioContext*/ audioContext,
        /*{[factory]: Function} */ entityFactory,
        /*Number*/ rate: 0,
    };

    const sceneRunner = new SceneRunner();
    
    const timer = new Timer(CONFIG.RATE);
    timer.update = function(rate) {
        gameContext.rate = rate;

        sceneRunner.update(gameContext);
    };

    timer.start();

    runLevel('1-1');
}

const canvas = document.getElementById("screen");
canvas.style.display= 'none';

window.addEventListener('click', () => {
    document.getElementById('startInfo').remove();
    canvas.style.display = '';
    main(canvas);
}, {once: true});