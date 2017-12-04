export class TileResolver {
    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    constructor(tiles, tileSize) {
        this._tiles = tiles;
        this._tileSize = tileSize;
    }

    /**
     * @returns {Number}
     */
    getTileSize() {
        return this._tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this._tileSize);
    }

    toIndexRange(pos1, pos2) {
        // this method is axis agnostic
        const posMax = Math.ceil(pos2 / this._tileSize) * this._tileSize;

        const indexRange = [];
        let pos = pos1;
        do {
            indexRange.push(this.toIndex(pos));
            pos += this._tileSize;
        } while (pos < posMax);

        return indexRange;
    }

    getByIndex(indexX, indexY) {
        const tile = this._tiles.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * this._tileSize;
            const x2 = x1 + this._tileSize;
            const y1 = indexY * this._tileSize;
            const y2 = y1 + this._tileSize;
            return {
                tile, x1, x2, y1, y2
            };
        }
        return null;
    }

    getByPosition(posX, posY) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }

    getByRange(posX1, posX2, posY1, posY2) {
        const tiles = [];

        this.toIndexRange(posX1, posX2).forEach(indexX => {
            this.toIndexRange(posY1, posY2).forEach(indexY => {
                const tile = this.getByIndex(indexX, indexY);
                if (tile) {
                    tiles.push(tile);
                }
            });
        });

        return tiles;
    }

}