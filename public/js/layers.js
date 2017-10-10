import CONFIG from './config.js';

export function createBackgroundLayer(level, sprites) {
    const image = document.createElement('canvas');
    image.width = CONFIG.CANVAS_WIDTH;
    image.height = CONFIG.CANVAS_HEIGH;
    const imageContext = image.getContext('2d');

    level.forEachTile((x, y, tile) => {
        sprites.drawTile(tile, imageContext, x, y);
    });

    return function (context) {
        context.drawImage(image, 0, 0);
    }
}

export function createEntityLayer(entity) {
    return function (context) {
        entity.draw(context);
    }
}

export function createEntitiesLayer(entities) {
    return function (context) {
        entities.forEach(entity => entity.draw(context));
    }
}

export function createTileDebugLayer(level) {
    const tileResolver = level.getTileCollider().getTileResolver();
    const tileSize = tileResolver.getTileSize();

    const resolvedTiles = [];
    // create a SPY on the resolver method
    const getIndexByORIG = tileResolver.getByIndex;
    tileResolver.getByIndex = function (indexX, indexY) {
        resolvedTiles.push({ indexX, indexY });
        return getIndexByORIG.call(this, indexX, indexY);
    }

    return function (context) {
        // draw a box arround each collision-tile
        context.strokeColor = 'blue';
        resolvedTiles.forEach(({ indexX, indexY }) => {
            context.beginPath();
            context.rect(indexX * tileSize, indexY * tileSize,
                tileSize, tileSize);
            context.stroke();
        });
        resolvedTiles.length = 0;

        // draw a box arround each entity
        // Note - the entity may not be perfectly fit in a grid tile
        context.strokeColor = 'red';
        level.forEachEntity(entity => {
            context.rect(entity.pos.x, entity.pos.y,
                entity.size.x, entity.size.y);
            context.stroke();
        });
    }
}