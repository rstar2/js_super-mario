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

    registerTile(tile, indexX, indexY) {
        this.register(tile, indexX * this._tileWidth, indexY * this._tileHeight);
    }

    draw(tile, context, x, y) {
        const tileImage = this._tiles.get(tile);
        if (tileImage) {
            context.drawImage(tileImage, x, y);
        }
    }

    drawTile(tile, context, indexX, indexY) {
        this.draw(tile, context, indexX * this._tileWidth, indexY * this._tileHeight);
    }

}

