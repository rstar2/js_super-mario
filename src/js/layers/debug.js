import * as logger from '../logger.js';

/**
 * @param {TileResolver} tileResolver
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
function createDebugTileCollisionLayer(tileResolver) {
    const tileSize = tileResolver.getTileSize();

    const collisionTiles = [];
    // create a SPY on the resolver method
    const getIndexByORIG = tileResolver.getByIndex;
    tileResolver.getByIndex = function (indexX, indexY) {
        collisionTiles.push({ indexX, indexY });
        return getIndexByORIG.call(this, indexX, indexY);
    };

    return function (context, view) {
        logger.logDbg("Debug tile-collision layer", collisionTiles.length);

        const { x, y } = view.pos;
        // draw a box around each collision-tile
        context.strokeStyle = 'green';
        collisionTiles.forEach(({ indexX, indexY }) => {
            context.beginPath();
            context.rect(indexX * tileSize - x, indexY * tileSize - y,
                tileSize, tileSize);
            context.stroke();
        });
        collisionTiles.length = 0;
    };
}

/**
 * @param {Level} level
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function createDebugTileCollisionsLayer(level) {
    const tileResolvers = level.getTileCollider().getTileResolvers();

    const tileResolversLayers = tileResolvers.map(createDebugTileCollisionLayer);

    return function (context, view) {
        logger.logDbg("Debug tile-collision layers");

        tileResolversLayers.forEach(draw => draw(context, view));
    };
    
}

/**
 * @param {Level} level
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function createDebugEntityLayer(level) {
    return function (context, view) {
        logger.logDbg("Debug entity layer");

        const { x, y } = view.pos;

        // draw a box around each entity
        // Note - the entity may not be perfectly fit in a grid tile
        context.strokeStyle = 'red';
        level.forEachEntity(entity => {
            context.beginPath();
            context.rect(entity.bounds.left - x, entity.bounds.top - y,
                entity.size.x, entity.size.y);
            context.stroke();
        });
    };
}

/**
 * TODO: Fix this as currently its useless
 * @returns {(context: CanvasRenderingContext2D, view: View) => void}
 */
export function createDebugViewLayer() {
    return function (context, view) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(view.pos.x - view.pos.x, view.pos.y - view.pos.y,
            view.size.x, view.size.y);
        context.stroke();
    };
}