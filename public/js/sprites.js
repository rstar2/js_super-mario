import CONFIG from './config.js'
import SpriteSheet from './spritesheet.js'
import { loadImage, loadData } from './utils.js'

export function loadBackgroudSprites() {
    return Promise.all([loadImage(CONFIG.TILES_NAME_IMAGE), loadData(CONFIG.TILES_NAME_DATA)]).
        then(([image, tiles]) => {
            const sprites = new SpriteSheet(image, CONFIG.TILE_WIDTH, CONFIG.TILE_HEIGHT);
            sprites.registerTiles(tiles);
            return sprites;
        });
}

export function loadCharacterSprites() {
    return loadImage(CONFIG.CHARACTERS_NAME_IMAGE).
        then(image => {
            const sprites = new SpriteSheet(image, CONFIG.TILE_WIDTH, CONFIG.TILE_HEIGHT);
            sprites.register('idle', 276, 44);
            return sprites;
        });
}