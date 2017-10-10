import CONFIG from './config.js';
import LayerManager from './LayerManager.js'
import Entity from './Entity.js'
import { KEY_SPACE } from './KeyboardManager.js';
import { loadLevel as _loadLevel } from './utils.js'
import { loadBackgroudSprites, loadCharacterSprites } from './sprites.js';
import { createEntityMario } from './entities.js';
import { createBackgroundLayer, createEntitiesLayer, createEntityLayer } from './layers.js';


export default class Level {
    constructor() {
        this._layerManager = new LayerManager();

        this._entities = new Set();
    }

    init(keyManager) {
        // todo - fix
        keyManager.register(KEY_SPACE, keyState => {
            if (keyState) {
                this._mario.jump.start();
            } else {
                this._mario.jump.cancel();
            }
        });
    }

    addLayer(layer) {
        this._layerManager.add(layer);
    }

    addEntity(entity) {
        this._entities.add(entity);
    }

    update(rate) {
        this._entities.forEach(entity => entity.update(rate));
    }

    updateAfter(rate) {
        this._entities.forEach(entity => entity.updateAfter(rate));
    }

    draw(context) {
        this._layerManager.draw(context);
    }
}

export function loadLevel(levelName) {
    return Promise.all([_loadLevel(levelName), loadBackgroudSprites(), createEntityMario()]).
        then(([levelSpec, backgroundSprites, mario]) => {
            const level = new Level();

            level.addLayer(createBackgroundLayer(backgroundSprites, levelSpec.backgrounds));
            level.addLayer(createEntitiesLayer(levelSpec.entities));

            // todo - fix
            level.addEntity(mario);
            mario.pos.set(64, 180);
            mario.vel.set(200, -600);
            mario.updateAfter = function (rate) {
                // add some gravity to the entity
                this.vel.y += CONFIG.GRAVITY * rate;
            };
            level._mario = mario;

            level.addLayer(createEntityLayer(mario));

            return level;
        });
}