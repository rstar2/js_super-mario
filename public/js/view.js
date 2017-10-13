import { Vector } from './math.js';

export default class View {
    constructor(width, height) {
        this._pos = new Vector(0, 0);
        this._size = new Vector(width, height);
    }

    get pos() {
        return this._pos;
    }

    get size() {
        return this._size;
    }
}