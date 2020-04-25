import * as logger from '../logger.js';
import { generatePlayer } from '../player.js';

function pad(number, len = 6) {
    return ('' + Math.floor(number)).padStart(len, '0');
}

/**
 * @param {Level} level 
 * @returns {Entity} 
 */
function getPlayerTrait(level) {
    for (const player of generatePlayer(level)) {
        return player.player;
    }
}

function getLevelTimerTrait(level) {
    for (const entity of level.generateEntity()) {
        // check if the entity has the "player" trait
        if (entity.levelTimer)
            return entity.levelTimer;
    }
}

export function createDashboardLayer(font, level) {

    const LINE1 = font.lineHeight;
    const LINE2 = font.lineHeight * 2;

    const levelTimerTrait = getLevelTimerTrait(level);
    const playerTrait = getPlayerTrait(level);

    /**
     * @param {CanvasRenderingContext2D} context
     */
    return function (context) {
        // logger.logDbg("Dashboard layer");

        font.print('MARIO', context, 16, LINE1);
        font.print(pad(playerTrait.score, 6), context, 16, LINE2);

        // NOTE - the '@' and 'x' are replaced in the 'font.png' - similar trick like font-icon
        font.print('+x' + pad(playerTrait.lives, 2), context, 96, LINE1); // for testing of the lives
        font.print('@x' + pad(playerTrait.coins, 2), context, 96, LINE2);

        font.print('WORLD', context, 152, LINE1);
        font.print(level.NAME, context, 160, LINE2);

        font.print('TIME', context, 208, LINE1);
        font.print(pad(levelTimerTrait.remainTime, 3), context, 216, LINE2);
    };
}