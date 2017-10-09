export default class SpriteSheet {

    constructor(image, tileWidth, tileHeight) {
        this._image = image;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;

        this._tiles = new Map();
    }

    register(tile, x, y, width, height) {
        const tileImage = document.createElement('canvas');
        width = width || this._tileWidth;
        height = height || this._tileHeight;
        tileImage.width = width;
        tileImage.height = height;

        tileImage.getContext('2d').drawImage(this._image,
            x, y,
            width, height,
            0, 0,
            width, height);

        this._tiles.set(tile, tileImage);
    }

    registerTile(tile, col, row) {
        this.register(tile, col * this._tileWidth, row * this._tileHeight);
    }

    registerTiles(tiles) {
        for (let tile in tiles) {
            this.registerTile(tile, tiles[tile][0], tiles[tile][1]);
        }
    }

    draw(tile, context, x, y) {
        const tileImage = this._tiles.get(tile);
        if (tileImage) {
            context.drawImage(tileImage, x, y);
        }
    }

    drawTile(tile, context, col, row) {
        this.draw(tile, context, col * this._tileWidth, row * this._tileHeight);
    }

    drawLevel(level, context) {
        const backgrounds = level.backgrounds;
        for (let tile in backgrounds) {
            const background = backgrounds[tile];
            background.ranges.forEach(([x1, x2, y1, y2]) => {
                for (let x = x1; x < x2; x++) {
                    for (let y = y1; y < y2; y++) {
                        this.drawTile(tile, context, x, y);
                    }
                }
            });
        }
    }

}

