import * as logger from './logger.js';

export default class SpriteSheet {

    constructor(image, mirrored = false, tileWidth, tileHeight) {
        this._image = image;
        this._tileWidth = tileWidth;
        this._tileHeight = tileHeight;
        this._mirrored = mirrored;

        this._tiles = new Map();
        this._animations = new Map();
    }

    register(tile, x, y, width, height) {
        const mirrors = this._mirrored ? [false, true] : [false];

        const tileImages = mirrors.map(mirrored => {
            const tileImage = document.createElement('canvas');
            width = width || this._tileWidth;
            height = height || this._tileHeight;
            tileImage.width = width;
            tileImage.height = height;

            const tileImageCtx = tileImage.getContext('2d');

            // flip the image
            if (mirrored) {
                tileImageCtx.scale(-1, 1);
                tileImageCtx.translate(-width, 0);
            }

            tileImageCtx.drawImage(this._image,
                x, y,
                width, height,
                0, 0,
                width, height);
            return tileImage;
        });

        if (this._mirrored) {
            // if mirrored then register both tile images as a coupl
            this._tiles.set(tile, tileImages);
        } else {
            // if not mirrored then register the single tile image
            this._tiles.set(tile, tileImages[0]);
        }
    }

    registerTile(tile, indexX, indexY) {
        this.register(tile, indexX * this._tileWidth, indexY * this._tileHeight);
    }

    registerAnimation(tile, animation) {
        this._animations.set(tile, animation);
    }

    draw(tile, context, x, y, mirrored = false) {
        const tileImage = this._tiles.get(tile);
        if (tileImage) {
            if (this._mirrored) {
                // if sprites is mirror this means that 2 image tiles are registered for each name
                // so we have to draw the desired one
                context.drawImage(tileImage[mirrored ? 1 : 0], x, y);
            } else {
                context.drawImage(tileImage, x, y);
            }
        }
    }

    drawTile(tile, context, indexX, indexY, mirrored) {
        this.draw(tile, context, indexX * this._tileWidth, indexY * this._tileHeight, mirrored);
    }

    drawTileAnim(tile, context, indexX, indexY, progress, mirrored) {
        const animation = this._animations.get(tile);
        if (animation) {
            tile = animation(progress);
        } else {
            logger.logWarn("No animation set for ", tile);
        }
        this.draw(tile, context, indexX * this._tileWidth, indexY * this._tileHeight, mirrored);
    }

    isTileAnim(tile) {
        return this._animations.has(tile);
    }

}

