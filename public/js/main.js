import CONFIG from './config.js'
import { loadImage } from './utils.js'
import SpriteSheet from './spritesheet.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');



loadImage(CONFIG.TILES_NAME).then((image) => {
    const sprites = new SpriteSheet(image, CONFIG.TILE_WIDTH, CONFIG.TILE_HEIGHT);
    sprites.registerTile('ground', 0, 0);
    sprites.drawTile('ground', context, 65, 54);
});