export default class Trait {
    constructor(name) {
        this.NAME = name;
    }

    // eslint-disable-next-line no-unused-vars
    update(entity, rate) { 
        throw new Error("Abstract method not implemented");
    }
}