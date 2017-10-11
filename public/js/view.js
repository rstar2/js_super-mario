import { Vector } from './math.js';

export default class View {
    constructor() {
        this._pos = new Vector(0, 0);
    }

    get pos() {
        return this._pos;
    }
}