import { SpriteSheet } from '../SpriteSheet.js';
import { loadImage, loadData } from './utils.js';
import { createAnimation } from '../animation.js';

/**
 * @param {String} name 
 * @param {Boolean} mirrored
 * @returns {Promise<SpriteSheet>}
 */
export function loadSprites(name, mirrored = false) {
    if (!name) return Promise.resolve(null);


    return loadData(`sprites/${name}`).
        then(spritesSpec => Promise.all([spritesSpec, loadImage(spritesSpec.spritesURL)])).
        then(([spritesSpec, spritesImage]) => {
            const sprites = new SpriteSheet(spritesImage, mirrored,
                spritesSpec.tileWidth, spritesSpec.tileHeight);

            spritesSpec.tiles.forEach(tileSpec => {
                // the specific tile's width and height are optional in the tileSpec
                // if missing then the global spritesSpec.tileWidth/spritesSpec.tileHeight will be used

                // a tile can be specified by index (when sprite is with fixed size grid)
                // or by pos and size (optional)
                const { name, index } = tileSpec;

                if (index) {
                    const [indexX, indexY] = index;
                    sprites.registerTile(name, indexX, indexY);
                } else {
                    // pos is obligatory then, but size is again optional
                    const [x, y] = tileSpec.pos;

                    let width, height;
                    if (tileSpec.size) {
                        width = tileSpec.size[0];
                        height = tileSpec.size[1];
                    }
                    sprites.register(name, x, y, width, height);
                }


            });

            // if defined animations for any tile
            if (spritesSpec.animations) {
                spritesSpec.animations.forEach(animSpec => {
                    const animation = createAnimation(animSpec.frames, animSpec.frameRate);
                    sprites.registerAnimation(animSpec.name, animation);
                });
            }

            return sprites;
        });
}