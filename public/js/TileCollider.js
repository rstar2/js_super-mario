import Entity from './Entity.js';

class TileResolver {
    constructor(tiles, tileSize) {
        this._tiles = tiles;
        this._tileSize = tileSize;
    }

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



export default class TileCollider {
    constructor(tiles, tileSize) {
        this._tiles = new TileResolver(tiles, tileSize);
    }

    getTileResolver() {
        return this._tiles;
    }

    /**
     * 
     * @param {Entity} entity 
     */
    checkX(entity) {
        // this will optimise to search for collisions only on the borders of the entity
        // not also inside it as we don't need them
        let posX;
        if (entity.vel.x === 0) {
            // we are not moving at all - don't do any checks
            return;
        } else if (entity.vel.x > 0) {
            // moving forward/right
            posX = entity.pos.x + entity.size.x;
        } else {
            // moving backwards/left
            posX = entity.pos.x;
        }

        const matches = this._tiles.getByRange(posX, posX,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(match => {
            // check if collided with a ground
            if (match.tile.type !== 'ground') {
                return;
            }

            // check if the entity is going right
            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x> match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;

                    entity.collide(match.tile, Entity.COLLIDE_RIGHT);
                }
            }
            // else if going left
            else if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;

                    entity.collide(match.tile, Entity.COLLIDE_LEFT);
                }
            }
        });
    }

    checkY(entity) {
        let posY;
        if (entity.vel.y === 0) {
            // we are not moving at all - don't do any checks
            return;
        } else if (entity.vel.y > 0) {
            // moving down
            posY = entity.pos.y + entity.size.y;
        } else {
            // moving up
            posY = entity.pos.y;
        }

        const matches = this._tiles.getByRange(entity.pos.x, entity.pos.x + entity.size.x,
            posY, posY);

        matches.forEach(match => {
            // check if collided with a ground
            if (match.tile.type !== 'ground') {
                return;
            }

            // check if the entity is going down (falling)
            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y> match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;

                    entity.collide(match.tile, Entity.COLLIDE_BOTTOM);
                }
            }
            // else if going up (juming)
            else if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;

                    entity.collide(match.tile, Entity.COLLIDE_TOP);
                }
            }
        });
    }
}