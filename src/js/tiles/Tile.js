export class Tile {
    /**
     * @param {{tile: String, type: String}} tileSpec 
     */
    constructor(tileSpec) {
        this._name = tileSpec.name;
        this._type = tileSpec.type;
    }

    /**
     * @property
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    /**
     * @property
     * @returns {String}
     */
    get type() {
        return this._type;
    }
}