import CONFIG from './config.js';
import LayerManager from './LayerManager.js';
import TileCollider from './TileCollider.js';
import { Matrix } from './math.js';
import { loadLevel as _loadLevel } from './utils.js';
import { loadBackgroudSprites } from './sprites.js';
import {
    createBackgroundLayer, createEntitiesLayer,
    createEntityLayer, createTileCollisionDebugLayer
} from './layers.js';


export default class Level {
    constructor(tileSize) {
        this._layerManager = new LayerManager();
        this._entities = new Set();
        this._tiles = new Matrix();
        this._tileCollider = new TileCollider(this._tiles, tileSize);

        // the gravity should be on the level - thus applied to all entities
        // make this a level property - maybe each level can have different gravity
        this._gavity = 2000;
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

    // utility method to do all all 'Mario' related stuff in one place
    addMario(mario) {
        // TODO - make this a level property
        mario.pos.set(64, 64);

        this.addEntity(mario);
        this.addLayer(createEntityLayer(mario));
    }

    update(rate) {
        this._entities.forEach(entity => {
            entity.update(rate);

            // NOTE !!! : the x an y positions SHOULD be updated separately
            // before checking for collisions 
            entity.pos.x += entity.vel.x * rate;
            this._tileCollider.checkX(entity);
            entity.pos.y += entity.vel.y * rate;
            this._tileCollider.checkY(entity);

            // add some gravity to all entities
            //  Note - it should be added finally after the tile-collision checks
            entity.vel.y += this._gavity * rate;
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
    return Promise.all([_loadLevel(levelName), loadBackgroudSprites()]).
        then(([levelSpec, backgroundSprites]) => {
            const level = new Level(CONFIG.TILE_SIZE);

            // attach tiles to the level's grid
            createTiles(levelSpec.backgrounds, level);

            level.addLayer(createBackgroundLayer(level, backgroundSprites));
            level.addLayer(createEntitiesLayer(levelSpec.entities));

            // DEBUG: add visual collisions if needed
            if (CONFIG.DEBUG_TILE_COLLISION) {
                level.addLayer(createTileCollisionDebugLayer(level));
            }

            return level;
        });
}