import {EventEmitter} from './EventEmitter.js';

export class Trait {
    constructor(name, isBehavior = false) {
        this.NAME = name;
        this._isBehavior = isBehavior;
        this._queuedTasks = [];
        this._queuedSounds = new Set();
        this._eventEmitter = new EventEmitter();
    }

    /**
     * 
     * @param {String} name
     * @param {Function} listener 
     */
    addListener(name, listener) {
        this._eventEmitter.add(name, listener);
    }

    finalize() {
        // perform each queued tasks
        this._queuedTasks.forEach(task => task());
        this._queuedTasks.length = 0;
    }

    /**
     * Add a sound to be played
     * @param {String} name 
     */
    sound(name) {
        this._queuedSounds.add(name);
    }

    /**
     * Queue up a task to be executed when the {@see finalize} method is called
     * @param {Function} task 
     */
    queueTask(task) {
        this._queuedTasks.push(task);
    }

    /**
     * Play all queued sounds
     * @param {AudioBoard} audioBoard
     * @param {AudioContext} audioContext
     */
    playSounds(audioBoard, audioContext) {
        this._queuedSounds.forEach(name => audioBoard.play(name, audioContext));
        this._queuedSounds.clear();
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {{rate: Number, audioContext: AudioContext}} gameContext
     * @param {Level} level 
     */
    // eslint-disable-next-line no-unused-vars
    update(entity, gameContext, level) {
        if (!this._isBehavior) {
            throw new Error("Abstract method 'update' is not implemented");
        }
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Map<name:String, (progress: Number)>} animations 
     * @param {Number} levelTotalTime 
     */
    // should return an object { tile, mirrored }
    // with the next frame/tile name to be drawn, and whether or not it's mirrored in the sprites
    // eslint-disable-next-line no-unused-vars
    animate(entity, animations, levelTotalTime) {
        if (!this._isBehavior) {
            throw new Error("Abstract method 'animate' is not implemented");
        }
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {{tile:Tile, x1:Number, x2:Number, y1:Number, y2:Number}} obstacle 
     * @param {Number} direction 
     */
    // eslint-disable-next-line no-unused-vars
    obstructed(entity, obstacle, direction) {
        // keep empty , inheritors may overwrite it they need to
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Entity} otherEntity 
     */
    // eslint-disable-next-line no-unused-vars
    collided(entity, otherEntity) {
        // keep empty , inheritors may overwrite it they need to
    }

    /**
     * 
     * @param {String} name 
     * @param  {...any} args
     * @protected
     */
    _emit(name, ...args) {
        this._eventEmitter.emit(name, ...args);
    }
}