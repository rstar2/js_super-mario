import CONFIG from './config.js'

export function createBackgroundLayer(sprites, level) {
    const image = document.createElement('canvas');
    image.width = CONFIG.CANVAS_WIDTH;
    image.height = CONFIG.CANVAS_HEIGH;
    sprites.drawLevel(level, image.getContext('2d'));

    return function (context) {
        context.drawImage(image, 0, 0);
    }
}

export function createTileLayer(sprites, tile, pos) {
    return function (context) {
        sprites.draw(tile, context, pos.x, pos.y);
    }
}
