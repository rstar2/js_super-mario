import * as logger from './logger.js';

export function createBackgroundLayer(level, sprites) {
    // create a static/cached bachground image from the level's tiles
    const image = document.createElement('canvas');
    image.width = level.getWidth();
    image.height = level.getHeight();
    const imageContext = image.getContext('2d');

    level.forEachTile((x, y, tile) => {
        sprites.drawTile(tile.type, imageContext, x, y);
    });

    return function (context, view) {
        logger.logDbg("Background layer");
        context.drawImage(image, -view.pos.x, -view.pos.y);
    };
}

export function createEntityLayer(entity) {
    return function (context) {
        logger.logDbg("Entity layer");
        entity.draw(context);
    };
}

export function createEntitiesLayer(entities) {
    return function (context) {
        logger.logDbg("Entities layer");
        entities.forEach(entity => entity.draw(context));
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

    return function (context) {
        logger.logDbg("Debug layer", collisionTiles.length);
        // draw a box arround each collision-tile
        context.strokeStyle = 'green';
        collisionTiles.forEach(({ indexX, indexY }) => {
            context.beginPath();
            context.rect(indexX * tileSize, indexY * tileSize,
                tileSize, tileSize);
            context.stroke();
        });
        collisionTiles.length = 0;

        // draw a box arround each entity
        // Note - the entity may not be perfectly fit in a grid tile
        context.strokeStyle = 'red';
        level.forEachEntity(entity => {
            context.beginPath();
            context.rect(entity.pos.x, entity.pos.y,
                entity.size.x, entity.size.y);
            context.stroke();
        });
    };
}