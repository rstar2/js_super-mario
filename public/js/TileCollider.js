import CONFIG from './config.js';


class TileResolver {
    constructor(tiles, tileSize = CONFIG.TILE_SIZE) {
        this._tiles = tiles;
        this._tileSize = tileSize;
    }

    _toIndex(pos) {
        return Math.floor(pos / this._tileSize);
    }

    getByIndex(x, y) {
        const tile = this._tiles.get(x, y);
        if (tile) {
            return {
                tile,
            }
        }
    }

    getByPosition(pos) {
        return this.getByIndex(this._toIndex(pos.x), this._toIndex(pos.y));
    }
}



export default class TileCollider {
    constructor(tiles) {
        this._tiles = new TileResolver(tiles);
    }

    test(entity) {
        const match = this._tiles.getByPosition(entity.pos);
        if (match) {
            console.log('Matched tile' , match, match.tile);
        }
    }
}