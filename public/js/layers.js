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