import * as logger from '../logger.js';

/**
 * @param {Level} level 
 * @param {Number} maxEntityWidth 
 * @param {Number} maxEntityHeight
 * @returns {(context: CanvasRenderingContext2D, view: View) => void} 
 */
export function createEntitiesLayer(level, maxEntityWidth = 64, maxEntityHeight = 64) {
    // create a middle image buffer in which each entity will be drawn first
    const buffer = document.createElement('canvas');
    buffer.width = maxEntityWidth;
    buffer.height = maxEntityHeight;
    const bufferContext = buffer.getContext('2d');

    return function (context, view) {
        logger.logDbg("Entities layer");

        const { x, y } = view.pos;
        level.forEachEntity(entity => {
            if (!entity.isDrawable) return;

            // draw the entity tile in the buffer image after it's been cleared
            bufferContext.clearRect(0, 0, maxEntityWidth, maxEntityHeight);
            entity.draw(bufferContext, level);

            // draw the buffer image in the main canvas
            context.drawImage(buffer, entity.pos.x - x, entity.pos.y - y);
        });
    };
}