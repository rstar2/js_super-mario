import LayerManager from './LayerManager.js';
import Entity from './Entity.js';
import TileCollider from './TileCollider.js';
import EntityCollider from './EntityCollider.js';

export default class Level {
    /**
     * 
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     * @param {{gravity:Number}} param2 
     */
    constructor(tiles, tileSize, { gravity = 0 }) {
        this._tileCollider = new TileCollider(tiles, tileSize);
        this._layerManager = new LayerManager();
        this._entities = new Set();

        this._entityCollider = new EntityCollider(this._entities);

        // the gravity should be on the level - thus applied to all entities
        this._gravity = gravity;

        // compute the width and height from the tiles and tileSize
        let maxX = 0, maxY = 0;
        tiles.forEach((x, y, tile) => {
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
            tile._name == 0;
        });
        this._width = maxX * tileSize;
        this._height = maxY * tileSize;

        this._totalTime = 0;
    }

    /**
     * @returns {TileCollider}
     */
    getTileCollider() {
        return this._tileCollider;
    }

    /**
     * 
     * @param {(progress: Entity)} callback 
     */
    forEachEntity(callback) {
        this._entities.forEach(entity => callback(entity));
    }

    /**
     * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
     */
    addLayer(layer) {
        this._layerManager.add(layer);
    }

    /**
     * @param {Entity} entity 
     */
    addEntity(entity) {
        this._entities.add(entity);
    }

    /**
     * @param {Entity} entity
     * @returns {Boolean} 
     */
    removeEntity(entity) {
        return this._entities.delete(entity);
    }

    /**
     * 
     * @param {Entity} entity
     * @returns {Boolean} 
     */
    hasEntity(entity) {
        return this._entities.has(entity);
    }

    getMario() {
        return [...this._entities].find(entity => entity.NAME === 'mario');
    }

    /**
     * @returns {Number}
     */
    getTotalTime() {
        return this._totalTime;
    }

    /**
     * @returns {Number}
     */
    getWidth() {
        return this._width;
    }

    /**
     * @returns {Number}
     */
    getHeight() {
        return this._height;
    }

    /**
     * @param {Number} rate 
     */
    update(rate) {
        this._entities.forEach(entity => {
            entity.update(rate, this);

            // add some gravity to all entities
            // NOTE !!! : applying the gravity SHOULD be after the tile collision check have been made
            if (this._gravity) {
                entity.vel.y += this._gravity * rate;
            }
        });

        // check if entities collide with each other
        // NOTE !!! : it SHOULD be after all entities have been passed through the first loop
        this._entities.forEach(entity => {
            this._entityCollider.check(entity);
        });

        // finally execute all queued tasks,
        // in order to avoid updates in from the traits depending on the order they are registered
        this._entities.forEach(entity => entity.finalize());

        this._totalTime += rate;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {View} view 
     */
    draw(context, view) {
        this._layerManager.draw(context, view);
    }

}