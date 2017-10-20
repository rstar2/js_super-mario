import Entity from './Entity.js';
import TileResolver from './TileResolver.js';

export default class TileCollider {
    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    constructor(tiles, tileSize) {
        this._tiles = new TileResolver(tiles, tileSize);
    }

    /**
     * @returns {TileResolver}
     */
    getTileResolver() {
        return this._tiles;
    }

    /**
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

    /**
     * @param {Entity} entity 
     */
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