export class Trait {
    static EVENT_TASK = Symbol('task');

    constructor(name, isBehavior = false) {
        this.NAME = name;
        this._isBehavior = isBehavior;
        this._listeners = new Map();
    }

    /**
     * Add a listener for specific event name
     * @param {String} name
     * @param {Function} listener 
     */
    addListener(name, listener) {
        let listeners = this._listeners.get(name);
        if (!listeners) {
            listeners = [];
            this._listeners.set(name, listeners);
        }

        listeners.push(listener);
    }

    /**
     * Queue up a task to be executed when the {@see finalize} method is called
     * @param {Function} task 
     */
    queueTask(task) {
        this.addListener(Trait.EVENT_TASK, task);
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {GameContext} gameContext
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
     * Called once on each loop, after update
     * @param {EventBuffer} entityEventBuffer 
     */
    finalize(entityEventBuffer) {
        // process all stored events and notify all registered listeners
        // NOTE: this will also perform each queued tasks
        this._listeners.forEach((listeners, name) => {
            listeners.forEach(listener => {
                entityEventBuffer.process(name, listener);
            });
        });

        // tasks (e.g these types od listeners) are to be executed ONLY ONCE
        // a new task can be added later when needed
        this._listeners.delete(Trait.EVENT_TASK);
    }
    
}