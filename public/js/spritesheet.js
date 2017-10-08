export default class SpriteSheet {

    constructor(image, tileWidth, tileHeight) {
        this._image = image;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;

        this._tiles = new Map();
    }

    registerTile(tile, col, row) {
        const tileImage = document.createElement('canvas');
        tileImage.width = this._tileWidth;
        tileImage.height = this._tileHeight;

        tileImage.getContext('2d').drawImage(this._image,
            col * this._tileWidth, row * this._tileHeight,
            this._tileWidth, this._tileHeight,
            0, 0,
            this._tileWidth, this._tileHeight);

        this._tiles.set(tile, tileImage);
    }

    registerTiles(tiles) {
        for (let tile in tiles) {
            this.registerTile(tile, tiles[tile][0], tiles[tile][1]);
        }
    }

    _drawTile(tile, context, x, y) {
        const tileImage = this._tiles.get(tile);
        if (tileImage) {
            context.drawImage(tileImage, x, y);
        }
    }

    drawTile(tile, context, col, row) {
        this._drawTile(tile, context, col * this._tileWidth, row * this._tileHeight);
    }

    drawBackgrounds(backgrounds, context) {
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