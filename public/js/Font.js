import { SpriteSheet } from './SpriteSheet.js';

export class Font {

    /**
     * 
     * @param {SpriteSheet} sprites 
     */
    constructor(sprites) {
        this._sprites = sprites;
    }

    /**
     * 
     * @param {Sting} text 
     * @param {*} context 
     * @param {Number} x 
     * @param {Number} y 
     */
    print(text, context, x, y) {
        this._sprites.draw('A', context, x, y);
    }

}