import * as logger from './logger.js';
import CONFIG from './config.js';

// this will redraw the whole level everytime
export function __createBackgroundLayer(level, sprites) {
    // create a static/cached bachground image buffer from the level's tiles
    const buffer = document.createElement('canvas');
    buffer.width = level.getWidth();
    buffer.height = level.getHeight();
    const imageContext = buffer.getContext('2d');

    level.forEachTile((x, y, tile) => {
        sprites.drawTile(tile.name, imageContext, x, y);
    });

    return function (context, view) {
        logger.logDbg("Background layer");
        context.drawImage(buffer, -view.pos.x, -view.pos.y);
    };
}

// OPTIMIZATION - this will draw NEW columns only when only on demand (when needed while scrolling)
// Note - old already drawn columns are already buffered
// Note - with this case we still have a very huge buffer (as we've set the whole level's size) 
// in memory.
export function _createBackgroundLayer(level, sprites) {
    // create a static/cached bachground image buffer from the level's tiles
    const buffer = document.createElement('canvas');
    buffer.width = level.getWidth();
    buffer.height = level.getHeight();
    const bufferContext = buffer.getContext('2d');

    function redraw(indexStart, indexEnd) {
        for (let x = indexStart; x <= indexEnd; x++) {
            level.forEachTileInColumn(x, (x, y, tile) => {
                sprites.drawTile(tile.name, bufferContext, x, y);
            });
        }
    }

    const tileResolver = level.getTileCollider().getTileResolver();


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

// OPTIMIZATION - keep a small buffur in memory - just as needed to draw the view
// so a little wider than view's size
// ALso - we can redraw ONLY when there's a change in 
export function createBackgroundLayer(level, sprites) {
    const tileResolver = level.getTileCollider().getTileResolver();
    const tileSize = tileResolver.getTileSize();
    
    // create a static/cached bachground image buffer from the level's tiles
    const buffer = document.createElement('canvas');
    buffer.width = CONFIG.VIEW_WIDTH + tileSize;
    buffer.height = CONFIG.VIEW_HEIGHT;
    const bufferContext = buffer.getContext('2d');

    function redraw(indexStart, indexEnd) {
        for (let x = indexStart; x <= indexEnd; x++) {
            level.forEachTileInColumn(x, (x, y, tile) => {
                sprites.drawTile(tile.name, bufferContext, x - indexStart, y);
            });
        }
    }

    let lastIndexStart, lastIndexEnd;

    return function (context, view) {
        logger.logDbg("Background layer");

        // redraw just the needed view an ONLY when needed
        const drawWidth = tileResolver.toIndex(view.size.x);
        const drawIndexStart = tileResolver.toIndex(view.pos.x);
        const drawIndexEnd = drawIndexStart + drawWidth;
        if (lastIndexStart !== drawIndexStart && lastIndexEnd !== drawIndexEnd) {
            console.log("Background layer redrawing");
            redraw(drawIndexStart, drawIndexEnd);

            lastIndexStart = drawIndexStart;
            lastIndexEnd = drawIndexEnd;
        }

        context.drawImage(buffer, -view.pos.x % tileSize, -view.pos.y);
    };
}

export function createEntitiesLayer(level, maxEntityWidth = 64, maxEntityHeight = 64) {
    // create a static/cached image buffer fin which each entity will be drawn first
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
            entity.draw(bufferContext);

            // draw the buffer image in the main canvas
            context.drawImage(buffer, entity.pos.x - x, entity.pos.y - y);
        });
    };
}

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
        logger.logDbg("Debug layer", collisionTiles.length);

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

        // draw a box arround each entity
        // Note - the entity may not be perfectly fit in a grid tile
        context.strokeStyle = 'red';
        level.forEachEntity(entity => {
            context.beginPath();
            context.rect(entity.pos.x - x, entity.pos.y - y,
                entity.size.x, entity.size.y);
            context.stroke();
        });
    };
}

export function createDebugViewLayer(viewToDraw) {
    return function (context, view) {
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(viewToDraw.pos.x - view.pos.x, viewToDraw.pos.y - view.pos.y,
            view.size.x, view.size.y);
        context.stroke();
    };
}