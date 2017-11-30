import * as logger from '../logger.js';
import CONFIG from '../config.js';
import TileResolver from '../TileResolver.js';

/**
 * Note - this will redraw the whole level every time
 * @param {Level} level 
 * @param {Matrix} tiles 
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function ___createBackgroundLayer(level, tiles, tileSize, sprites) {
    // create a static/cached background image buffer from the level's tiles
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

    // create a static/cached background image buffer from the level's tiles
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
 * OPTIMIZATION - keep a small buffer in memory - just as needed to draw the view
 * so a little wider than view's size
 * ALso - we can redraw ONLY when there's a change in view's position
 * @param {Level} level 
 * @param {Matrix} tiles
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function _createBackgroundLayer(level, tiles, tileSize, sprites) {
    const tileResolver = new TileResolver(tiles, tileSize);

    // create a static/cached background image buffer from the level's tiles
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
 * OPTIMIZATION - keep a small buffer in memory - just as needed to draw the view
 * so a little wider than view's size
 * ALso - we can redraw ONLY when there's a change in view's position
 * @param {Level} level 
 * @param {Matrix} tiles
 * @param {SpriteSheet} sprites
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function createBackgroundLayer(level, tiles, tileSize, sprites) {
    const tileResolver = new TileResolver(tiles, tileSize);

    // create a static/cached background image buffer from the level's tiles
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