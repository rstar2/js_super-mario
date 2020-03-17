import * as logger from '../logger.js';

/**
 * @param {Level} level
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function createDebugTileCollisionLayer(level) {
    // TODO:
    const tileResolvers = level.getTileCollider().getTileResolvers();
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
 * @param {View} view
 * @returns {(context: CanvasRenderingContext2D, view: View) => void}
 */
export function createDebugViewLayer(viewToDraw) {
    return function (context, view) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(viewToDraw.pos.x - view.pos.x, viewToDraw.pos.y - view.pos.y,
            view.size.x, view.size.y);
        context.stroke();
    };
}