import { LayerManager } from './LayerManager.js';
import { EventEmitter } from './EventEmitter.js';

export class Scene {
    static EVENT_COMPLETE = Symbol('compete');

    /**
     * 
     * @param {String} name 
     */
    constructor(name) {
        this.NAME = name;
        this._layerManager = new LayerManager();
        this._eventEmitter = new EventEmitter();
    }

    /**
     * @param {(context: CanvasRenderingContext2D, view: View) => void} layer 
     */
    addLayer(layer) {
        this._layerManager.add(layer);
    }

    /**
     * 
     * @param {String} name 
     * @param {Function} listener 
     */
    addListener(name, listener) {
        this._eventEmitter.add(name, listener);
    }

    /**
     * 
     * @param {*} name 
     * @param {*[]} args 
     */
    emit(name, ...args) {
        this._eventEmitter.emit(name, ...args);
    }

    pause() {
        
    }

    /**
     * @param {GameContext} gameContext
     */
    update(gameContext) {
        throw new Error('Abstract method "update');
    }

    /**
     * @param {GameContext} gameContext
     */
    draw(gameContext) {
        this._layerManager.draw(gameContext.videoContext);
    }
}