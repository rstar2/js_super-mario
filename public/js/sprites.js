import CONFIG from './config.js';
import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadData } from './utils.js';

function registerTiles(tilesSpec, sprites) {
    tilesSpec.forEach(tileSpec => {
        const { tile, index } = tileSpec;
        const [indexX, indexY] = index;
        sprites.registerTile(tile, indexX, indexY);
    });
}

export function loadBackgroudSprites() {
    return Promise.all([loadImage(CONFIG.TILES_NAME_IMAGE), loadData(CONFIG.TILES_NAME_DATA)]).
        then(([image, tilesSpec]) => {
            const sprites = new SpriteSheet(image, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);

            registerTiles(tilesSpec, sprites);

            return sprites;
        });
}

export function loadCharacterSprites() {
    return loadImage(CONFIG.CHARACTERS_NAME_IMAGE).
        then(image => {
            const sprites = new SpriteSheet(image, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);

            sprites.register('idle', 276, 44);

            return sprites;
        });
}