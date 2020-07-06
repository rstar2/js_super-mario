import { Scene } from './Scene.js';
import { TileCollider } from './tiles/TileCollider.js';
import { EntityCollider } from './EntityCollider.js';
import { Camera } from './Camera.js';
import { CONFIG } from './config.js';
import { generatePlayer } from './player.js';

const PROPS_DEFAULT = { gravity: 0, time: 300 };

/**
 * 
 * @param {Level} level 
 */
function focusPlayer(level) {
    for (const player of generatePlayer(level)) {
        // move the camera/view together with Mario
        level._camera.pos.x = Math.max(0, player.pos.x - 100);
    }
}

export class Level extends Scene {
    
    static EVENT_TRIGGER = Symbol('trigger');

    /**
     * 
     * @param {String} name 
     * @param {Number} width 
     * @param {Number} height 
     * @param {{gravity:Number, time:Number, ...}} props 
     */
    constructor(name, width, height, props = {}) {
        super(name);
        this._tileCollider = new TileCollider();
        this._entities = new Set();

        this._entityCollider = new EntityCollider(this._entities);

        this._props = { ...PROPS_DEFAULT, ...props };

        this._camera = new Camera(CONFIG.VIEW_WIDTH, CONFIG.VIEW_HEIGHT);

        this._width = width;
        this._height = height;

        // total increasing time
        this._totalTime = 0;

        /**
         * @type {MusicController}
         */
        this._musicController = null;
    }

    /**
     * @param {MusicController}
     */
    setMusicController(musicController) {
        this._musicController = musicController;
    }

    /**
     * @returns {MusicPlayer}
     */
    getMusicController() {
        return this._musicController;
    }

    /**
     * @returns {TileCollider}
     */
    getTileCollider() {
        return this._tileCollider;
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

        focusPlayer(this);
    }

    /**
     * @param {GameContext} gameContext
     */
    draw(gameContext) {
        this._layerManager.draw(gameContext.videoContext, this._camera);
    }

    pause() {
        super.pause();
        this._musicController.pause();
    }

}