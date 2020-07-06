import { Trait } from '../Trait.js';

export class TriggerTrait extends Trait {
    constructor() {
        super('trigger');

        // trigger callbacks
        this._triggers = [];

        // use Set/array as theoretically not only a single entity
        // can collide with this trait in a single frame
        this._touches = new Set();
    }

    /**
     * 
     * @param {Function} trigger 
     */
    addTrigger(trigger) {
        this._triggers.push(trigger);
    }

    /**
     * @param {Entity} us 
     * @param {Entity} otherEntity 
     */
    collided(us, otherEntity) {
        this._touches.add(otherEntity);
    }

    /**
     * @param {Entity} entity
     * @param {{rate: Number, audioContext: AudioContext}} gameContext
     * @param {Level} level  
     */
    update(entity, gameContext, level) {
        if (this._touches.size > 0) {
            for (const trigger of this._triggers) {
                trigger(entity, this._touches);
            }
            this._touches.clear();
        }
    }
}