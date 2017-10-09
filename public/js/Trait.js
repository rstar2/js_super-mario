export default class Trait {
    constructor(name) {
        this.NAME = name;
    }

    update(entity, rate) {
        throw new Error("Abstract method not implemented");
    }
}