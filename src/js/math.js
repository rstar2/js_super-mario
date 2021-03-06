export class Vector {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this._x = x;
        this._y = y;
    }

    clone() {
        return new Vector(this._x, this._y);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }


}

export class Matrix {
    constructor() {
        this._grid = [];
    }

    set(x, y, value) {
        if (!this._grid[x]) {
            this._grid[x] = [];
        }
        this._grid[x][y] = value;
    }

    delete(x, y) {
        const col = this._grid[x];
        col && delete col[y];
    }

    get(x, y) {
        const col = this._grid[x];
        return col ? col[y] : undefined;
    }

    forEach(callback) {
        this._grid.forEach((column, x) => {
            column.forEach((value, y) => callback(x, y, value));
        });
    }

    forEachInColumn(x, callback) {
        const column = this._grid[x];
        if (column) {
            column.forEach((value, y) => callback(x, y, value));
        }
    }

}