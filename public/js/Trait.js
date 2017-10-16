export default class Trait {
    constructor(name) {
        this.NAME = name;
    }

    // eslint-disable-next-line no-unused-vars
    update(entity, rate) {
        throw new Error("Abstract method 'update' is not implemented");
    }

    // should return an object { tile, mirrored }
    // with the next frame/tile name to be drawn, and whether or not it's mirrored in the sprites
    // eslint-disable-next-line no-unused-vars
    animate(entity, animation) {
        throw new Error("Abstract method 'animate' is not implemented");
    }
}