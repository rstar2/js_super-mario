/**
 * @param {Font} font
 * @param {String} text
 */
export function createTextLayer(font, text) {
    const tileWidth = font.tileWidth;
    // const lineHeight = font.tileHeight;

    const textWidth = tileWidth*text.length;

    /**
     * @param {CanvasRenderingContext2D} context
     */
    return function (context) {
        // context.fillStyle = '#FFF';


        font.print(text, context, context.canvas.width / 2 - textWidth/2,
            context.canvas.height / 2);
    };
}