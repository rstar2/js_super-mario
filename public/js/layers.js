import * as logger from './logger.js';
import CONFIG from './config.js';
import TileResolver from './TileResolver.js';

/**
 * this will redraw the whole level everytime
 * @param {Level} level 
 * @param {Matrix} tiles 
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function ___createBackgroundLayer(level, tiles, tileSize, sprites) {
    // create a static/cached bachground image buffer from the level's tiles
    const buffer = document.createElement('canvas');
    buffer.width = level.getWidth();
    buffer.height = level.getHeight();
    const imageContext = buffer.getContext('2d');

    tiles.forEach((x, y, tile) => {
        sprites.drawTile(tile.name, imageContext, x, y);
    });

    return function (context, view) {
        logger.logDbg("Background layer");
        context.drawImage(buffer, -view.pos.x, -view.pos.y);
    };
}

/**
 * OPTIMIZATION - this will draw NEW columns only when only on demand (when needed while scrolling)
 * Note - old already drawn columns are already buffered
 * Note - with this case we still have a very huge buffer (as we've set the whole level's size) 
 * in memory.
 * @param {Level} level
 * @param {Matrix} tiles 
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function __createBackgroundLayer(level, tiles, tileSize, sprites) {
    const tileResolver = new TileResolver(tiles, tileSize);

    // create a static/cached bachground image buffer from the level's tiles
    const buffer = document.createElement('canvas');
    buffer.width = level.getWidth();
    buffer.height = level.getHeight();
    const bufferContext = buffer.getContext('2d');

    function redraw(indexStart, indexEnd) {
        for (let x = indexStart; x <= indexEnd; x++) {
            tiles.forEachInColumn(x, (x, y, tile) => {
                sprites.drawTile(tile.name, bufferContext, x, y);
            });
        }
    }

    let drawnIndexEnd = 0;
    return function (context, view) {
        logger.logDbg("Background layer");

        // redraw just the needed view
        const drawWidth = tileResolver.toIndex(view.size.x);
        const drawIndexStart = tileResolver.toIndex(view.pos.x);
        const drawIndexEnd = drawIndexStart + drawWidth;
        if (drawnIndexEnd < drawIndexEnd) {
            drawnIndexEnd = drawIndexEnd;
            logger.logDbg("Background layer - draw news column up to ", drawnIndexEnd);
            redraw(drawIndexStart, drawIndexEnd);
        }


        context.drawImage(buffer, -view.pos.x, -view.pos.y);
    };
}

/**
 * OPTIMIZATION - keep a small buffur in memory - just as needed to draw the view
 * so a little wider than view's size
 * ALso - we can redraw ONLY when there's a change in view's position
 * @param {Level} level 
 * @param {Matrix} tiles
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function _createBackgroundLayer(level, tiles, tileSize, sprites) {
    const tileResolver = new TileResolver(tiles, tileSize);

    // create a static/cached bachground image buffer from the level's tiles
    const buffer = document.createElement('canvas');
    buffer.width = CONFIG.VIEW_WIDTH + tileSize;
    buffer.height = CONFIG.VIEW_HEIGHT;
    const bufferContext = buffer.getContext('2d');


    function redraw(indexStart, indexEnd) {
        let hasTileAnimations = false;
        for (let x = indexStart; x <= indexEnd; x++) {
            tiles.forEachInColumn(x, (x, y, tile) => {
                const tileName = tile.name;
                if (sprites.isTileAnim(tileName)) {
                    // animate the tile
                    sprites.drawTileAnim(tileName, bufferContext, x - indexStart, y, level.getTotalTime());
                    hasTileAnimations = true;
                } else {
                    // normal tie tile draw
                    sprites.drawTile(tileName, bufferContext, x - indexStart, y);
                }
            });
        }
        return hasTileAnimations;
    }

    let lastIndexStart, lastIndexEnd, hasTileAnimations;

    return function (context, view) {
        logger.logDbg("Background layer");

        // redraw just the needed view an ONLY when needed
        const drawWidth = tileResolver.toIndex(view.size.x);
        const drawIndexStart = tileResolver.toIndex(view.pos.x);
        const drawIndexEnd = drawIndexStart + drawWidth;

        // redraw if there are animations or view's positions has changed
        if (hasTileAnimations ||
            (lastIndexStart !== drawIndexStart && lastIndexEnd !== drawIndexEnd)) {
            logger.logDbg("Background layer redrawing");
            hasTileAnimations = redraw(drawIndexStart, drawIndexEnd);
            lastIndexStart = drawIndexStart;
            lastIndexEnd = drawIndexEnd;
        }

        context.drawImage(buffer, -view.pos.x % tileSize, -view.pos.y);
    };
}

/**
 * OPTIMIZATION - keep a small buffur in memory - just as needed to draw the view
 * so a little wider than view's size
 * ALso - we can redraw ONLY when there's a change in view's position
 * @param {Level} level 
 * @param {Matrix} tiles
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function createBackgroundLayer(level, tiles, tileSize, sprites) {
    const tileResolver = new TileResolver(tiles, tileSize);

    // create a static/cached bachground image buffer from the level's tiles
    const buffer = document.createElement('canvas');
    buffer.width = CONFIG.VIEW_WIDTH + tileSize;
    buffer.height = CONFIG.VIEW_HEIGHT;
    const bufferContext = buffer.getContext('2d');


    function redraw(indexStart, indexEnd) {
        bufferContext.clearRect(0, 0, buffer.width, buffer.height);
        for (let x = indexStart; x <= indexEnd; x++) {
            tiles.forEachInColumn(x, (x, y, tile) => {
                const tileName = tile.name;
                if (sprites.isTileAnim(tileName)) {
                    // animate the tile
                    sprites.drawTileAnim(tileName, bufferContext, x - indexStart, y, level.getTotalTime());
                } else {
                    // normal tie tile draw
                    sprites.drawTile(tileName, bufferContext, x - indexStart, y);
                }
            });
        }
    }

    return function (context, view) {
        logger.logDbg("Background layer");

        // redraw just the needed view an ONLY when needed
        const drawWidth = tileResolver.toIndex(view.size.x);
        const drawIndexStart = tileResolver.toIndex(view.pos.x);
        const drawIndexEnd = drawIndexStart + drawWidth;

        logger.logDbg("Background layer redrawing");
        redraw(drawIndexStart, drawIndexEnd);

        context.drawImage(buffer, -view.pos.x % tileSize, -view.pos.y);
    };
}

/**
 * @param {Level} level 
 * @param {Number} maxEntityWidth 
 * @param {Number} maxEntityHeight
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function createEntitiesLayer(level, maxEntityWidth = 64, maxEntityHeight = 64) {
    // create a middle image buffer in which each entity will be drawn first
    const buffer = document.createElement('canvas');
    buffer.width = maxEntityWidth;
    buffer.height = maxEntityHeight;
    const bufferContext = buffer.getContext('2d');

    return function (context, view) {
        logger.logDbg("Entities layer");

        const { x, y } = view.pos;
        level.forEachEntity(entity => {
            // draw the entity tile in the buffer image after it's been cleared
            bufferContext.clearRect(0, 0, maxEntityWidth, maxEntityHeight);
            entity.draw(bufferContext, level);

            // draw the buffer image in the main canvas
            context.drawImage(buffer, entity.pos.x - x, entity.pos.y - y);
        });
    };
}

/**
 * @param {Level} level
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function createDebugTileCollisionLayer(level) {
    const tileResolver = level.getTileCollider().getTileResolver();
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
        // draw a box arround each collision-tile
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

        // draw a box arround each entity
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