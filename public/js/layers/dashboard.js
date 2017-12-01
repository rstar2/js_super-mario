import * as logger from '../logger.js';
import { Font } from '../Font.js';
import { Level } from '../Level.js';


function pad(number, len =6) {
    return (''+ Math.floor(number)).padStart(len, '0');
}

/**
 * @param {Font} font
 * @param {Level} level 
 * @returns {(context: CanvasRenderingContext2D) => void} 
 */
export function createDashboardLayer(font, level) {

    const LINE1 = font.lineHeight;
    const LINE2 = font.lineHeight * 2;

    const score = 1234;

    /**
     * @param {CanvasRenderingContext2D} context
     */
    return function (context) {
        logger.logDbg("Dashboard layer");

        font.print('MARIO', context, 16, LINE1);
        font.print(pad(score), context, 16, LINE2);

        font.print('WORLD', context, 152, LINE1);

        font.print('TIME', context, 208, LINE1);
        font.print(pad(level.getTotalTime(), 3), context, 216, LINE2);
    };
}