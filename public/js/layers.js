import CONFIG from './config.js';

export function createBackgroundLayer(sprites, backgrounds) {
    const image = document.createElement('canvas');
    image.width = CONFIG.CANVAS_WIDTH;
    image.height = CONFIG.CANVAS_HEIGH;
    sprites.drawBackgrounds(backgrounds, image.getContext('2d'));

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