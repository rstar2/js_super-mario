export default class SpriteSheet {

    constructor(image, tileWidth, tileHeight) {
        this._image = image;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;

        this._tiles = new Map();
    }

    registerTile(tile, column, row) {
        const tileImage = document.createElement('canvas');
        tileImage.width = this._tileWidth;
        tileImage.height = this._tileHeight;

        tileImage.getContext('2d').drawImage(this._image,
            column * this._tileWidth, row * this._tileHeight,
            this._tileWidth, this._tileHeight,
            0, 0,
            this._tileWidth, this._tileHeight,
        );

        this._tiles.set(tile, tileImage);
    }

    drawTile(tile, context, x, y) {
        const tileImage = this._tiles.get(tile);
        if (tileImage) {
            context.drawImage(tileImage, x, y);
        }
    }

    drawBackgrounds(context) {

    }

}