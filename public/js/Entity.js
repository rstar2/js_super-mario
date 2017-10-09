import { Vector } from './math.js';

export default class Entity {
    constructor(x, y) {
        this._pos = new Vector(0, 0);
        this._vel = new Vector(0, 0);
    }

    get position() {
        return this._pos;
    }

    get velocity() {
        return this._vel;
    }

    update(deltaTime) {
        this.position.update(this.velocity.x * deltaTime, this.velocity.y * deltaTime);
    }

}