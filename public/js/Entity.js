import { Vector } from './math.js';

export default class Entity {
    constructor(x, y) {
        this._pos = new Vector(0, 0);
        this._vel = new Vector(0, 0);

        this._traits = [];
    }

    get pos() {
        return this._pos;
    }

    get vel() {
        return this._vel;
    }

    registerTrait(trait) {
        // remember all registered trait
        this._traits.push(trait);

        // expose it by its name to the entity
        this[trait.NAME] = trait;
    }

    update(rate) {
        this._traits.forEach(trait => trait.update(this, rate));
    }

}