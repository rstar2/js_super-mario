import { Vector } from './math.js';

export default class Entity {
    constructor() {
        this._pos = new Vector(0, 0);
        this._vel = new Vector(0, 0);
        this._size = new Vector(0, 0);

        this._traits = [];

        this._animations = new Map();
    }

    get pos() {
        return this._pos;
    }

    get vel() {
        return this._vel;
    }

    get size() {
        return this._size;
    }

    registerTrait(trait) {
        // remember all registered trait
        this._traits.push(trait);

        // expose it by its name to the entity
        this[trait.NAME] = trait;
    }

    registerAnimatation(animName, animation) {
        this._animations.set(animName, animation);
    }

    animate(level) {
        return Array.from(this._animations).reduce((accum, [animName, animation]) => {
            const trait = this[animName];
            // check to see if there's such Trait registered and if there is then
            // call it's animation method,
            // if not then use the level's total time as a progress for a animation
            // that is not connected to a Trait
            let { tile, mirrored } = trait ? trait.animate(this, animation, level.getTotalTime()) :
                animation(level.getTotalTime());
            if (accum.tile === undefined) {
                accum.tile = tile;
            }
            if (accum.mirrored === undefined) {
                accum.mirrored = mirrored;
            }
            return accum;
        }, {});
    }

    update(rate) {
        this._traits.forEach(trait => trait.update(this, rate));
    }

    // eslint-disable-next-line no-unused-vars
    draw(context, level) {
        throw new Error("Each Entity should overwrite this abstract method");
    }

}