export class Font {

    /**
     * 
     * @param {SpriteSheet} sprites 
     */
    constructor(sprites) {
        this._sprites = sprites;
    }

    /**
     * @returns {Number}
     */
    get tileWidth() {
        return this._sprites.tileWidth;
    }
    
    /**
     * @returns {Number}
     */
    get tileHeight() {
        return this._sprites.tileHeight;
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