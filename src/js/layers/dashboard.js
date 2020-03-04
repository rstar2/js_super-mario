import * as logger from '../logger.js';

function pad(number, len = 6) {
    return ('' + Math.floor(number)).padStart(len, '0');
}

/**
 * @param {Font} font
 * @param {Entity} playerEnv 
 * @param {Level} level 
 * @returns {(context: CanvasRenderingContext2D) => void} 
 */
export function createDashboardLayer(font, playerEnv, level) {

    const LINE1 = font.lineHeight;
    const LINE2 = font.lineHeight * 2;

    /**
     * @param {CanvasRenderingContext2D} context
     */
    return function (context) {
        logger.logDbg("Dashboard layer");

        const { score, coins, remainTime } = playerEnv.control;

        font.print('MARIO', context, 16, LINE1);
        font.print(pad(score, 6), context, 16, LINE2);

        // NOTE - the '@' and 'x' are replaced in the 'font.png'
        // similar trick like font-icon
        font.print('@x' + pad(coins, 2), context, 96, LINE2);

        font.print('WORLD', context, 152, LINE1);
        font.print(level.NAME, context, 160, LINE2);

        font.print('TIME', context, 208, LINE1);
        font.print(pad(remainTime, 3), context, 216, LINE2);
    };
}