import { Vector } from './math.js';

export class Camera {
    constructor(width, height) {
        this._pos = new Vector(0, 0);
        this._size = new Vector(width, height);
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
    get size() {
        return this._size;
    }
}