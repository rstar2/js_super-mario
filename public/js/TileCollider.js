class TileResolver {
    constructor(tiles, tileSize) {
        this._tiles = tiles;
        this._tileSize = tileSize;
    }

    _toIndex(pos) {
        return Math.floor(pos / this._tileSize);
    }

    getByIndex(indexX, indexY) {
        const tile = this._tiles.get(indexX, indexY);
        if (tile) {
            const y1 = indexY * this._tileSize;
            const y2 = y1 + this._tileSize;
            const x1 = indexX * this._tileSize;
            const x2 = x1 + this._tileSize;
            return {
                tile, y1, y2, x1, x2
            };
        }
    }

    getByPosition(pos) {
        return this.getByIndex(this._toIndex(pos.x), this._toIndex(pos.y));
    }

    getTileSize() {
        return this._tileSize;
    }
}



export default class TileCollider {
    constructor(tiles, tileSize) {
        this._tiles = new TileResolver(tiles, tileSize);
    }

    getTileResolver() {
        return this._tiles;
    }

    checkY(entity, match) {
        match = match || this._tiles.getByPosition(entity.pos);
        if (!match) {
            return;
        }

        // check if collided with a ground
        if (match.tile.name !== 'ground') {
            return;
        }

        // check if the entity is falling
        if (entity.vel.y > 0) {
            if (entity.pos.y > match.y1) {
                entity.pos.y = match.y1;
                entity.vel.y = 0;
            }
        } 
        // else if juming
        else if (entity.vel.y < 0) {
            if (entity.pos.y < match.y2) {
                entity.pos.y = match.y2;
                entity.vel.y = 0;
            }
        }
    }

    test(entity) {
        const match = this._tiles.getByPosition(entity.pos);
        if (match) {
            this.checkY(entity, match);
        }
    }
}