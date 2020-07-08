/**
 * @param {String} color
 */
export function createBackgroundColorLayer(color) {
    /**
     * @param {CanvasRenderingContext2D} context
     */
    return function (context) {
        context.fillStyle = color;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    };
}