import Tile from './Tile.js';

export default class Trait {
    constructor(name) {
        this.NAME = name;
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Number} rate 
     */
    // eslint-disable-next-line no-unused-vars
    update(entity, rate) {
        throw new Error("Abstract method 'update' is not implemented");
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {(progress: Number)} animation 
     * @param {Number} levelTotalTime 
     */
    // should return an object { tile, mirrored }
    // with the next frame/tile name to be drawn, and whether or not it's mirrored in the sprites
    // eslint-disable-next-line no-unused-vars
    animate(entity, animation, levelTotalTime) {
        throw new Error("Abstract method 'animate' is not implemented");
    }

    /**
     * 
     * @param {Entity} entity 
     * @param {Tile} obstacle 
     * @param {Number} direction 
     */
    // eslint-disable-next-line no-unused-vars
    collide(entity, obstacle, direction) {
        // keep empty , inheritors may overwrite it they need to
    }
}