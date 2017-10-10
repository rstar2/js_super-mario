import CONFIG from './config.js';
import LayerManager from './LayerManager.js';
import Entity from './Entity.js';
import TileCollider from './TileCollider.js';
import { KEY_SPACE } from './KeyboardManager.js';
import { Matrix } from './math.js';
import { loadLevel as _loadLevel } from './utils.js';
import { loadBackgroudSprites, loadCharacterSprites } from './sprites.js';
import { createEntityMario } from './entities.js';
import {
    createBackgroundLayer, createEntitiesLayer, createEntityLayer,
    createTileDebugLayer
} from './layers.js';


export default class Level {
    constructor(tileSize) {
        this._layerManager = new LayerManager();
        this._entities = new Set();
        this._tiles = new Matrix();
        this._tileCollider = new TileCollider(this._tiles, tileSize);
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

    setTile(x, y, tile) {
        this._tiles.set(x, y, { name: tile });
    }

    forEachTile(callback) {
        this._tiles.forEach((x, y, tile) => {
            callback(x, y, tile.name);
        });
    }

    forEachEntity(callback) {
        this._entities.forEach(entity => callback(entity));
    }

    addLayer(layer) {
        this._layerManager.add(layer);
    }

    addEntity(entity) {
        this._entities.add(entity);
    }

    update(rate) {
        this._entities.forEach(entity => {
            entity.update(rate);

            this._tileCollider.test(entity);
        });
    }

    updateAfter(rate) {
        this._entities.forEach(entity => {
            entity.updateAfter(rate);
        });
    }

    draw(context) {
        this._layerManager.draw(context);
    }

    getTileCollider() {
        return this._tileCollider;
    }
}

function createTiles(backgrounds, level) {
    backgrounds.forEach(background => {
        const tile = background.tile;
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; x++) {
                for (let y = y1; y < y2; y++) {
                    level.setTile(x, y, tile);
                }
            }
        });
    });
}


export function loadLevel(levelName) {
    return Promise.all([_loadLevel(levelName), loadBackgroudSprites(), createEntityMario()]).
        then(([levelSpec, backgroundSprites, mario]) => {
            const level = new Level(CONFIG.TILE_SIZE);

            // attach tiles to the level's grid
            createTiles(levelSpec.backgrounds, level);

            level.addLayer(createBackgroundLayer(level, backgroundSprites));
            level.addLayer(createEntitiesLayer(levelSpec.entities));

            // todo - fix
            level.addEntity(mario);
            mario.pos.set(64, 180);
            mario.updateAfter = function (rate) {
                // add some gravity to the entity
                this.vel.y += CONFIG.GRAVITY * rate;
            };
            level._mario = mario;

            // debug utility
            const canvas = document.getElementById('screen');
            ['mousedown', 'mousemove'].forEach(eventName => {
                canvas.addEventListener(eventName, event => {
                    if (event.buttons === 1) {
                        mario.vel.set(0, 0);
                        mario.pos.set(event.offsetX, event.offsetY);
                    }
                })
            });

            level.addLayer(createEntityLayer(mario));

            level.addLayer(createTileDebugLayer(level));

            return level;
        });
}