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
            posX = entity.bounds.right;
        } else {
            // moving backwards/left
            posX = entity.bounds.left;
        }

        const matches = this._tiles.getByRange(posX, posX,
            entity.bounds.top, entity.bounds.bottom);

        matches.forEach(match => {
            // check if collided with a ground
            if (match.tile.type !== 'ground') {
                return;
            }

            // check if the entity is going right
            if (entity.vel.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.bounds.right = match.x1;
                    entity.vel.x = 0;

                    entity.collide(match.tile, Entity.COLLIDE_RIGHT);
                }
            }
            // else if going left
            else if (entity.vel.x < 0) {
                if (entity.bounds.left < match.x2) {
                    entity.bounds.left = match.x2;
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
            posY = entity.bounds.bottom;
        } else {
            // moving up
            posY = entity.bounds.top;
        }

        const matches = this._tiles.getByRange(entity.bounds.left, entity.bounds.right,
            posY, posY);

        matches.forEach(match => {
            // check if collided with a ground
            if (match.tile.type !== 'ground') {
                return;
            }

            // check if the entity is going down (falling)
            if (entity.vel.y > 0) {
                if (entity.bounds.bottom > match.y1) {
                    entity.bounds.bottom = match.y1;
                    entity.vel.y = 0;

                    entity.collide(match.tile, Entity.COLLIDE_BOTTOM);
                }
            }
            // else if going up (jumping)
            else if (entity.vel.y < 0) {
                if (entity.bounds.top < match.y2) {
                    entity.bounds.top = match.y2;
                    entity.vel.y = 0;

                    entity.collide(match.tile, Entity.COLLIDE_TOP);
                }
            }
        });
    }
}