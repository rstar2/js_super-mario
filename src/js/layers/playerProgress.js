import { generatePlayer } from '../player.js';

function pad(number, len = 6, pad = '0') {
    return ('' + Math.floor(number)).padStart(len, pad);
}

/**
 * @param {Level} level 
 * @returns {Entity} 
 */
function getPlayer(level) {
    for (const player of generatePlayer(level)) {
        return player;
    }
    throw new Error('No player entity');
}

export function createPlayerProgressLayer(font, level) {

    const tileWidth = font.tileWidth;
    const lineHeight = font.tileHeight;

    const player = getPlayer(level);


    const playerBuffer = document.createElement('canvas');
    playerBuffer.width = player.size.x;
    playerBuffer.height = player.size.y;
    const playerContext = playerBuffer.getContext('2d');

    /**
     * @param {CanvasRenderingContext2D} context
     */
    return function (context) {
        font.print(`WORLD ${level.NAME}`, context, 12 * tileWidth, 12 * lineHeight);

        playerContext.clearRect(0, 0, playerBuffer.width, playerBuffer.height);
        player.draw(playerContext, level);

        context.drawImage(playerBuffer, 12 * tileWidth, 15 * lineHeight);

        font.print(`x ${pad(player.player.lives, 3, ' ')}`, context, 16 * tileWidth, 16 * lineHeight);

    };
}