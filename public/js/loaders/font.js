import { Font } from '../Font.js';
import { SpriteSheet } from '../SpriteSheet.js';
import { loadImage } from './utils.js';

const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const CHAR_SIZE = 8;

/**
 * @returns {Promise<Font>}
 */
export function loadFont() {
    return loadImage('img/font.png')
        .then(image => {
            const fontSprite = new SpriteSheet(image, false, CHAR_SIZE, CHAR_SIZE);
            const rowLen = image.width;

            // register all characters ()
            for (let [index, char] of [...CHARS].entries()) {
                const x = (index * CHAR_SIZE) % rowLen;
                const y = Math.floor(index * CHAR_SIZE / rowLen) * CHAR_SIZE;
                fontSprite.register(char, x, y);
            }

            return new Font(fontSprite, CHAR_SIZE);
        });
}