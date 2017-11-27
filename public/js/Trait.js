import Tile from './Tile.js';

export default class Trait {
    constructor(name, isBehavior = false) {
        this.NAME = name;
        this._isBehavior = isBehavior;
        this._queuedTasks = [];
    }

    finalize() {
        // perform each queued tasks
        this._queuedTasks.forEach(task => task());
        this._queuedTasks.length = 0;
    }

    /**
     * Queue up a task to be executed when the {@see finalize} method is called
     * @param {Function} task 
     */
    queueTask(task) {
        this._queuedTasks.push(task);
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} rate
     * @param {Level} level 
     */
    // eslint-disable-next-line no-unused-vars
    update(entity, rate, level) {
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
     * @param {Tile} obstacle 
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
}