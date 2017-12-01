import { SpriteSheet } from './SpriteSheet.js';

export class Font {

    /**
     * 
     * @param {SpriteSheet} sprites 
     * @param {Number} lineHeight 
     */
    constructor(sprites, lineHeight) {
        this._sprites = sprites;
        this._lineHeight = lineHeight;
    }

    /**
     * @returns {Number}
     */
    get lineHeight() {
        return this._lineHeight;
    }

    /**
     * 
     * @param {Sting} text 
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} x 
     * @param {Number} y 
     */
    print(text, context, x, y) {
        let offsetX = 0;
        for (let char of text) {
            const [charWidth] = this._sprites.draw(char, context, x + offsetX, y);
            offsetX += charWidth;
        }
    }

}