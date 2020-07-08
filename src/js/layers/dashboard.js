import { generatePlayer } from '../player.js';
import { Trait } from '../Trait.js';

function pad(number, len = 6) {
    return ('' + Math.floor(number)).padStart(len, '0');
}

/**
 * @param {Level} level 
 * @returns {Trait} 
 */
function getPlayerTrait(level) {
    for (const player of generatePlayer(level)) {
        return player.player;
    }
    throw new Error('No player entity');
}

/**
 * @param {Level} level 
 * @returns {Trait} 
 */
function getLevelTimerTrait(level) {
    for (const entity of level.generateEntity()) {
        // check if the entity has the "player" trait
        if (entity.levelTimer)
            return entity.levelTimer;
    }
    throw new Error('No entity with LeverTimer trait');
}

/**
 * @param {Font} font
 * @param {Level} level
 */
export function createDashboardLayer(font, level) {

    const LINE1 = font.tileHeight;
    const LINE2 = font.tileHeight * 2;

    const levelTimerTrait = getLevelTimerTrait(level);
    const playerTrait = getPlayerTrait(level);

    /**
     * @param {CanvasRenderingContext2D} context
     */
    return function (context) {
        // logger.logDbg("Dashboard layer");

        font.print(playerTrait.name, context, 16, LINE1);
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