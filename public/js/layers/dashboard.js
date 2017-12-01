import * as logger from '../logger.js';
import { Font } from '../Font.js';

/**
 * @param {Font} font 
 * @returns {(context: CanvasRenderingContext2D) => void} 
 */
export function createDashboardLayer(font) {
    return function (context) {
        logger.logDbg("Dashboard layer");

        font.print('MARIO', context, 8, 16);
    };
}