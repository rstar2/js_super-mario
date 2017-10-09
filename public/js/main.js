import CONFIG from './config.js'
import SpriteSheet from './spritesheet.js'
import { loadLevel } from './utils.js'
import { loadBackgroudSprites, loadCharacterSprites } from './sprites.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([loadBackgroudSprites(), loadCharacterSprites(), loadLevel('1_1')]).
    then(([sprites, charSprites, level]) => {
        sprites.drawLevel(level, context);
        charSprites.drawTile('idle', context, 5, 5);
    });
