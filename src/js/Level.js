import { LayerManager } from './LayerManager.js';
import { TileCollider } from './tiles/TileCollider.js';
import { EntityCollider } from './EntityCollider.js';

const PROPS_DEFAULT = { gravity: 0, time: 300 };

export class Level {
    /**
     * 
     * @param {String} name 
     * @param {Number} width 
     * @param {Number} height 
     * @param {{gravity:Number, time:Number, ...}} props 
     */
    constructor(name, width, height, props = {}) {
        this.NAME = name;
        this._tileCollider = new TileCollider();
        this._layerManager = new LayerManager();
        this._entities = new Set();

        this._entityCollider = new EntityCollider(this._entities);

        this._props = { ...PROPS_DEFAULT, ...props };

        this._width = width;
        this._height = height;

        this._totalTime = 0;
    }

    /**
     * @returns {TileCollider}
     */
    getTileCollider() {
        return this._tileCollider;
    }

    /**
     * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
     */
    addLayer(layer) {
        this._layerManager.add(layer);
    }

    /**
     * @param {(progress: Entity)} callback 
     */
    forEachEntity(callback) {
        this._entities.forEach(entity => callback(entity));
    }

    /**
     * @generator
     * @yields {Entity} next entity
     */
    *generateEntity() {
        for (const entity of this._entities) {
            yield entity;
        }
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
     * @param {*} name 
     */
    getProp(name) {
        return this._props[name];
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
     * @param {GameContext} gameContext
     */
    update(gameContext) {
        const { rate } = gameContext;
        this._entities.forEach(entity => {
            entity.update(gameContext, this);

            // add some gravity to all entities
            // NOTE !!! : applying the gravity SHOULD be after the tile collision check have been made
            if (this._props.gravity) {
                entity.vel.y += this._props.gravity * rate;
            }
        });

        // check if entities collide with each other
        // NOTE !!! : it SHOULD be after all entities have been passed through the first loop
        this._entities.forEach(entity => {
            this._entityCollider.check(entity);
        });

        // finally execute all queued tasks,
        // in order to avoid updates from the traits depending on the order they are registered
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