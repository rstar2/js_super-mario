export class Vector {
    constructor(x, y) {
        this.set(x, y);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set(x, y) {
        this._x = x;
        this._y = y;
    }

    updateBy(x, y) {
        this._x += x;
        this._y += y;
    }
}