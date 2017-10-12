import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadData } from './utils.js';

export function loadWorld(name) {
    return loadData(name).
        then(world => Promise.all([world, loadImage(world.tilesURL)])).
        then(([world, spritesImage]) => {
            const sprites = new SpriteSheet(spritesImage, world.tileWidth, world.tileHeight);

            world.tiles.forEach(tileSpec => {
                const { tile, index } = tileSpec;
                const [indexX, indexY] = index;
                sprites.registerTile(tile, indexX, indexY);
            });

            return sprites;
        });
}

export function loadCharacterSprites(name) {
    return loadData(name).
        then(characters => Promise.all([characters, loadImage(characters.entitiesURL)])).
        then(([characters, spritesImage]) => {
            const sprites = new SpriteSheet(spritesImage);

            // TODO: register all charcaters with their specific size
            sprites.register('idle', 276, 44, 16, 16);

            return sprites;
        });
}