import { TileResolver } from './TileResolver.js';
import { handlers as ground} from './ground.js';
import { handlers as brick} from './brick.js';
import { handlers as coin} from './coin.js';

const handlers = {
    ground,
    brick,
    coin
};

/**
 * Context interface for any tile collision handlers
 * @typedef {Object} TileCollisionContext
 * @property {Entity} entity
 * @property {Tile} match
 * @property {GameContext} gameContext
 * @property {Level} level
 */

/**
 * 
 * @param {Entity} entity
 * @param {Tile} match
 * @param {TileResolver} tileResolver
 * @param {GameContext} gameContext
 * @param {Level} level 
 * @param {Boolean} isVertical 
 */
function handle(entity, match, tileResolver, gameContext, level, isVertical = false) {
    const aHandlers = handlers[match.tile.type];

    if (aHandlers) {
        aHandlers[isVertical ? 1 : 0]({entity, match, tileResolver, gameContext, level});
    }
}

export class TileCollider {
    
    constructor() {
        this._resolvers = [];
    }

    /**
     * @param {Matrix} tiles 
     * @param {Number} tileSize 
     */
    addTilesGrid(tiles, tileSize) {
        this._resolvers.push(new TileResolver(tiles, tileSize));
    }

    /**
     * TODO: Return just iterator
     * @returns {TileResolver[]}
     */
    getTileResolvers() {
        return this._resolvers;
    }

    /**
     * @param {Entity} entity
     * @param {GameContext} gameContext
     * @param {Level} level 
     */
    checkX(entity, gameContext, level) {
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

        this._resolvers.forEach(tileResolver => {
            const matches = tileResolver.getByRange(posX, posX,
                entity.bounds.top, entity.bounds.bottom);
    
            matches.forEach(match => {
                // handle depending on the tile's type (ground, brick, ...)
                handle(entity, match, tileResolver, gameContext, level, false);
            });
        });
    }

    /**
     * @param {Entity} entity
     * @param {GameContext} gameContext
     * @param {Level} level
     */
    checkY(entity, gameContext, level) {
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

        this._resolvers.forEach(tileResolver => {
            const matches = tileResolver.getByRange(entity.bounds.left, entity.bounds.right,
                posY, posY);
    
            matches.forEach(match => {
                // handle depending on the tile's type (ground, brick, ...)
                handle(entity, match, tileResolver, gameContext, level, true);
            });
        });
    }
}