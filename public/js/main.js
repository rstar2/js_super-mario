import CONFIG from './config.js'
import { loadImage, loadData, loadLevel } from './utils.js'
import SpriteSheet from './spritesheet.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');



loadImage(CONFIG.TILES_NAME_IMAGE).then((image) => {
    const sprites = new SpriteSheet(image, CONFIG.TILE_WIDTH, CONFIG.TILE_HEIGHT);

    loadData(CONFIG.TILES_NAME_DATA).
        then(tiles => sprites.registerTiles(tiles)).
        then(() => loadLevel('1_1')).
        then(level => sprites.drawBackgrounds(level['backgrounds'], context));



});