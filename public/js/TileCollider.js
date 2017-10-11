class TileResolver {
    constructor(tiles, tileSize) {
        this._tiles = tiles;
        this._tileSize = tileSize;
    }

    getTileSize() {
        return this._tileSize;
    }

    _toIndex(pos) {
        return Math.floor(pos / this._tileSize);
    }

    _toIndexRange(pos1, pos2) {
        // this method is axis agnostic
        const posMax = Math.ceil(pos2 / this._tileSize) * this._tileSize;

        const indexRange = [];
        let pos = pos1;
        do {
            indexRange.push(this._toIndex(pos));
            pos += this._tileSize;
        } while (pos < posMax);

        return indexRange;
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
        return null;
    }

    getByPosition(posX, posY) {
        return this.getByIndex(this._toIndex(posX), this._toIndex(posY));
    }

    getByRange(posX1, posX2, posY1, posY2) {
        const tiles = [];

        this._toIndexRange(posX1, posX2).forEach(indexX => {
            this._toIndexRange(posY1, posY2).forEach(indexY => {
                const tile = this.getByIndex(indexX, indexY);
                if (tile) {
                    tiles.push(tile);
                }
            });
        });

        return tiles;
    }

}



export default class TileCollider {
    constructor(tiles, tileSize) {
        this._tiles = new TileResolver(tiles, tileSize);
    }

    getTileResolver() {
        return this._tiles;
    }

    checkY(entity) {

        const matches = this._tiles.getByRange(entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);


        matches.forEach(match => {
            // check if collided with a ground
            if (match.tile.name !== 'ground') {
                return;
            }

            // check if the entity is falling
            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y> match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
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
        });
    }

    test(entity) {
        const entityTile = this._tiles.getByPosition(entity.pos.x, entity.pos.y);
        if (entityTile) {
            this.checkY(entity);
        }
    }
}