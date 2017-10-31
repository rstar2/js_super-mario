import { Vector } from './math.js';

export default class Entity {
    constructor() {
        // current possition
        this._pos = new Vector(0, 0);
        // current velocity
        this._vel = new Vector(0, 0);
        // current size
        this._size = new Vector(0, 0);
        // current offset (allow drawn size to be different that the real size)
        this._offset = new Vector(0, 0); // TODO: implement it

        this._lifetime = 0;

        this._traits = [];

        this._animations = new Map();
    }

    /**
     * @returns {Vector}
     */
    get pos() {
        return this._pos;
    }

    /**
     * @returns {Vector}
     */
    get vel() {
        return this._vel;
    }

    /**
     * @returns {Vector}
     */
    get size() {
        return this._size;
    }

    /**
     * @returns {Vector}
     */
    get offset() {
        return this._offset;
    }

    /**
     * @returns {Number}
     */
    get lifetime() {
        return this._lifetime;
    }

    /**
     * 
     * @param {Trait} trait 
     */
    registerTrait(trait) {
        // remember all registered trait
        this._traits.push(trait);

        // expose it by its name to the entity
        this[trait.NAME] = trait;
    }

    /**
     * Register an animation. It can be bound to a {@link Trait} instance.
     * It also allow a {@link Trait} to have multiple animations
     * Like main "walk", "walk-run", "walk-break", "walk-turbo", etc...
     * @param {String} animName 
     * @param {(progress: Number)} animation 
     */
    registerAnimation(animName, animation) {
        const idx = animName.indexOf('-');
        let mainName = animName;
        let subName = animName;
        if (idx > 0) {
            mainName = animName.substring(0, idx);
            subName = animName.substring(idx + 1);
        }
        let animations = this._animations.get(mainName);
        if (!animations) {
            animations = new Map();
            this._animations.set(mainName, animations);
        }
        animations.set(subName, animation);
    }

    /**
     * Move all registered animations from the {@link SpriteSheet} object to the entity
     * @param {SpriteSheet} sprites 
     */
    registerAnimationsFromSprites(sprites) {
        sprites.forEachAnimation((animation, name) => {
            this.registerAnimation(name, animation);
        });
    }

    /**
     * 
     * @param {Level} level 
     */
    animate(level) {
        return Array.from(this._animations).reduce((accum, [animName, animations]) => {
            // check to see if there's such Trait registered and if there is then
            // call it's animation method,
            // if not then use the level's total time as a progress for a animation
            // that is not connected to a Trait

            const trait = this[animName];
            if (trait) {
                let { tile, mirrored } = trait.animate(this, animations, level.getTotalTime());
                if (accum.tile === undefined) {
                    accum.tile = tile;
                }
                if (accum.mirrored === undefined) {
                    accum.mirrored = mirrored;
                }
            } else {
                throw new Error(`Unsupported standalone animation ${animName}`);
                // not used for now - all animation for an entity are connnected to a Trait.
                // thus if needed a "standalone" animation then a specific Trait can be created
                // just for it
            }

            return accum;
        }, {});
    }

    /**
     * 
     * @param {Number} rate 
     */
    update(rate) {
        this._traits.forEach(trait => trait.update(this, rate));

        // increase also the common lifetime of the entity
        this._lifetime += rate;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {Level} level 
     */
    // eslint-disable-next-line no-unused-vars
    draw(context, level) {
        throw new Error("Each Entity should overwrite this abstract method");
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Tile} obstacle 
     * @param {Number} direction 
     */
    collide(obstacle, direction) {
        this._traits.forEach(trait => trait.collide(this, obstacle, direction));
    }

}

/**
 * Collide directon TOP
 * @constant
 * @static
 */
Entity.COLLIDE_TOP = Symbol(1);
/**
 * Collide directon BOTTOM
 * @constant
 * @static
 */
Entity.COLLIDE_BOTTOM = Symbol(2);
/**
 * Collide directon LEFT
 * @constant
 * @static
 */
Entity.COLLIDE_LEFT = Symbol(3);
/**
 * Collide directon RIGHT
 * @constant
 * @static
 */
Entity.COLLIDE_RIGHT = Symbol(4);