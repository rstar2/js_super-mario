import * as logger from './logger.js';

export function createBackgroundLayer(level, sprites) {
    // create a static/cached bachground image buffer from the level's tiles
    const image = document.createElement('canvas');
    image.width = level.getWidth();
    image.height = level.getHeight();
    const imageContext = image.getContext('2d');

    level.forEachTile((x, y, tile) => {
        sprites.drawTile(tile.name, imageContext, x, y);
    });

    return function (context, view) {
        logger.logDbg("Background layer");
        context.drawImage(image, -view.pos.x, -view.pos.y);
    };
}

export function createEntitiesLayer(level, maxEntityWidth = 64, maxEntityHeight = 64) {
    // create a static/cached image buffer fin which each entity will be drawn first
    const image = document.createElement('canvas');
    image.width = maxEntityWidth;
    image.height = maxEntityHeight;
    const imageContext = image.getContext('2d');

    return function (context, view) {
        logger.logDbg("Entities layer");

        const { x, y } = view.pos;
        level.forEachEntity(entity => {
            // draw the entity tile in the buffer image after it's been cleared
            imageContext.clearRect(0, 0, maxEntityWidth, maxEntityHeight);
            entity.draw(imageContext);
            
            // draw the buffer image in the main canvas
            context.drawImage(image, entity.pos.x - x, entity.pos.y - y);
        });
    };
}

export function createTileCollisionDebugLayer(level) {
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